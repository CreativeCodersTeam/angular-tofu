import { BuildContext } from './build-it-lib/build-context';
import { BuildDefinition, BuildTarget } from './build-it-lib/build-definition';
import { BuildTargetFailedException } from './build-it-lib/build-executor';
import { BuildLogger } from './build-it-lib/build-logger';
import { CmdExecutor } from './build-it-lib/cmd-executor';
import { inject, singleton } from 'tsyringe';

@singleton()
export class TheBuild extends BuildDefinition {

  name = 'Angular Tofu Build';

  constructor(@inject(BuildContext) private buildContext: BuildContext,
              @inject(BuildLogger) private logger: BuildLogger,) {
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
      this.logger.log('hello installDeps');
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
