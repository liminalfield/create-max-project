import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

export async function installDependencies(projectName) {
    const devDir = path.resolve(process.cwd(), projectName, 'dev');
    const packageJsonPath = path.join(devDir, 'package.json');

    if (await fs.pathExists(packageJsonPath)) {
        console.log(chalk.blue(`\nInstalling dependencies in ${chalk.italic('dev/')}...`));
        try {
            execSync('npm install', {
                cwd: devDir,
                stdio: 'inherit'
            });
            console.log(chalk.green('Dependencies installed.'));
        } catch (err) {
            console.error(chalk.red('Failed to install dependencies. Please run `npm install` manually.'));
        }
    } else {
        console.log(chalk.yellow('No dev/package.json found — skipping install.'));
    }
}
