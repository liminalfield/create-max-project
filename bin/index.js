#!/usr/bin/env node

import { askUserInputs } from '../src/prompts.js';
import { copyTemplate } from '../src/scaffold.js';
import { initGitRepo } from '../src/git.js';
import { installDependencies } from '../src/install.js';
import { updatePackageMetadata } from '../src/updatePackageJson.js';

console.log('\ncreate-max-project\n');

const {
  projectName,
  mode,
  language = "typescript",
  meta,
  initGit
} = await askUserInputs();

await copyTemplate({ projectName, mode, language });

if (initGit) await initGitRepo(projectName);

await installDependencies(projectName);
await updatePackageMetadata(projectName, meta);

console.log('\nAll done. Happy patching!\n');
