# Slack Connector Action
GitHub Action to push action events to Slack workflow. 

## Setting up this action

1. First you need to create GitHub Action secret called `SLACK_WEBHOOK_URL`. This secret value should be valid Slack webhook url. For more info please check this [link](https://api.slack.com/messaging/webhooks).

2. If you haven't already done so, create a `.github/workflows` folder in your
  repository (_this is where your actions will live_).

3. Now create a `.github/workflows/slack-notification-on-pr-merge.yml` file with these contents:
``` yaml
name: Notify on PR merge without approvals

on:
  pull_request:
    types: [ closed ]
    branches:
      - main

jobs:
  slack_notification:
    runs-on: ubuntu-latest
    if: ${{ github.event.pull_request.merged && github.event.pull_request.reviews.total_count == 0 }}
    steps:
      - name: Send Slack Notification
        uses: respond-io/slack-connector-action@v1.0.0
        with:
          slack-webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## For Maintainers

As general, this Github action also use ncc to package the code in to single js file. So in the development please globally install ncc first.

```sh
npm i -g @vercel/ncc --save
```

After your development, please execute following command for building the package file, then push the code to GitHub.

```sh
npm run build
```

## Developers

- [Hasitha Gamage](hasitha@rocketbots.io)