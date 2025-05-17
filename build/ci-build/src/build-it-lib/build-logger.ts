import { singleton } from 'tsyringe';

@singleton()
export class BuildLogger {
  log(...args: any[]) {
    console.log(...args);

    return this;
  }

  warn(...args: any[]) {
    console.warn(...args);

    return this;
  }

  error(...args: any[]) {
    console.error(...args);

    return this;
  }

  debug(...args: any[]) {
    console.debug(...args);

    return this;
  }
}

export const logger : BuildLogger = new BuildLogger();
