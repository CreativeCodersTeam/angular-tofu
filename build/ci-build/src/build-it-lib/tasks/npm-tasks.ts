import { inject, injectable } from 'tsyringe';
import { BuildTasks } from '../build-tasks';
import { BuildLogger } from '../build-logger';
import { BuildContext } from '../build-context';
import { CmdExecutor } from '../cmd-executor';

export class NpmInstallCiOptions {
  legacyPeerDeps: boolean;

  setLegacyPeerDeps(legacyPeerDeps: boolean){
    this.legacyPeerDeps = legacyPeerDeps;

    return this;
  }
}

@injectable()
export class NpmTasks extends BuildTasks {
  constructor(@inject(BuildLogger) logger: BuildLogger,
              @inject(BuildContext) context: BuildContext,
              @inject(CmdExecutor) private cmdExecutor: CmdExecutor) {
    super(context, logger);

  }

  async installCi(options: NpmInstallCiOptions) {
    await this.execute(async buildContext => {
      const args = options.legacyPeerDeps ? ['--legacy-peer-deps'] : [];

      this.cmdExecutor.execute('npm ci', args);

      //await this.cmdExecutor.execute('exit 1');
    });

  }
}
