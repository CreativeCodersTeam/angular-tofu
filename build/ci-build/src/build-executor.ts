import { BuildDefinition, BuildContext, BuildTask } from './build-definition';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logger } from './build-logger';

export class BuildExecutionException extends Error {
  ctor(message: string) {
    this.message = message;
  }
}

export class BuildExecutor {
  static createInstance(cliName: string) {
    return new BuildExecutor(cliName);
  }

  private constructor(private cliName: string) {}

  async run(buildDefinition: BuildDefinition): Promise<void> {
    await yargs()
      .scriptName(this.cliName)
      .command(
        'exec [targets...]',
        '',
        (yargs) => yargs.positional('targets', { type: 'string', array: true }),
        async (yargs) => {
          await this.runBuild(buildDefinition, yargs.targets);
        }
      )
      .command(
        '$0 [targets...]',
        '',
        (yargs) => yargs.positional('targets', { type: 'string', array: true }),
        async (yargs) => {
          await this.runBuild(buildDefinition, yargs.targets);
        }
      )
      .help()
      .parse(hideBin(process.argv));
  }

  private async runBuild(buildDefinition: BuildDefinition, targets: string[]) {
    logger.log('CreativeCoders build-it');
    logger.log('=======================');
    logger.log();
    logger.log('Running build:', buildDefinition.name);

    const buildContext = {targets: targets};

    const buildTasks = this.findBuildTasks(buildDefinition, targets);

    logger.log('Build tasks for execution');

    for (const buildTask of buildTasks) {
      logger.log('-', buildTask.name);
    }

    for (const buildTask of buildTasks) {
      await this.executeBuildTask(buildContext, buildTask);
    }
  }

  private async executeBuildTask(
    buildContext: BuildContext,
    buildTask: BuildTask
  ): Promise<void> {
    logger.log('Executing build task:', buildTask.name);

    try {
      await buildTask.execute(buildContext);
    }
    catch (error) {
      if (error instanceof BuildExecutionException) {
        logger.error('Build task failed:', error.message);
      } else{
        logger.error('Runtime error:', error.message);
      }
    }
  }

  private findBuildTasks(buildDefinition: BuildDefinition, targets: string[]) {
    return buildDefinition.tasks.filter((buildTask) =>
      targets.includes(buildTask.name)
    );
  }
}

export async function runBuildIt(
  cliName: string,
  buildDefinition: BuildDefinition
): Promise<void> {
  await BuildExecutor.createInstance(cliName).run(buildDefinition);
}
