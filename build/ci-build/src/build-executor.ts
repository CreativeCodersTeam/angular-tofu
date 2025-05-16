import {
  BuildDefinition,
  BuildContext,
  BuildTask,
} from './build-definition';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export class BuildExecutor {
  static createInstance(args: string[]) {
    return new BuildExecutor(args);
  }

  private constructor(private args: string[]) {}

  async run(buildDefinition: BuildDefinition): Promise<void> {
    console.log('CreativeCoders build-it');
    console.log('=======================');
    console.log();
    console.log('Running build:', buildDefinition.name);

    const buildContext = {};

    const buildTasks = this.findBuildTasks(buildDefinition);

    for (const buildTask of buildTasks) {
      await this.executeBuildTask(buildContext, buildTask);
    }
  }

  private async executeBuildTask(
    buildContext: BuildContext,
    buildTask: BuildTask
  ): Promise<void> {
    console.log('Executing build task:', buildTask.name);

    buildTask.execute(buildContext);

    return Promise.resolve();
  }

  private findBuildTasks(buildDefinition: BuildDefinition) {
    return buildDefinition.tasks;
  }
}

export async function runBuildIt(
  cliName: string,
  buildDefinition: BuildDefinition
): Promise<void> {
  await yargs()
    .scriptName(cliName)
    .command(
      'run [targets...]',
      '',
      (yargs) => yargs.positional('targets', { type: 'string', array: true }),
      (yargs) => {
        console.log('run yargs', yargs.targets);
      }
    )
    .command(
      '$0 [targets...]',
      '',
      (yargs) => yargs.positional('targets', { type: 'string', array: true }),
      (yargs) => {
        console.log('run yargs without run', yargs.targets);
      }
    )
    //.default('run', 'build')
    .help()
    .parse(hideBin(process.argv));

  await BuildExecutor.createInstance(process.argv.slice(2)).run(
    buildDefinition
  );
}
