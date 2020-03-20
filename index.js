const core = require('@actions/core');
const github = require('@actions/github');
const got = require('got');

async function run() {
  console.log('----------------------------------------------------------');
  try {
    const event = core.getInput('event', { required: true });
    const key = core.getInput('key', { required: true });
    const url = `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;
    // const {eventName, payload} = github.context;

    console.log('Github Context ', github.context);
    console.log('\n');
    console.log('event ', event);
    console.log('key ', key);
    console.log('url ', url);
    console.log('\n');

    const payload = {
      value1: '',
      value2: '',
      value3: '',
    };

    console.log('payload ', payload);
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
