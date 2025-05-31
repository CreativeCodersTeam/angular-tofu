import { BuildContext } from './runtime/build-context';
import { DepGraph } from 'dependency-graph';

export interface BuildTargetResult {
  succeeded: boolean;
}

export type BuildTargetFunction = (
  buildContext: BuildContext
) => Promise<BuildTargetResult> | Promise<void>;

export interface BuildTarget {
  name: string;
  execute: BuildTargetFunction;
  dependsOn?: BuildTarget[];
}

export abstract class BuildDefinition {
  private readonly targetDepGraph = new DepGraph<BuildTarget>({
    circular: false,
  });

  targets: BuildTarget[] = [];

  protected initTargets() {
    for (const target of this.targets) {
      this.targetDepGraph.addNode(target.name.toLowerCase(), target);
    }

    for (const target of this.targets) {
      if (target.dependsOn) {
        for (const dependency of target.dependsOn) {
          this.targetDepGraph.addDependency(
            target.name.toLowerCase(),
            dependency.name.toLowerCase()
          );
        }
      }
    }
  }

  getWithDependencies(targetNames: string[]): BuildTarget[] {
    const allTargets = targetNames
      .map((x) => x.toLowerCase())
      .flatMap((name) => {
        return this.targetDepGraph
          .dependenciesOf(name)
          .concat(name)
          .map((name) => this.targetDepGraph.getNodeData(name));
      });

    const targets = new Set<BuildTarget>(allTargets);

    return [...targets];
  }

  abstract name: string;
}
