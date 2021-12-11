/**
 * Components that modifies an external element's style should
 */
declare module '*.temp.sass' {
  /**
   * Create a style tag with styles we want to inject into the DOM with the id specified in the webpack config.
   */
  function use(): void;

  /**
   * Remove the injected style tag from the DOM.
   */
  function unuse(): void;

  export default { __inject__, use, unuse };
}
