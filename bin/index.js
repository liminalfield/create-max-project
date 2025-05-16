#!/usr/bin/env node

import prompts from 'prompts';
import chalk from 'chalk';

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';


async function main() {
  console.log(chalk.blueBright('\n🎛  create-max-project\n'));

  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is the name of your new Max project?',
    initial: 'my-max-project'
  });

  const { mode } = await prompts({
    type: 'select',
    name: 'mode',
    message: 'What type of project would you like to create?',
    choices: [
      { title: 'Dev-only JS/TS project (for use in Max)', value: 'lib-only' },
      { title: 'Full Max project (patcher + JS/TS dev)', value: 'full-project' }
    ],
    initial: 1
  });

  const { language } = await prompts({
    type: 'select',
    name: 'language',
    message: 'Choose a language for your project:',
    choices: [
      { title: 'TypeScript', value: 'typescript' },
      { title: 'JavaScript', value: 'javascript' }
    ],
    initial: 0
  });

  console.log(chalk.green(`\n🔧 Project setup summary:`));
  console.log(`Name:     ${projectName}`);
  console.log(`Type:     ${mode}`);
  console.log(`Language: ${language}`);

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templateDir = path.resolve(__dirname, `../templates/${language}-${mode}`);
  const targetDir = path.resolve(process.cwd(), projectName);

  console.log(chalk.blue(`\n📂 Creating project at ${targetDir}...`));

  await fs.copy(templateDir, targetDir);

  console.log(chalk.green('✔ Project files copied successfully.'));

}

main();
