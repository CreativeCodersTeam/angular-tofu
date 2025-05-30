import { inject, injectable } from 'tsyringe';
import { CmdExecutor } from './cmd-executor';
import { BuildLogger } from './build-logger';

@injectable()
export class GitTools {
  constructor(
    @inject(CmdExecutor) private readonly cmdExecutor: CmdExecutor,
    @inject(BuildLogger) private readonly logger: BuildLogger
  ) {}

  async getLastVersionTag() {
    try {
      return await this.cmdExecutor.execute('git', [
        'describe',
        '--tags',
        '--match',
        'v[0-9]*',
        '--abbrev=0',
      ]);
    } catch (error) {
      this.logger.error('Error getting last version tag:', error);

      throw error;
    }
  }

  async getCommitCountSinceTag(tag: string) {
    try {
      return await this.cmdExecutor.execute('git', [
        'rev-list',
        '--count',
        tag + '..HEAD',
      ]);
    } catch (error) {
      this.logger.error('Error getting commit count since tag:', error);

      throw error;
    }
  }
}
