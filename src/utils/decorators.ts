import { createDecorator } from 'vue-class-component';
import { DispatchOptions } from 'vuex';

/**
 * A custom decorator to turn properties into methods that can dispatch actions.
 * ***
 * _Note:_ The name provided is the action that will be dispatched. If none is provided, then the property name this
 * decorator is attached to will be used as the action name. Meaning the name of the property should be exactly the
 * name of the action intended to be dispatched.
 * ***
 * Example:
 * ```
 * @Component
 * class Component extends Vue {
 *   @Action('actionName') callAction!;
 *   // or
 *   @Action() actionName!;
 * }
 * ```
 *
 * @param name The action to dispatch.
 * @return Returns a function that accepts a payload and options.
 */
function Action(name?: string) {
  return createDecorator((options, property) => {
    if (!options.methods) {
      options.methods = {};
    }
    const action = name || property;
    // The property name will be used as the method name since the property will be used to dispatch the action.
    options.methods[property] = function(
      payload,
      options?: DispatchOptions | undefined
    ): Promise<any> {
      return this.$store.dispatch(action, payload, options);
    };
  });
}

export { Action };
