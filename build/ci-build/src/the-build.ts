import {
  BuildDefinition,
  BuildTask,
  BuildTaskFunction,
} from './build-definition';
import { BuildExecutionException } from './build-executor';
import { logger } from './build-logger';
import { CmdExecutor } from './cmd-executor';

export class TheBuild extends BuildDefinition {
  // buildTasks: BuildTask[] = [
  //   { name: 'runtargets', execute: async (buildContext) => {} },
  //   {
  //     name: 'runtargets2',
  //     execute: async (buildContext) => {
  //       logger.log('hello');
  //     },
  //   },
  // ];

  name: string = 'Angular Tofu Build';

  constructor() {
    super();

    const cmd = new CmdExecutor(true);

    this.tasks = [
      {
        name: 'runtargets',
        execute: async (buildContext) => {
          throw new BuildExecutionException('runtargets failed');
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
