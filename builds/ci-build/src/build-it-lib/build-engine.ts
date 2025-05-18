import { container, inject, singleton } from 'tsyringe';
import { BuildExecutor } from './build-executor';
import { BuildDefinition } from './build-definition';
import { BuildLogger } from './build-logger';

@singleton()
export class BuildEngine {
  constructor(
    @inject(BuildExecutor) private buildExecutor: BuildExecutor,
    @inject(BuildLogger) private logger: BuildLogger
  ) {}

  async run(cliName: string, buildDefinition: BuildDefinition): Promise<void> {
    this.logger
      .log('CreativeCoders build-it')
      .log('=======================')
      .log()
      .log('Running build:', buildDefinition.name)
      .log()
      .log('Available build targets:')
      .logMany(buildDefinition.targets, target => `  - ${target.name}`)
      .log();

    await this.buildExecutor.setup(cliName).run(buildDefinition);
  }
}

export async function runBuildEngine<TBuildDefinition extends BuildDefinition>(
  cliName: string,
  buildDefinition: TBuildDefinition
) {
  const buildEngine = container.resolve(BuildEngine);

  await buildEngine.run(cliName, buildDefinition);
}
