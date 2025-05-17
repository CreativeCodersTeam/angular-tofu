import { BuildTargetResult } from "./build-definition";
import { BuildTargetFailedException } from "./build-executor";
import { BuildContext } from 'esbuild';

export type BuildTaskAction = (
  buildContext: BuildContext
) => Promise<BuildTargetResult> | Promise<void>

export class BuildTasks {
  failed(message?: string){
    throw new BuildTargetFailedException(message);
  }

  protected execute(action: BuildTaskAction){
    // try {
    //   //await action();
    // }
  }
}
