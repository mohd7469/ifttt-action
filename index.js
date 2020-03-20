const core = require('@actions/core');
const github = require('@actions/github');
const got = require('got');

async function run() {
  console.log('----------------------------------------------------------');
  try {
    const event = core.getInput('event', { required: true });
    const key = core.getInput('key', { required: true });
    const url = `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;
    const {eventName, payload} = github.context;

    console.log('Github Context ', eventName, payload);

    const PayloadSchema = {
      issueCreatedBy: 'awais786327',
      issueTitle: 'ng serve not working',
      issueDescription: 'Got an error while ng serve'
    };

    const iftttPayload = {
      value1: PayloadSchema['issueCreatedBy'],
      value2: PayloadSchema['issueTitle'],
      value3: PayloadSchema['issueDescription'],
    };

    console.log('payload ', iftttPayload);
    console.log('\n');

    const config = {
      json: payload,
    };

    const { statusCode, body } = await got.post(url, config);
    console.log('statusCode, body ', statusCode, body);

    return { statusCode, body };
  }
  catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

run()
