import { SimpleGitVersion } from './simple-git-version';

async function main(args: string[]) {
  console.log('Arguments:', args);
  console.log('Calculating version from git...');

  const simpleGitVersion = new SimpleGitVersion();
  const version = await simpleGitVersion.getVersion('alpha');

  console.log('Version:', version);
  return version;
}

main(process.argv.slice(2));
