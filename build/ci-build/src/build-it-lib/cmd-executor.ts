import { exec } from 'child_process';
import { promisify } from 'util';
import { BuildContext } from './build-context';
import { inject, injectable } from 'tsyringe';
import { BuildLogger } from './build-logger';
import { spawn } from 'node:child_process';

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

  async executeStream(command: string, args?: string[]): Promise<boolean> {
    if (this.buildContext.dryRun) {
      this.logger.log(`[DRY RUN] ${command} ${args ? args.join(' ') : ''}`);
      return true;
    }

    // Kommando und Argumente trennen
    const cmdArgs = args || [];

    return new Promise((resolve) => {
      // Shell-Option true ermöglicht komplexe Befehle
      const childProcess = spawn(command, cmdArgs, {
        shell: true,
        stdio: ['inherit', 'pipe', 'pipe'] // stdin von parent übernehmen, stdout und stderr pipen
      });

      // stdout in Echtzeit zur Konsole streamen
      childProcess.stdout.on('data', (data) => {
        this.logger.log("Datatype: " + typeof data)
        process.stdout.write(data.toString());
        //this.logger.log(data); // Direkt auf die Konsole schreiben
      });

      // stderr in Echtzeit zur Konsole streamen
      childProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
        this.logger.log(data); // Direkt auf die Konsole schreiben
      });

      // Auf Beendigung des Prozesses warten
      childProcess.on('close', (code) => {
        const successful = code === 0;

        if (!successful) {
          this.logger.error(`Befehl fehlgeschlagen mit Code ${code}: ${command} ${cmdArgs.join(' ')}`);
        }

        resolve(successful);
      });

      // Fehlerbehandlung für den Prozess selbst
      childProcess.on('error', (error) => {
        this.logger.error('Fehler beim Ausführen des Befehls:', error);
        resolve(false);
      });
    });

  }
}
