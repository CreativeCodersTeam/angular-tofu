import { BuildContext } from './runtime/build-context';
import { BuildTargetResult } from './build-definition';
import { BuildTargetFailedException } from './runtime/build-executor';
import { inject } from 'tsyringe';
import { BuildLogger } from './build-logger';

export type BuildTaskAction = (
  buildContext: BuildContext
) => Promise<BuildTargetResult> | Promise<void>;

export abstract class BuildTasks {
  protected constructor(
    protected context: BuildContext,
    protected logger: BuildLogger
  ) {}

  failed(message?: string) {
    throw new BuildTargetFailedException(message);
  }

  protected async execute(action: BuildTaskAction) {
    try {
      await action(this.context);
    } catch (error) {
      this.logger.error('Build task action failed', error);

      this.failed();
    }
  }
}
