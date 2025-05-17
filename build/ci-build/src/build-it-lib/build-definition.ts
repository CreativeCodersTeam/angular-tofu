export interface BuildTargetResult {
  succeeded: boolean;
}

export type BuildTargetFunction = (
  buildContext: BuildContext
) => Promise<BuildTargetResult> | Promise<void>;

export interface BuildTarget {
  name: string;
  execute: BuildTargetFunction;
}

export abstract class BuildDefinition {
  targets: BuildTarget[] = [];

  AddTarget(targetName: string, onExecute: BuildTargetFunction) {
    this.targets.push({ name: targetName, execute: onExecute });

    return this;
  }

  abstract name: string;
}

export interface BuildContext {
  targets: string[];
}
