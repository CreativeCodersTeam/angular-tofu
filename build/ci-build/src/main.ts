import { runBuildIt } from './build-executor';
import { TheBuild } from './the-build';

runBuildIt('ci-build', new TheBuild());
