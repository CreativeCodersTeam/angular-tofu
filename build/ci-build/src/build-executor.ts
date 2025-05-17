import { BuildDefinition, BuildContext, BuildTarget } from './build-definition';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logger } from './build-logger';

export class BuildTargetFailedException extends Error {
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

    const buildTargets = this.findBuildTargets(buildDefinition, targets);

    logger.log('Build tasks for execution');

    for (const buildTarget of buildTargets) {
      logger.log('-', buildTarget.name);
    }

    for (const buildTarget of buildTargets) {
      await this.executeBuildTarget(buildContext, buildTarget);
    }
  }

  private async executeBuildTarget(
    buildContext: BuildContext,
    buildTarget: BuildTarget
  ): Promise<void> {
    logger.log('Executing build target:', buildTarget.name);

    try {
      await buildTarget.execute(buildContext);
    }
    catch (error) {
      if (error instanceof BuildTargetFailedException) {
        logger.error('Build target failed:', error.message);
      } else{
        logger.error('Build target runtime error:', error.message);
      }
    }
  }

  private findBuildTargets(buildDefinition: BuildDefinition, targets: string[]) {
    return buildDefinition.targets.filter((buildTask) =>
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
