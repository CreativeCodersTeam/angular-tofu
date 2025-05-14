import { SimpleGitVersion } from './simple-git-version';

async function main() {
  //const { SimpleGitVersion } = await import('./simple-git-version');
  const simpleGitVersion = new SimpleGitVersion();
  const version = await simpleGitVersion.getVersion('alpha');
  console.log('Version:', version);
  return version;
}

main();
