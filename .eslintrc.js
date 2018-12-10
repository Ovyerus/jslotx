module.exports = {
    root: true,
    env: {
      es6: true
    },
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 9
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  
      quotes: ['warn', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: true
      }],
      semi: 'warn',
      indent: ['error', 4, {
        SwitchCase: 1,
        CallExpression: {
          arguments: 1
        }
      }],
      'no-unsafe-negation': 'error',
      'eqeqeq': ['warn', 'always', {
        null: 'ignore'
      }],
      'no-useless-return': 'error',
      'array-bracket-spacing': 'error',
      'brace-style': ['error', '1tbs', {
        allowSingleLine: true
      }],
      'comma-dangle': 'error',
      'comma-spacing': 'error',
      'comma-style': 'error',
      'computed-property-spacing': 'error',
      'func-call-spacing': 'error',
      'key-spacing': 'error',
      'keyword-spacing': ['error', {
        overrides: {
          catch: {
            after: false
          }
        }
      }],
      'new-parens': 'error',
      'no-array-constructor': 'warn',
      'no-new-object': 'warn',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': 'error',
      'one-var-declaration-per-line': 'error',
      'quote-props': ['error', 'as-needed'],
      'semi-spacing': ['error', {
        before: false,
        after: true
      }],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': 'error',
      'space-unary-ops': ['error', {
        words: true,
        nonwords: false
      }],
      'arrow-parens': ['warn', 'as-needed'],
      'arrow-spacing': 'error',
      'no-useless-rename': 'error',
      'prefer-arrow-callback': 'error',
      'template-curly-spacing': 'error',
      'function-paren-newline': ['error', 'never'],
      'linebreak-style': ['error', 'unix'],
      'prefer-const': 'error',
      'quote-props': ['error', 'as-needed'],
      'prefer-object-spread': 'error',
      'object-shorthand': ['error', 'always', {
        avoidQuotes: true,
        avoidExplicitReturnArrows: true
      }],
      'arrow-body-style': ['error', 'as-needed'],
      curly: ['error', 'multi']
    }
  }
  