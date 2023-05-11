const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const slackWebhookUrl = core.getInput('slack-webhook-url', { required: true });

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

        console.log(`pullRequestNumber >> `, pullRequestNumber);
        console.log(`pullRequestTitle >> `, pullRequestTitle);
        console.log(`pullRequestBody >> `, pullRequestBody);
        console.log(`slackWebhookUrl >> `, slackWebhookUrl);
        console.log(`Context >> `, JSON.stringify(contextPayload));
        console.log(`Event >> `, JSON.stringify(event));

    } catch (error) {
        core.setFailed(error.message);
    }
}

main();