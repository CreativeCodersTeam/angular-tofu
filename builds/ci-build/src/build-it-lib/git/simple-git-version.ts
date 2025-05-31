import { inject, injectable } from 'tsyringe';
import { BuildLogger } from '../build-logger';
import { exec } from 'child_process';
import { promisify } from 'util';
import { GitTools } from './git-tools';
import { VersionInfo } from '../version-info';
import {
  GitVersionBranchRule,
  GitVersionSettings,
} from './git-version-settings';

export const GIT_VERSION_PARAM = 'GitVersion';

@injectable()
export class SimpleGitVersion {
  private readonly settings: GitVersionSettings;
  private readonly execPromise: (
    command: string
  ) => Promise<{ stdout: string; stderr: string }>;

  constructor(
    @inject(BuildLogger) private readonly logger: BuildLogger,
    @inject(GitTools) private readonly gitTools: GitTools
  ) {
    this.settings = new GitVersionSettings();

    this.execPromise = promisify(exec);
  }

  async getVersion(): Promise<VersionInfo> {
    try {
      const lastTag = await this.gitTools.getLastVersionTag();
      const lastVersionTag = lastTag.replace(/^v/, '');
      const commitCount = Number(
        await this.gitTools.getCommitCountSinceTag(lastTag)
      );

      const branchName = await this.gitTools.getCurrentBranch();
      const branchRule = this.settings.getRuleForBranch(branchName);

      if (branchRule) {
        this.logger.log(
          `Using branch rule for branch "${branchName}": ${branchRule.regex.toString()}`
        );
      }
      const newVersion = VersionInfo.parse(lastVersionTag);

      this.applyBranchRule(newVersion, branchRule);

      if (commitCount >= 0) {
        newVersion.buildMetaData = commitCount.toString();
      }

      return newVersion;
    } catch (error) {
      console.error('Error getting version:', error);

      throw error;
    }
  }

  applyBranchRule(version: VersionInfo, branchRule: GitVersionBranchRule) {
    if (branchRule) {
      // this.logger.log(
      //   `Applying branch rule for branch "${branchRule.branchName}": ${branchRule.regex.toString()}`
      // );
      version.prerelease = branchRule.preReleaseTag;

      //version.buildMetaData = branchRule.buildMetaData;
    } else {
      //this.logger.log(`No branch rule found for branch "${version.branch}"`);
    }
  }
}
