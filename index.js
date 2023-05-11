const core = require('@actions/core');
const github = require('@actions/github');
const Version = require('./utils/version');
const ChangeLog = require('./utils/fileHelpers/changelog');
const PackageFile = require('./utils/fileHelpers/packageFile');
const Git = require('./utils/git');
const moment = require('moment');

const main = async () => {
    const gitHelper = new Git();
    try {
        const token = core.getInput('slack-webhook-url', { required: true });

        const { 
            context: { payload: contextPayload, eventName },
            event
        } = github;

        const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split('/');

        if (eventName !== 'pull_request' || contextPayload.pull_request === undefined || contextPayload.action !== 'closed' || contextPayload.pull_request.merged !== true || contextPayload.pull_request.draft === true) {
            console.log('ERROR :: This action should only be run on a closed pull request that has been merged');
            process.exit(1);
        }

        const { number: pullRequestNumber, title: pullRequestTitle, body: pullRequestBody } = contextPayload.pull_request;

        console.log(`Context >> `, JSON.stringify(contextPayload));
        console.log(`Event >> `, JSON.stringify(event));

    } catch (error) {
        core.setFailed(error.message);
    }
}

main();