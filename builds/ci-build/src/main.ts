import "reflect-metadata"
import { runBuildEngine } from './build-it-lib/build-engine';
import { TheBuild } from './the-build';
import { container } from 'tsyringe';

runBuildEngine<TheBuild>('ci-build', container.resolve(TheBuild));
