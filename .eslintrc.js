module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'eslint-config-prettier', 'prettier/vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': false,
    'no-param-reassign': ['error', { props: false }],
    'max-len': ['error', { code: 140 }],
    'no-shadow': ['error', { allow: ['state'] }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
