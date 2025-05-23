export class BuildParameter<T> {
  constructor(public readonly name: string, public readonly value: T) {}
}
