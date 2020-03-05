const Alexa = require('ask-sdk-core');

// Start a session
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.WELCOME)
      .reprompt(messages.HELP)
      .getResponse();
  },
};

// Tell the user a fact
const FactHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'FactIntent';
  },
  handle(handlerInput) {
    var value = handlerInput.requestEnvelope.request.intent.slots.Topic.value;
    console.log(value);
    return handlerInput.responseBuilder
      .speak(messages.FACT)
      .withSimpleCard(skillName, messages.FACT)
      .reprompt()
      .getResponse();
  }
};

// Tell the user a fact about the given number
const NumberFactHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'NumberFactIntent';
  },
  handle(handlerInput) {
    var value = handlerInput.requestEnvelope.request.intent.slots.Number.value;
    console.log(value);
    return handlerInput.responseBuilder
      .speak(messages.NUMBER)
      .withSimpleCard(skillName, messages.NUMBER)
      .getResponse();
  }
};

// Tell the user a fact about the given county
const LocationFactHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'LocationFactIntent';
  },
  handle(handlerInput) {
    var value = handlerInput.requestEnvelope.request.intent.slots.County.value;
    console.log(value);
    return handlerInput.responseBuilder
      .speak(messages.LOCATION)
      .withSimpleCard(skillName, messages.LOCATION)
      .reprompt(messages.LOCATION_FALLBACK)
      .getResponse();
  }
};

// Help the user understand what the skill is for
const HelpHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.HELP)
      .reprompt(messages.HELP_REPROMPT)
      .getResponse();
  },
};

// Tell the user yay all knowledge can't help with that
const FallbackHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.FALLBACK)
      .reprompt(messages.FALLBACK_REPROMPT)
      .getResponse();
  },
};

// Exit the skill
const ExitHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.STOP)
      .getResponse();
  },
};

// Log session end
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

// Handle generic errors
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    return handlerInput.responseBuilder
      .speak(messages.ERROR)
      .getResponse();
  },
};

const skillName = 'Yay All Knowledge';

const messages = {
  // WELCOME: 'Welcome to Yale Smart Living.',
  WELCOME: 'Welcome to Yale Smart Living. We didn\'t recognise your location. Please confirm your address by saying location, followed by your house number and postcode.',
  // FACT: 'Before we arm the alarm, could you confirm your 4-digit voice pin? This is a security feature to periodically verify your identity. Say number, followed by your code.',
  FACT: 'To arm the alarm, say number, followed by your 4-digit voice pin.',
  FACT_FALLBACK: 'To arm the alarm, say number, followed by your voice pin.',
  NUMBER: 'Sorry, there was a problem arming your alarm. Please use the Yale Smart Living app to arm your system.',
  LOCATION: 'Thank you, your address has been verified. You can now set your alarm by saying, arm the alarm.',
  LOCATION_FALLBACK: 'To set your alarm, say arm the alarm.',
  HELP: 'You can say arm my alarm, or you can say exit.',
  HELP_REPROMPT: 'To find out what else you can ask me for visit help.yale.co.uk/how do I set up Alexa.',
  FALLBACK: 'Yale Smart Living can\'t help you with that. It can arm your house alarm if you say: arm.',
  FALLBACK_REPROMPT: 'To arm your house alarm say: arm.',
  ERROR: 'Sorry, something went wrong.',
  STOP: 'Goodbye.',
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    FactHandler,
    NumberFactHandler,
    LocationFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();