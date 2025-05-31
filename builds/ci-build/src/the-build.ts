import { BuildContext } from './build-it-lib/runtime/build-context';
import { BuildDefinition, BuildTarget } from './build-it-lib/build-definition';
import { BuildLogger } from './build-it-lib/build-logger';
import { CmdExecutor } from './build-it-lib/shell/cmd-executor';
import { inject, singleton } from 'tsyringe';
import {
  NpmInstallCiOptions,
  NpmPublishOptions,
  NpmTasks,
} from './build-it-lib/tasks/npm-tasks';
import { NxTasks } from './build-it-lib/tasks/nx-tasks';
import { BuildParameter } from './build-it-lib/build-parameter';
import {
  GIT_VERSION_PARAM,
  SimpleGitVersion,
} from './build-it-lib/git/simple-git-version';

@singleton()
export class TheBuild extends BuildDefinition {
  name = 'Angular Tofu Build';

  constructor(
    @inject(BuildContext) private readonly buildContext: BuildContext,
    @inject(BuildLogger) private readonly logger: BuildLogger,
    @inject(NpmTasks) private readonly npmTasks: NpmTasks,
    @inject(NxTasks) private readonly nxTasks: NxTasks,
    @inject(CmdExecutor) private readonly cmdExecutor: CmdExecutor,
    @inject(GIT_VERSION_PARAM)
    private readonly gitVersion: BuildParameter<SimpleGitVersion>
  ) {
    super();

    this.targets = [
      this.installDeps,
      this.setVersion,
      this.nxTargets,
      this.setReleaseVersion,
      this.publishNpmPackage,
    ];
    this.initTargets();
  }

  installDeps: BuildTarget = {
    name: 'installDeps',
    execute: async (buildContext) => {
      this.logger.log('Install all dependencies');

      await this.npmTasks.installCi(
        new NpmInstallCiOptions().setLegacyPeerDeps(true)
      );

      await this.cmdExecutor.executeStream(
        'npx playwright install --with-deps'
      );
    },
  };

  setVersion: BuildTarget = {
    name: 'setVersion',
    execute: async (buildContext) => {
      this.logger.log('setVersion');
      this.logger.log(
        'GitVersion:',
        (await this.gitVersion.value.getVersion()).toString()
      );
    },
    dependsOn: [this.installDeps],
  };

  nxTargets: BuildTarget = {
    name: 'nxTargets',
    execute: async (buildContext) => {
      this.logger.log('GitVersion:', await this.gitVersion.value.getVersion());
      await this.nxTasks.runTargetForAffected(['lint', 'test', 'build', 'e2e']);
    },
    dependsOn: [this.setVersion],
  };

  setReleaseVersion: BuildTarget = {
    name: 'setReleaseVersion',
    execute: async (buildContext) => {
      this.logger.log('Setting release version');
      await this.nxTasks.setReleaseVersion(
        (await this.gitVersion.value.getVersion()).toString()
      );
    },
    dependsOn: [this.nxTargets],
  };

  publishNpmPackage: BuildTarget = {
    name: 'publishNpmPackage',
    execute: async (buildContext) => {
      this.logger.log('Publishing NPM package');
      await this.npmTasks.publishNpmPackage(
        new NpmPublishOptions().setVersion(
          (await this.gitVersion.value.getVersion()).toString()
        )
      );
    },
    dependsOn: [this.setReleaseVersion],
  };
}
