module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 120 }],
    'no-param-reassign': 1,
    'no-shadow': 1,
    'class-methods-use-this': 0,
    // 'class-methods-use-this': ['error', {
    //   exceptMethods: [
    //     // vue lifecycle methods
    //     'beforeCreate',
    //     'created',
    //     'beforeMount',
    //     'mounted',
    //     'beforeUpdate',
    //     'updated',
    //     'activated',
    //     'deactivated',
    //     'beforeDestroy',
    //     'destroyed',
    //     'errorCaptured',
    //   ],
    // }],
  },
};
