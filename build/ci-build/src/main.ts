import "reflect-metadata"
import { runBuildEngine } from './build-it-lib/build-engine';
import { TheBuild, TheBuildContext } from './the-build';
import { container } from 'tsyringe';

runBuildEngine<TheBuildContext, TheBuild>('ci-build', container.resolve(TheBuild));
