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
    circular: true,
  });

  targets: BuildTarget[] = [];

  constructor() {
    this.targets = this.createTargets();
    this.initTargets();
  }

  private initTargets() {
    for (const target of this.targets) {
      this.targetDepGraph.addNode(target.name, target);
    }

    for (const target of this.targets) {
      if (target.dependsOn) {
        for (const dependency of target.dependsOn) {
          this.targetDepGraph.addDependency(target.name, dependency.name);
        }
      }
    }
  }

  getDependencies(targetNames: string[]): BuildTarget[] {
    const allTargets = targetNames.flatMap((name) => {
      return this.targetDepGraph
        .dependenciesOf(name)
        .map((name) => this.targetDepGraph.getNodeData(name));
    });

    const targets = new Set<BuildTarget>(allTargets);

    return [...targets];
  }

  abstract createTargets(): BuildTarget[];

  abstract name: string;
}
