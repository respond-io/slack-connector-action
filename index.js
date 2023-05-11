const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const slackWebhookUrl = core.getInput('slack-webhook-url', { required: true });

        const {
            context: {
                eventName,
                payload: {
                    pull_request: {
                        number: pullRequestNumber,
                        title: pullRequestTitle,
                        body: pullRequestBody,
                        html_url: pullRequestUrl,
                        merged_by: {
                            login: pullRequestMergedBy
                        }
                    }
                },
            }
        } = github;

        const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

        if (eventName !== 'pull_request' || contextPayload.pull_request === undefined || contextPayload.action !== 'closed' || contextPayload.pull_request.merged !== true || contextPayload.pull_request.draft === true) {
            console.log('ERROR :: This action should only be run on a closed pull request that has been merged');
            process.exit(1);
        }


        console.log(`pullRequestNumber >> `, pullRequestNumber);
        console.log(`pullRequestTitle >> `, pullRequestTitle);
        console.log(`pullRequestBody >> `, pullRequestBody);
        console.log(`slackWebhookUrl >> `, slackWebhookUrl);
        console.log(`Context >> `, JSON.stringify(contextPayload));
        console.log(`Event >> `, JSON.stringify(event));

        const responseBody = {
            repo,
            actor: pullRequestMergedBy,
            message: pullRequestBody,
            pr_number: pullRequestNumber,
            pr_title: pullRequestTitle,
            pr_url: pullRequestUrl
        };

        console.log('Response Body >> ', JSON.stringify(responseBody));

    } catch (error) {
        core.setFailed(error.message);
    }
}

main();