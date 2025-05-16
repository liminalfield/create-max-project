import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedDir = path.resolve(__dirname, '../templates/shared');

export async function initGitRepo(projectName) {
    const targetDir = path.resolve(process.cwd(), projectName);

    try {
        execSync('git init', { cwd: targetDir, stdio: 'ignore' });

        const gitignoreContent = await fs.readFile(path.join(sharedDir, 'gitignore'), 'utf8');
        const gitattributesContent = await fs.readFile(path.join(sharedDir, 'gitattributes'), 'utf8');

        await fs.writeFile(path.join(targetDir, '.gitignore'), gitignoreContent.trimStart());
        await fs.writeFile(path.join(targetDir, '.gitattributes'), gitattributesContent.trimStart());

        console.log(chalk.green('Initialized Git and added .gitignore + .gitattributes'));
    } catch (err) {
        console.error(chalk.red('Failed to initialize Git:'), err.message);
    }
}
