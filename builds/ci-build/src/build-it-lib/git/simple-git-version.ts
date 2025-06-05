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

interface VersionCalculationInfo {
  lastTag: string;
  lastVersionFromTag: string;
  commitCountSinceLastTag: number;
  branchName: string;
  branchRule: GitVersionBranchRule | undefined;
  version: VersionInfo;
}

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
      const lastVersionFromTag = lastTag.replace(/^v/, '');
      const commitCountSinceLastTag = Number(
        await this.gitTools.getCommitCountSinceTag(lastTag)
      );

      const branchName = await this.gitTools.getCurrentBranch();
      const branchRule = this.settings.getRuleForBranch(branchName);

      if (branchRule) {
        this.logger.log(
          `Using branch rule for branch "${branchName}": ${branchRule.regex.toString()}`
        );
      }
      const newVersion = VersionInfo.parse(lastVersionFromTag);

      this.applyBranchRule({
        lastTag,
        lastVersionFromTag,
        commitCountSinceLastTag,
        branchName,
        branchRule,
        version: newVersion,
      });

      return newVersion;
    } catch (error) {
      this.logger.error('Error getting version:', error);

      throw error;
    }
  }

  applyBranchRule(calcInfo: VersionCalculationInfo): void {
    if (calcInfo.lastTag && calcInfo.commitCountSinceLastTag === 0) {
      return;
    } else {
      calcInfo.version.buildMetaData =
        calcInfo.commitCountSinceLastTag.toString();
    }

    if (calcInfo.branchRule) {
      calcInfo.version.prerelease = calcInfo.branchRule.preReleaseTag;

      switch (calcInfo.branchRule.increment) {
        case 'major':
          calcInfo.version.major++;
          calcInfo.version.minor = 0;
          calcInfo.version.patch = 0;
          break;
        case 'minor':
          calcInfo.version.minor++;
          calcInfo.version.patch = 0;
          break;
        default:
          calcInfo.version.patch++;
          break;
      }
    }
  }
}
