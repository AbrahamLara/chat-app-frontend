module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // This brings back the babel 5 behavior of "require()" returning "module.exports" declarations as the default
  // export, eliminating the need for ".default". So, instead of "require().default.foo" we can do "require().foo".
  // instead.
  // plugins: ['add-module-exports'],
};
