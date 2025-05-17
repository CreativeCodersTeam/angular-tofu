import { container, inject, injectable } from 'tsyringe';
import { BuildExecutor } from './build-executor';
import { BuildContext, BuildDefinition } from './build-definition';
import { BuildLogger } from './build-logger';

@injectable()
export class BuildEngine<T extends BuildContext> {
  constructor(
    @inject(BuildExecutor) private buildExecutor: BuildExecutor<T>,
    @inject(BuildLogger) private logger: BuildLogger
  ) {}

  async run(cliName: string, buildDefinition: BuildDefinition): Promise<void> {
    this.logger
      .log('CreativeCoders build-it')
      .log('=======================')
      .log()
      .log('Running build:', buildDefinition.name);

    await this.buildExecutor.setup(cliName).run(buildDefinition);
  }
}

export async function runBuildEngine<T extends BuildContext, TBuildDefinition extends BuildDefinition>(
  cliName: string,
  buildDefinition: TBuildDefinition
) {
  const buildEngine = container.resolve(BuildEngine<T>);

  //container.registerSingleton()

  await buildEngine.run(cliName, buildDefinition);
}
