import 'reflect-metadata';
import { BuildEngineFactory } from './build-it-lib/runtime/build-engine';
import { TheBuild } from './the-build';
import { container } from 'tsyringe';

new BuildEngineFactory()
  .create()
  .run('ci-build', () => container.resolve(TheBuild));
