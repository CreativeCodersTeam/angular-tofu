import { BuildContext } from '../runtime/build-context';
import { BuildLogger } from '../build-logger';
import { BuildTasks } from '../build-tasks';
import { inject, injectable } from 'tsyringe';
import { CmdExecutor } from '../shell/cmd-executor';

@injectable()
export class NxTasks extends BuildTasks {
  dryRun = false;
  base = '';

  constructor(
    @inject(BuildLogger) logger: BuildLogger,
    @inject(BuildContext) context: BuildContext,
    @inject(CmdExecutor) private readonly cmdExecutor: CmdExecutor
  ) {
    super(context, logger);
  }

  async executeNxCommand(command: string) {
    this.logger.log(`Executing Nx command: ${command}`);
    return await this.cmdExecutor.executeStream(`npx nx ${command}`);
  }

  async runTargetForAffected(targets: string[]) {
    const baseArg = this.base ? `--base=${this.base}` : '';
    return this.executeNxCommand(`affected -t ${targets.join(' ')} ${baseArg}`);
  }

  async setReleaseVersion(version: string) {
    return this.executeNxCommand(
      `release version  ${version} --stage-changes=false --git-commit=false`
    );
  }

  async releaseAndPublish(projectName: string, access: string) {
    //run angular-tofu:nx-release-publish --access public
    const args = [
      'run',
      `${projectName}:nx-release-publish`,
      `--access ${access}`,
      //'--registry=https://registry.npmjs.org/',
    ];
    return this.executeNxCommand(args.join(' '));
  }
}
