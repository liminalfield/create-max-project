import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function updatePackageMetadata(projectName, meta) {
    const packageJsonPath = path.resolve(process.cwd(), projectName, 'dev', 'package.json');

    if (!(await fs.pathExists(packageJsonPath))) {
        console.log(chalk.yellow('No package.json found in dev/ — skipping metadata update.'));
        return;
    }

    const packageJson = await fs.readJson(packageJsonPath);

    packageJson.name = projectName;
    packageJson.version = meta.version || '0.1.0';

    const { authorName, authorEmail } = meta;

    if (authorName || authorEmail) {
        const name = authorName || '';
        const email = authorEmail ? `<${authorEmail}>` : '';
        packageJson.author = `${name} ${email}`.trim();
    }

    packageJson.createdWith = 'create-max-project';

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log(chalk.green('Updated package.json with metadata'));
}
