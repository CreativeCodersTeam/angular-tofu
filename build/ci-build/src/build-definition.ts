export interface BuildTaskResult {
  succeeded: boolean;
}

export type BuildTaskFunction = (buildContext: BuildContext) => Promise<BuildTaskResult> | Promise<void>;

export interface BuildTask {
  name: string;
  execute: BuildTaskFunction;
}


export abstract class BuildDefinition{
  tasks: BuildTask[] = [];

  abstract buildTasks: BuildTask[];

  AddTask(taskName: string, task: BuildTaskFunction){
    this.tasks.push({name: taskName, execute: task});

    return this;
  }

  abstract name: string;
}

export interface BuildContext{

}

export interface BuildDefinitionFactory extends BuildContext{
}
