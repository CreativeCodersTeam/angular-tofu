export class VersionInfo {
  constructor(
    public major: number,
    public minor: number,
    public patch: number,
    public prerelease?: string,
    public buildMetaData?: string
  ) {}

  static parse(version: string): VersionInfo {
    const [versionPart, buildMetaDataPart] = version
      .split('+')
      .map((part) => part.trim());
    const [versionNumberPart, prereleasePart] = versionPart
      .split('-')
      .map((part) => part.trim());
    const [major, minor, patch] = versionNumberPart.split('.').map(Number);

    return new VersionInfo(
      major,
      minor,
      patch,
      prereleasePart,
      buildMetaDataPart
    );
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
