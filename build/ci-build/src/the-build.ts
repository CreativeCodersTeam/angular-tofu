import { BuildContext } from './build-it-lib/build-context';
import { BuildDefinition, BuildTarget } from './build-it-lib/build-definition';
import { BuildLogger } from './build-it-lib/build-logger';
import { CmdExecutor } from './build-it-lib/cmd-executor';
import { inject, singleton } from 'tsyringe';
import { NpmInstallCiOptions, NpmTasks } from './build-it-lib/tasks/npm-tasks';

@singleton()
export class TheBuild extends BuildDefinition {

  name = 'Angular Tofu Build';

  constructor(@inject(BuildContext) private buildContext: BuildContext,
              @inject(BuildLogger) private logger: BuildLogger,
              @inject(NpmTasks) private npmTasks: NpmTasks,
              @inject(CmdExecutor) private cmdExecutor: CmdExecutor,) {
    super();

    this.targets = [
      this.installDeps,
      this.setVersion,
      this.runNpxTargets,
    ];
  }

  installDeps: BuildTarget = {
    name: 'installDeps',
    execute: async (buildContext) => {
      this.logger.log('Install all dependencies');

      await this.npmTasks
        .installCi(new NpmInstallCiOptions().setLegacyPeerDeps(true));

      await this.cmdExecutor.executeStream('npx playwright install --with-deps');
    }
  }

  setVersion: BuildTarget = {
    name: 'setVersion',
    execute: async (buildContext) => {
      this.logger.log('hello setVersion');
    },
    dependsOn: [this.installDeps]
  }

  runNpxTargets: BuildTarget = {
    name: 'runNpxTargets',
    execute: async (buildContext) => {
      this.logger.log('hello runNpxTargets');
    },
    dependsOn: [this.setVersion]
  }
}
