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
    'max-len': ['error', { code: 125 }],
    'no-param-reassign': 'warn',
    'no-shadow': 'warn',
    '@typescript-eslint/camelcase': 'warn',
    'no-underscore-dangle': 'warn',
    'no-bitwise': 'warn',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'warn',
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
