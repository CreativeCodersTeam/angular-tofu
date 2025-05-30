// Calculate version based on last git tag and commit count since last version tag
import { inject, injectable } from 'tsyringe';
import { BuildLogger } from './build-logger';
import { exec } from 'child_process';
import { promisify } from 'util';
import { GitTools } from './git-tools';

export const GIT_VERSION_PARAM = 'GitVersion';

export class Version {
  constructor(
    public major: number,
    public minor: number,
    public patch: number,
    public prerelease?: string,
    public buildMetaData?: string
  ) {}

  static parse(version: string): Version {
    const [versionPart, buildMetaDataPart] = version
      .split('+')
      .map((part) => part.trim());
    const [versionNumberPart, prereleasePart] = versionPart
      .split('-')
      .map((part) => part.trim());
    const [major, minor, patch] = versionNumberPart.split('.').map(Number);

    return new Version(major, minor, patch, prereleasePart, buildMetaDataPart);
  }

  toString(): string {
    let version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease) {
      version += `-${this.prerelease}`;
    }
    if (this.buildMetaData) {
      version += `+${this.buildMetaData}`;
    }
    return version;
  }
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

  async getVersion(): Promise<Version> {
    try {
      const lastTag = await this.gitTools.getLastVersionTag();
      const lastVersionTag = lastTag.replace(/^v/, '');
      const commitCount = Number(
        await this.gitTools.getCommitCountSinceTag(lastTag)
      );

      const newVersion = Version.parse(lastVersionTag);
      this.logger.log('Last version:', newVersion.toString());

      if (commitCount >= 0) {
        newVersion.buildMetaData = commitCount.toString();
      }

      return newVersion;
    } catch (error) {
      console.error('Error getting version:', error);

      throw error;
    }
  }

  private concatVersion(
    version: string,
    versionPart: string,
    defaultVersionPart: string
  ): string {
    versionPart = versionPart || defaultVersionPart;

    return version ? `${version}.${versionPart}` : versionPart;
  }

  async getLastVersionTag() {
    const { stdout } = await this.execPromise(
      'git describe --tags --match "v[0-9]*" --abbrev=0'
    );

    return stdout.trim();
  }

  private splitVersion(version: string): {
    major: string;
    minor: string;
    patch: string;
    prerelease: string;
    buildMetaData: string;
  } {
    const versionParts = version.split('-')[0].split('.');
    const major = versionParts.length >= 1 ? versionParts[0] : '';
    const minor = versionParts.length >= 2 ? versionParts[1] : '';
    const patch = versionParts.length >= 3 ? versionParts[2] : '';
    const prerelease = version.split('-')[1] || '';
    const buildMetaData = version.split('+')[1] || '';

    return { major, minor, patch, prerelease, buildMetaData };
  }
}

export class GitVersionSettings {
  branchRules: GitVersionBranchRule[] = [
    {
      regex: /^(feature|bugfix|hotfix)\/.*$/,
      isReleaseBranch: false,
      increment: 'patch',
      preReleaseTag: 'alpha',
    },
    {
      regex: /^release\/.*$/,
      isReleaseBranch: true,
      increment: 'patch',
      preReleaseTag: 'beta',
    },
    {
      regex: /^main$/,
      isReleaseBranch: true,
      increment: 'patch',
      preReleaseTag: '',
    },
  ];

  mainBranch = 'main';
}

export interface GitVersionBranchRule {
  regex: RegExp;

  isReleaseBranch: boolean;

  increment: 'major' | 'minor' | 'patch';

  preReleaseTag: string;
}
