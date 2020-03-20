const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  console.log('----------------------------------------------------------');
  try {
    const event = core.getInput('event', { required: true });
    const key = core.getInput('key', { required: true });
    const url = `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;
    const {eventName, payload} = github.context;

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

    console.log('iftttPayload ', iftttPayload);
    console.log('\n');

    const { response } = await axios.post(url, iftttPayload);
    console.log('response ', response);

    return { response };
  }
  catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

run()
