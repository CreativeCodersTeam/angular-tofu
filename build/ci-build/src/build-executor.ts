import { BuildDefinition, BuildTaskFunction, BuildContext, BuildTask } from "./build-definition";

export class BuildExecutor {

  static createInstance(args: string[]){
    return new BuildExecutor(args);
  }

  private constructor(private args: string[]) {
  }

  async run(buildDefinition: BuildDefinition) : Promise<void> {
    console.log("CreativeCoders build-it");
    console.log("=======================");
    console.log();
    console.log("Running build:", buildDefinition.name);

    const buildContext = {};

    const buildTasks = this.findBuildTasks(buildDefinition);

    for (const buildTask of buildTasks) {
      await this.executeBuildTask(buildContext, buildTask);
    }
  }

  private async executeBuildTask(buildContext: BuildContext, buildTask: BuildTask) : Promise<void> {
    console.log("Executing build task:", buildTask.name);

    buildTask.execute(buildContext);

    return Promise.resolve();
  }

  private findBuildTasks(buildDefinition: BuildDefinition) {
    return buildDefinition.tasks;
  }
}
