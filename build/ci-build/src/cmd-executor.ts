import { exec } from 'child_process';
import { promisify } from 'util';

export  class CmdExecutor {
  constructor(private dryRun: boolean) {
  }

  async execute(command: string): Promise<string> {
    const execPromise = promisify(exec);

    if (this.dryRun) {
      console.log(`[DRY RUN] ${command}`);
      return '';
    }
    try {
      const { stdout } = await execPromise(`npx nx ${command}`);
      return stdout.trim();
    } catch (error) {
      console.error('Error executing nx command:', error);
      throw error;
    }
  }
}
