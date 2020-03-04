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

// Tell the user yay all smart things can't help with that
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

const skillName = 'Yay All Smart Things';

const messages = {
  WELCOME: 'Welcome to Yale Smart Things.',
  FACT: 'Before we arm the alarm, could you confirm your 4-digit pin number? This is a security feature to periodically verify your identity. Say number, followed by your code.',
  FACT_FALLBACK: 'To arm the alarm, say number, followed by your code.',
  NUMBER: 'Sorry, there was a problem arming your alarm. Please use the Yale Smart Living app to arm your system.',
  HELP: 'You can say arm my alarm, or you can say exit.',
  HELP_REPROMPT: 'To find out what else you can ask me for visit help.yale.co.uk/how do I set up Alexa.',
  FALLBACK: 'Yale Smart Things can\'t help you with that. It can arm your house alarm if you say: arm.',
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
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();