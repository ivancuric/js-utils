"use strict";

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
  },
  "globals": {
    "_": true
  },
  "plugins": [
    "json"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console": "off",
    "no-var": "warn" ,
    "comma-spacing": "warn",
    "keyword-spacing": "warn",
    "comma-dangle": ["error", "never"],
    "semi": "error",
    "indent": [
      "error",
      2
    ],
    "no-unused-vars": [2, {
      "vars": "all",
      "args": "after-used",
      "argsIgnorePattern": "(^reject$|^_$|^req$)",
      "varsIgnorePattern": "(^_$)"
    }],
    "no-unused-expressions": [2, {
      "allowShortCircuit": true,
      "allowTernary": false
    }],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single", { "allowTemplateLiterals": true }
    ]
  }
}
