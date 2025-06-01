import {
  container,
  DependencyContainer,
  inject,
  InjectionToken,
  instanceCachingFactory,
  singleton,
} from 'tsyringe';
import { BuildExecutor, BuildTargetFailedException } from './build-executor';
import { BuildDefinition } from '../build-definition';
import { BuildLogger } from '../build-logger';
import { BuildParameter } from '../build-parameter';
import { GIT_VERSION_PARAM, SimpleGitVersion } from '../git/simple-git-version';
import * as process from 'node:process';

@singleton()
export class BuildEngine {
  constructor(
    @inject(BuildExecutor) private readonly buildExecutor: BuildExecutor,
    @inject(BuildLogger) private readonly logger: BuildLogger
  ) {}

  async run(
    cliName: string,
    createDefinition: () => BuildDefinition
  ): Promise<void> {
    const buildDefinition = createDefinition();

    this.logger
      .log('CreativeCoders build-it')
      .log('=======================')
      .log()
      .log('Running build:', buildDefinition.name)
      .log()
      .log('Available build targets:')
      .logMany(buildDefinition.targets, (target) => `  - ${target.name}`)
      .log();

    try {
      await this.buildExecutor.setup(cliName).run(buildDefinition);
    } catch (error) {
      if (error instanceof BuildTargetFailedException) {
        this.logger.error('Build failed:', error.message);

        process.exit(1);
      } else {
        this.logger.error('Build runtime error:', error.message);

        process.exit(1);
      }
    }
  }
}

export class BuildEngineFactory {
  registerParameter<T>(
    name: string,
    value: T | ((c: DependencyContainer) => T) | symbol
  ) {
    container.register(name, {
      useFactory: instanceCachingFactory<BuildParameter<T>>((c) => {
        if (
          typeof value === 'function' &&
          value.toString().startsWith('class ')
        ) {
          return new BuildParameter<T>(
            name,
            c.resolve(value as InjectionToken<T>)
          );
        }

        const finalValue =
          typeof value === 'function'
            ? (value as (c: DependencyContainer) => T)(c)
            : (value as T);

        return new BuildParameter(name, finalValue);
      }),
    });

    return this;
  }

  create() {
    this.registerParameter(GIT_VERSION_PARAM, SimpleGitVersion);

    return container.resolve(BuildEngine);
  }
}
