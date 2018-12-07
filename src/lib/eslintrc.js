module.exports = {
  env: {
    node: true,
  },
  rules: {
    'object-curly-newline': ['error', 'always'],
    'object-property-newline': ['error', 'always'],
    'array-bracket-newline': ['error', { minItems: 1 }],
    'array-element-newline': ['error', 'always'],
    indent: ['error', 2, {
      ArrayExpression: 1,
    }],
    'comma-dangle': ['error', 'always'],
    quotes: ['error', 'single'],
    'no-trailing-spaces': 'error',
  },
  parserOptions: {
    ecmaVersion: 7,
  },
};
