import { container, singleton } from 'tsyringe';
import { LogLevel } from '../build-logger';
import { constructor } from 'tsyringe/dist/typings/types';

@singleton()
export class BuildContext {
  targets: string[];

  dryRun = false;

  logLevel = LogLevel.Info;

  getTasks<T>(ctor: constructor<T>) {
    container.resolve(ctor);
  }
}
