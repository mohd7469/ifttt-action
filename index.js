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

    console.log('eventName ', eventName);
    console.log('github payload ', payload);

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

    const response = await axios.post(url, iftttPayload);
    console.log('axios response ', response);

    return { response };
  }
  catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

run()
