export class NxLib {
  constructor(private dryRun: boolean, private readonly base?: string) {}

  async executeNxCommand(command: string): Promise<string> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execPromise = promisify(exec);

    if (this.dryRun) {
      console.log(`[DRY RUN] npx nx ${command}`);
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

  async runTargetForAffected(targets: string[]) {
    const baseArg = this.base ? `--base=${this.base}` : '';
    return this.executeNxCommand(`affected -t ${targets.join(' ')} ${baseArg}`);
  }

  async getAffectedProjects(): Promise<string[]> {
    const baseArg = this.base ? `--base=${this.base}` : '';
    const affected = await this.executeNxCommand(
      `print-affected ${baseArg} --select=projects`
    );
    return affected
      .split(',')
      .map((project) => project.trim())
      .filter((project) => project.length > 0);
  }

  async buildAffected(): Promise<string> {
    const baseArg = this.base ? `--base=${this.base}` : '';
    return this.executeNxCommand(`affected:build ${baseArg}`);
  }

  async testAffected(): Promise<string> {
    const baseArg = this.base ? `--base=${this.base}` : '';
    return this.executeNxCommand(`affected:test ${baseArg}`);
  }

  async setVersion(project: string, version: string): Promise<string> {
    return this.executeNxCommand(`version ${project} --new-version=${version}`);
  }

  async publishRelease(project: string): Promise<string> {
    return this.executeNxCommand(`release-publish ${project}`);
  }
}
