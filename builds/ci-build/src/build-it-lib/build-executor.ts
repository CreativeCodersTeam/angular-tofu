import { BuildDefinition, BuildTarget } from './build-definition';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildLogger } from './build-logger';
import { inject, injectable } from 'tsyringe';
import { BuildContext } from './build-context';

export class BuildTargetFailedException extends Error {}

@injectable()
export class BuildExecutor {
  private cliName: string;

  constructor(
    @inject(BuildLogger) private logger: BuildLogger,
    @inject(BuildContext) private buildContext: BuildContext
  ) {}

  setup(cliName: string) {
    this.cliName = cliName;

    return this;
  }

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
    const buildTargets = this.findBuildTargets(buildDefinition, targets);

    this.buildContext.targets = buildTargets.map((t) => t.name);

    this.logger
      .log('Build tasks for execution')
      .logMany(buildTargets, (target) => `  - ${target.name}`)
      .log();

    for (const buildTarget of buildTargets) {
      if (!await this.executeBuildTarget(buildTarget)){
        this.logger.log('Build failed');

        break;
      }
    }
  }

  private async executeBuildTarget(buildTarget: BuildTarget): Promise<boolean> {
    this.logger.log('Executing build target:', buildTarget.name);

    try {
      await buildTarget.execute(this.buildContext);

      return true;
    } catch (error) {
      if (error instanceof BuildTargetFailedException) {
        this.logger.error('Build target failed:', error.message);

        return false;
      } else {
        this.logger.error('Build target runtime error:', error.message);

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

    return buildDefinition.targets.filter((buildTask) =>
      targets.includes(buildTask.name)
    );
  }
}
