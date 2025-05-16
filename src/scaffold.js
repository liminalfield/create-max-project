import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function copyTemplate({ projectName, mode, language }) {
    const templateDir = path.resolve(__dirname, `../templates/${language}-${mode}`);
    const targetDir = path.resolve(process.cwd(), projectName);

    console.log(chalk.blue(`\nCreating project at ${targetDir}...`));

    try {
        await fs.copy(templateDir, targetDir);
        console.log(chalk.green('Project files copied successfully.'));
    } catch (err) {
        console.error(chalk.red('Failed to copy project template:'), err.message);
        process.exit(1);
    }
}
