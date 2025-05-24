import prompts from 'prompts';

export async function askUserInputs() {
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
            { title: 'Dev-only TS project (for use in Max)', value: 'lib-only' },
            { title: 'Full Max project (patcher + TS dev)', value: 'full-project' }
        ],
        initial: 1
    });


    const meta = await prompts([
        {
            type: 'text',
            name: 'version',
            message: 'Initial version:',
            initial: '0.1.0'
        },
        {
            type: 'text',
            name: 'authorName',
            message: 'Author name:',
            initial: ''
        },
        {
            type: 'text',
            name: 'authorEmail',
            message: 'Author email:',
            initial: ''
        }
    ]);

    const { initGit } = await prompts({
        type: 'confirm',
        name: 'initGit',
        message: 'Initialize a Git repository?',
        initial: true
    });

    return { projectName, mode, meta, initGit };
}
