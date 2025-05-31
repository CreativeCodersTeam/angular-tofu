export interface GitVersionBranchRule {
  regex: RegExp;

  isReleaseBranch: boolean;

  increment: 'major' | 'minor' | 'patch';

  preReleaseTag: string;
}

export class GitVersionSettings {
  branchRules: GitVersionBranchRule[] = [
    {
      regex: /^(feature|bugfix|hotfix)\/.*$/,
      isReleaseBranch: false,
      increment: 'minor',
      preReleaseTag: 'alpha',
    },
    {
      regex: /^release\/.*$/,
      isReleaseBranch: true,
      increment: 'patch',
      preReleaseTag: 'beta',
    },
    {
      regex: /^(main|master)$/,
      isReleaseBranch: true,
      increment: 'patch',
      preReleaseTag: '',
    },
  ];

  getRuleForBranch(branchName: string): GitVersionBranchRule | undefined {
    for (const rule of this.branchRules) {
      if (rule.regex.test(branchName)) {
        return rule;
      }
    }

    return undefined;
  }
}
