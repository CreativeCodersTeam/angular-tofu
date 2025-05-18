import { exec } from 'child_process';
import { promisify } from 'util';
import { BuildContext } from './build-context';
import { inject, injectable } from 'tsyringe';
import { BuildLogger } from './build-logger';

@injectable()
export class CmdExecutor {
  constructor(
    @inject(BuildContext) private buildContext: BuildContext,
    @inject(BuildLogger) private logger: BuildLogger
  ) {}

  async execute(command: string, args?: string[]): Promise<string> {
    const execPromise = promisify(exec);

    if (args && args.length > 0) {
      command = `${command} ${args.join(' ')}`;
    }

    if (this.buildContext.dryRun) {
      this.logger.debug(`[DRY RUN] ${command}`);
      return '';
    }

    try {
      const { stdout } = await execPromise(command);

      return stdout.trim();
    } catch (error) {
      this.logger.debug('Error executing command', command, ':', error);

      throw error;
    }
  }
}
