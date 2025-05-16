import {
  BuildDefinition,
  BuildTask,
  BuildTaskFunction,
} from './build-definition';
import { CmdExecutor } from './cmd-executor';

export class TheBuild extends BuildDefinition {
  buildTasks: BuildTask[] = [
    { name: 'runtargets', execute: async (buildContext) => {} },
    {
      name: 'runtargets2',
      execute: async (buildContext) => {
        console.log('hello');
      },
    },
  ];

  name: string = 'Angular Tofu Build';

  constructor() {
    super();

    const cmd = new CmdExecutor(true);

    // super.AddTask('runtargets', async () => {
    //   console.log('Build task runtargets executed');
    //   //cmd.execute('npx nx affected -t lint test build e2e');
    // });

    this.tasks = [
      {
        name: 'runtargets',
        execute: async (buildContext) => {
          console.log('Build task runtargets executed');
        },
      },
      {
        name: 'runtargets2',
        execute: async (buildContext) => {
          console.log('hello runtargets2');
        },
      },
    ];
  }
}
