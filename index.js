const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const main = async () => {
    try {
        const slackWebhookUrl = core.getInput('slack-webhook-url', { required: true });

        const {
            context: {
                eventName,
                payload: contextPayload,
            }
        } = github;

        const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

        if (eventName !== 'pull_request' || contextPayload.pull_request === undefined || contextPayload.action !== 'closed' || contextPayload.pull_request.merged !== true || contextPayload.pull_request.draft === true) {
            console.log('ERROR :: This action should only be run on a closed pull request that has been merged');
            process.exit(1);
        }

        const {
            pull_request: {
                number: pullRequestNumber,
                title: pullRequestTitle,
                body: pullRequestBody,
                html_url: pullRequestUrl,
                merged_by: {
                    login: pullRequestMergedBy
                }
            }
        } = contextPayload;

        const responseBody = {
            repo,
            actor: pullRequestMergedBy,
            message: pullRequestBody,
            pr_number: pullRequestNumber.toString(),
            pr_title: pullRequestTitle,
            pr_url: pullRequestUrl
        };

        await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: slackWebhookUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(responseBody)
        })

    } catch (error) {
        core.setFailed(error.message);
    }
}

main();