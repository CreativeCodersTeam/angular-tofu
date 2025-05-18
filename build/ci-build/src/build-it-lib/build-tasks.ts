import { BuildContext } from "./build-context";
import { BuildTargetResult } from "./build-definition";
import { BuildTargetFailedException } from "./build-executor";
import { inject } from 'tsyringe';

export type BuildTaskAction = (
  buildContext: BuildContext
) => Promise<BuildTargetResult> | Promise<void>

export abstract class BuildTasks {
  constructor(protected context: BuildContext) {
  }
  failed(message?: string){
    throw new BuildTargetFailedException(message);
  }

  protected async execute(action: BuildTaskAction){
    try {
      await action(this.context);
    }
    catch(error){

    }
  }
}
