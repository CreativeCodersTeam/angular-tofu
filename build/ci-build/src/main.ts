import { runBuildIt } from './build-it-lib/build-executor';
import { TheBuild } from './the-build';

runBuildIt('ci-build', new TheBuild());
