import { BuildContext } from '../build-context';
import { BuildLogger } from '../build-logger';
import { BuildTasks } from '../build-tasks';
import { inject } from 'tsyringe';
import { CmdExecutor } from '../cmd-executor';

export class NxTasks extends BuildTasks {
  dryRun = false;
  base = '';

  constructor(@inject(BuildLogger) logger: BuildLogger,
              @inject(BuildContext) context: BuildContext,
              @inject(CmdExecutor) private cmdExecutor: CmdExecutor) {
    super(context, logger);

  }

  async executeNxCommand(command: string) {
    return await this.cmdExecutor.executeStream(`npx nx ${command}`);
  }

  async runTargetForAffected(targets: string[]) {
    const baseArg = this.base ? `--base=${this.base}` : '';
    return this.executeNxCommand(`affected -t ${targets.join(' ')} ${baseArg}`);
  }

  // async getAffectedProjects(): Promise<string[]> {
  //   const baseArg = this.base ? `--base=${this.base}` : '';
  //   const affected = await this.executeNxCommand(
  //     `print-affected ${baseArg} --select=projects`
  //   );
  //   return affected
  //     .split(',')
  //     .map((project) => project.trim())
  //     .filter((project) => project.length > 0);
  // }
  //
  // async buildAffected(): Promise<string> {
  //   const baseArg = this.base ? `--base=${this.base}` : '';
  //   return this.executeNxCommand(`affected:build ${baseArg}`);
  // }
  //
  // async testAffected(): Promise<string> {
  //   const baseArg = this.base ? `--base=${this.base}` : '';
  //   return this.executeNxCommand(`affected:test ${baseArg}`);
  // }
  //
  // async setVersion(project: string, version: string): Promise<string> {
  //   return this.executeNxCommand(`version ${project} --new-version=${version}`);
  // }
  //
  // async publishRelease(project: string): Promise<string> {
  //   return this.executeNxCommand(`release-publish ${project}`);
  // }
}
