import { inject, injectable } from 'tsyringe';
import { BuildTasks } from '../build-tasks';
import { BuildLogger } from '../build-logger';
import { BuildContext } from '../runtime/build-context';
import { CmdExecutor } from '../shell/cmd-executor';

export class NpmInstallCiOptions {
  legacyPeerDeps: boolean;

  setLegacyPeerDeps(legacyPeerDeps: boolean) {
    this.legacyPeerDeps = legacyPeerDeps;

    return this;
  }
}

export class NpmPublishOptions {
  version: string;

  setVersion(version: string) {
    this.version = version;

    return this;
  }
}

@injectable()
export class NpmTasks extends BuildTasks {
  constructor(
    @inject(BuildLogger) logger: BuildLogger,
    @inject(BuildContext) context: BuildContext,
    @inject(CmdExecutor) private readonly cmdExecutor: CmdExecutor
  ) {
    super(context, logger);
  }

  async installCi(options: NpmInstallCiOptions) {
    await this.execute(async (buildContext) => {
      const args = options.legacyPeerDeps ? ['--legacy-peer-deps'] : [];

      await this.cmdExecutor.executeStream('npm ci', args);
    });
  }

  async publishNpmPackage(options: NpmPublishOptions): Promise<void> {
    await this.execute(async (buildContext) => {
      const args = [
        'publish',
        '--access=public',
        `--registry=https://registry.npmjs.org/`,
      ];

      await this.cmdExecutor.executeStream(`npm ${args.join(' ')}`);
    });
  }
}
