# Chat App frontend
Chat App is a mock WhatsApp application in which this project was also inspired by. The idea behind this project was to
recreate the basic features and functionalities that exist in WhatsApp. The backend project for this project is called
[chat-app-backend](https://github.com/AbrahamLara/chat-app-backend).

I mainly started this project in order to demonstrate and apply what I've learned working with tools and technologies
I was previously unfamiliar with to create this project.

## Description
Users are able to Signup and Login to begin chatting with other users on the platform. Users will be able to tell when
other users are typing in real-time and creating group or individual chats.

## Requirements
- Node.js v14
- TypeScript

## Setup
Before starting development, install dependencies:
* `npm install`

To begin local development:
* `npm run dev`

Build application to run a local prod server:
* `npm run local-prod`

## Notes

- The Vuex documentation for writing tests that mock actions suggests using webpack and inject-loader. As it turns 
  out the example for mocking actions is outdated and other methods of mocking actions should be used since 
  [vue-loader no longer works with inject-loader](https://github.com/vuejs/vue-cli/issues/947#issuecomment-370796856).

- In our test files Vue has to be bootstrapped in order for Vuetify to work properly on the version this project is
  using. See the [comment](https://github.com/vuetifyjs/vuetify/issues/4964#issuecomment-500574050) on the issue 
  about this.<br/>Docs: https://next.vuetifyjs.com/en/getting-started/unit-testing/#bootstrapping-vuetify

- `jest-fetch-mock` uses `cross-fetch` to globally set the fetch API and its interfaces (Request, Response, Headers) 
  in order to mock API calls in jest. It imports `cross-fetch` using `require()`. However, because Babel 6 killed the 
  commonJS default export behavior, when `jest-fetch-mock` imports `cross-fetch` it attempts to access the 
  interfaces like so, `require('cross-fetch').Request` when it should be `require('cross-fetch').default.Request`. 
  Using [babel-plugin-add-module-exports](https://www.npmjs.com/package/babel-plugin-add-module-exports) we can 
  bring back the babel 5 behavior that will allow `require('cross-fetch').Request` to work.

- The `jest-fetch-mock` package doesn't seem to work in this application for unit-testing. Attempting to mock a json 
  response results in jest throwing `TypeError: response.json is not a function`.
