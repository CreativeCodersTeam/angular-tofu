export class CommandSettings<T> {
  constructor(
    public readonly command: string,
    public readonly args: string[],
    public readonly options: Record<string, any>
  ) {}
}
