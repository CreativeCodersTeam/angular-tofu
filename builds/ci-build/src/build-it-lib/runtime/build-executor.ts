import { BuildDefinition, BuildTarget } from '../build-definition';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildLogger } from '../build-logger';
import { inject, injectable } from 'tsyringe';
import { BuildContext } from './build-context';

export class BuildTargetFailedException extends Error {}

@injectable()
export class BuildExecutor {
  private cliName: string;

  constructor(
    @inject(BuildLogger) private readonly logger: BuildLogger,
    @inject(BuildContext) private readonly buildContext: BuildContext
  ) {}

  setup(cliName: string) {
    this.cliName = cliName;

    return this;
  }

  async run(buildDefinition: BuildDefinition): Promise<void> {
    await yargs()
      .scriptName(this.cliName)
      .strict(false)
      .command(
        'run [targets...]',
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
    this.logger.log('Is running on CI build server:', this.buildContext.isCI);

    const buildTargets = this.findBuildTargets(buildDefinition, targets);

    this.buildContext.targets = buildTargets.map((t) => t.name);

    this.logger
      .log('Build tasks for execution')
      .logMany(buildTargets, (target) => `  - ${target.name}`)
      .log();

    for (const buildTarget of buildTargets) {
      if (!(await this.executeBuildTarget(buildTarget))) {
        this.logger.log('Build failed');

        break;
      }
    }
  }

  private async executeBuildTarget(buildTarget: BuildTarget): Promise<boolean> {
    this.logger.log('Executing build target:', buildTarget.name);

    try {
      if (this.buildContext.dryRun) {
        this.logger.log(`[DRY RUN] ${buildTarget.name}`);
        return true;
      }

      await buildTarget.execute(this.buildContext);

      return true;
    } catch (error) {
      if (error instanceof BuildTargetFailedException) {
        this.logger.error(
          'Build target failed:',
          buildTarget.name,
          error.message
        );

        throw error;
      } else {
        this.logger.error(
          'Build target runtime error:',
          buildTarget.name,
          error.message
        );

        throw error;
      }
    }
  }

  private findBuildTargets(
    buildDefinition: BuildDefinition,
    targets: string[]
  ) {
    if (!targets || targets.length === 0) {
      return [];
    }

    return buildDefinition.getWithDependencies(targets);
  }
}
