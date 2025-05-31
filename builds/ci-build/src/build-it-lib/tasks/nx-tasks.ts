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
    return await this.cmdExecutor.executeStream(`npx nx ${command}`);
  }

  async runTargetForAffected(targets: string[]) {
    const baseArg = this.base ? `--base=${this.base}` : '';
    return this.executeNxCommand(`affected -t ${targets.join(' ')} ${baseArg}`);
  }

  async setReleaseVersion(version: string) {
    return this.executeNxCommand(`release version  ${version}`);
  }
}
