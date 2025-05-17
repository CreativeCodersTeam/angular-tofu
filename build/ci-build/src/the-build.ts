import { BuildContext, BuildDefinition } from './build-it-lib/build-definition';
import { BuildTargetFailedException } from './build-it-lib/build-executor';
import { logger } from './build-it-lib/build-logger';
import { CmdExecutor } from './build-it-lib/cmd-executor';
import { inject, singleton } from 'tsyringe';

@singleton()
export class TheBuild extends BuildDefinition {

  name = 'Angular Tofu Build';

  constructor(@inject(BuildContext) private buildContext: BuildContext) {
    super();

    const cmd = new CmdExecutor(true);

    this.targets = [
      {
        name: 'runtargets',
        execute: async (buildContext) => {
          logger.log('The targets:', this.buildContext.targets);
          throw new BuildTargetFailedException('runtargets failed');
          logger.log('Build task runtargets executed');
        },
      },
      {
        name: 'runtargets2',
        execute: async (buildContext) => {
          logger.log('hello runtargets2');
        },
      },
    ];
  }
}

@singleton()
export class TheBuildContext extends BuildContext {
}
