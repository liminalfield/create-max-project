import {
    mkdirSync,
    copyFileSync,
    existsSync,
    readdirSync,
    statSync,
    readFileSync
} from 'fs';
import { resolve, dirname, join } from 'path';

// Base directories
const distDir = resolve('./dist');
const configPath = resolve('./copy.config.json');

// Load config safely
let filesToCopy = [];
let destDir = resolve('../max-project/code'); // default fallback

if (existsSync(configPath)) {
    try {
        const config = JSON.parse(readFileSync(configPath, 'utf8'));

        if (
            config &&
            typeof config === 'object'
        ) {
            if (Array.isArray(config.filesToCopy)) {
                filesToCopy = config.filesToCopy;
            } else {
                console.warn('"filesToCopy" is missing, null, or not an array — defaulting to full copy.');
            }

            if (typeof config.dest === 'string') {
                destDir = resolve(config.dest);
            } else {
                console.warn('"dest" not specified — using default max-project/code path.');
            }
        } else {
            console.warn('copy.config.json is not an object — using defaults.');
        }

    } catch (err) {
        console.error(`Failed to read or parse copy.config.json: ${err.message}`);
        process.exit(1);
    }
} else {
    console.warn('No copy.config.json found — defaulting to full copy of dist/');
}

// Helpers
function copyFilePreservingDirs(srcPath, baseSrcDir, baseDestDir) {
    const relativePath = srcPath.slice(baseSrcDir.length + 1);
    const destPath = join(baseDestDir, relativePath);
    mkdirSync(dirname(destPath), { recursive: true });
    copyFileSync(srcPath, destPath);
    console.log(`Copied ${relativePath}`);
}

function copyAllRecursive(srcDir, destDir) {
    for (const item of readdirSync(srcDir)) {
        const srcPath = join(srcDir, item);
        const stat = statSync(srcPath);
        if (stat.isDirectory()) {
            copyAllRecursive(srcPath, join(destDir, item));
        } else {
            copyFilePreservingDirs(srcPath, distDir, destDir);
        }
    }
}

// Do the copy
mkdirSync(destDir, { recursive: true });

if (filesToCopy.length > 0) {
    for (const relativeFile of filesToCopy) {
        const srcPath = join(distDir, relativeFile);
        if (!existsSync(srcPath)) {
            console.warn(`File not found: ${relativeFile}`);
            continue;
        }
        copyFilePreservingDirs(srcPath, distDir, destDir);
    }
} else {
    console.log('filesToCopy is empty — copying everything from dist/ recursively...');
    copyAllRecursive(distDir, destDir);
}
