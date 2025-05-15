// Calculate version based on last git tag and commit count since last version tag
export class SimpleGitVersion {

  async getVersion(prerelease: string): Promise<string> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execPromise = promisify(exec);

    try {
      const { stdout } = await execPromise('git describe --tags --match "v[0-9]*" --abbrev=0');
      const lastTag = stdout.trim();
      const lastVersionTag = lastTag.replace(/^v/, '');
      const { stdout: commitCount } = await execPromise(
        `git rev-list --count ${lastTag}..HEAD`
      );

      const versionParts = this.splitVersion(lastVersionTag);

      let version = '';
      version = this.concatVersion(version, versionParts.major, '0');
      version = this.concatVersion(version, versionParts.minor, '0');
      version = this.concatVersion(version, versionParts.patch, commitCount);

      if (prerelease) {
        version = `${version}-${prerelease}`;
      }

      if (versionParts.patch){
        version = `${version}+${commitCount}`;
      }

      return version;
    } catch (error) {
      console.error('Error getting version:', error);

      throw error;
    }
  }

  private concatVersion(version: string, versionPart: string, defaultVersionPart: string): string {
    versionPart = versionPart || defaultVersionPart;

    return version ? `${version}.${versionPart}` : versionPart;
  }

  private splitVersion(version: string): { major: string; minor: string; patch: string; prerelease: string; buildmetadata: string } {

    const versionParts = version.split('-')[0].split('.');
    const major = versionParts.length >= 1 ?  versionParts[0] : '';
    const minor = versionParts.length >= 2 ?  versionParts[1] : '';
    const patch = versionParts.length >= 3 ?  versionParts[2] : '';
    const prerelease = version.split('-')[1] || '';
    const buildmetadata = version.split('+')[1] || '';

    return { major, minor, patch, prerelease, buildmetadata };
  }

}
