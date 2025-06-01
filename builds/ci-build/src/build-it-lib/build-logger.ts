import { inject, singleton } from 'tsyringe';
import { BuildContext } from './runtime/build-context';

export enum LogLevel {
  Debug = 1,
  Info = 2,
  Warn = 4,
  Error = 8,
}

@singleton()
export class BuildLogger {
  isLogEnabled = true;
  isDebugEnabled = false;
  isWarnEnabled = true;
  isErrorEnabled = true;

  constructor(@inject(BuildContext) buildContext: BuildContext) {
    switch (buildContext.logLevel) {
      case LogLevel.Debug:
        this.isDebugEnabled = true;
        this.isLogEnabled = true;
        this.isWarnEnabled = true;
        this.isErrorEnabled = true;
        break;
      case LogLevel.Info:
        this.isLogEnabled = true;
        this.isWarnEnabled = true;
        this.isErrorEnabled = true;
        break;
      case LogLevel.Warn:
        this.isWarnEnabled = true;
        this.isErrorEnabled = true;
        break;
      case LogLevel.Error:
        this.isErrorEnabled = true;
        break;
    }
  }

  log(...args: any[]) {
    if (!this.isLogEnabled) {
      return this;
    }

    console.log(...args);

    return this;
  }

  logMany<T>(items: T[], logText: (item: T) => string) {
    if (!this.isLogEnabled) {
      return this;
    }

    for (const item of items) {
      const message = logText(item);

      console.log(message);
    }

    return this;
  }

  warn(...args: any[]) {
    if (!this.isWarnEnabled) {
      return this;
    }

    console.warn(...args);

    return this;
  }

  error(...args: any[]) {
    if (!this.isErrorEnabled) {
      return this;
    }

    console.error(...args);

    return this;
  }

  debug(...args: any[]) {
    if (!this.isDebugEnabled) {
      return this;
    }

    console.debug(...args);

    return this;
  }
}
