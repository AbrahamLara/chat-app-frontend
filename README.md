# ChatApp frontend
ChatApp is a mock WhatsApp application which this project was also inspired by. The idea behind this project was to
recreate the basic features and functionalities that exist in WhatsApp.

I mainly started this project in order to demonstrate and apply what I've learned working with the tools and
technologies used to create this project.

## Description
Users are able to Signup and Login to begin chatting with other users on the platform. Users will be able to tell when
other users are typing in real-time.

## Requirements
- Vue
- Vuetify
- Vue Router
- Vue Property Decorator
- TypeScript

## Notes

The Vuex documentation for writing tests that mock actions suggests using webpack and inject-loader. As it turns out the
example for mocking actions is outdated and other methods of mocking actions should be used since
[vue-loader no longer works with inject-loader](https://github.com/vuejs/vue-cli/issues/947#issuecomment-370796856).

In our test files Vue has to be bootstrapped in order for Vuetify to work properly on the version this project is using.
See the [comment](https://github.com/vuetifyjs/vuetify/issues/4964#issuecomment-500574050) on the issue about this.<br/>
Docs: https://next.vuetifyjs.com/en/getting-started/unit-testing/#bootstrapping-vuetify <br/>
