import { BuildDefinition } from "./build-definition";
import { CmdExecutor } from "./cmd-executor";

export class TheBuild extends BuildDefinition {

  constructor() {
    super();

    const cmd = new CmdExecutor(true);

    super.AddTask("runtargets", () => {
      cmd.execute("npx nx affected -t lint test build e2e");
    });
  }


}
