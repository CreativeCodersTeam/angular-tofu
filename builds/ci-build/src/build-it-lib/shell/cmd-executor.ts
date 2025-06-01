import { exec } from 'child_process';
import { promisify } from 'util';
import { BuildContext } from '../runtime/build-context';
import { inject, injectable } from 'tsyringe';
import { BuildLogger } from '../build-logger';
import { spawn } from 'node:child_process';

@injectable()
export class CmdExecutor {
  constructor(
    @inject(BuildContext) private readonly buildContext: BuildContext,
    @inject(BuildLogger) private readonly logger: BuildLogger
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

  async executeStream(command: string, args?: string[]): Promise<boolean> {
    if (this.buildContext.dryRun) {
      this.logger.log(`[DRY RUN] ${command} ${args ? args.join(' ') : ''}`);
      return true;
    }

    const cmdArgs = args || [];

    return new Promise((resolve) => {
      const childProcess = spawn(command, cmdArgs, {
        shell: true,
        stdio: ['inherit', 'pipe', 'pipe'],
      });

      childProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
      });

      childProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
      });

      childProcess.on('close', (code) => {
        const successful = code === 0;

        if (!successful) {
          this.logger.error(
            `Command failed with code ${code}: ${command} ${cmdArgs.join(' ')}`
          );
        }

        resolve(successful);
      });

      childProcess.on('error', (error) => {
        this.logger.error('Error executing command:', error);
        resolve(false);
      });
    });
  }
}
