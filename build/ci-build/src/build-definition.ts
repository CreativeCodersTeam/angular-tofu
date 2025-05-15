interface BuildTaskResult {
  succeeded: boolean;
}

interface BuildTask {
  execute: () => BuildTaskResult | void;
}

export class BuildDefinition{
  tasks: {taskName: string; task: () => BuildTask | void}[] = [];

  AddTask(taskName: string, task: () => BuildTask | void){
    this.tasks.push({taskName, task});

    return this;
  }
}
