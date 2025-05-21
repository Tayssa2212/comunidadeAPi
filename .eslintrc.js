module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ["eslint:recommended", "airbnb-base"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "arrow-parens": ["error", "always"],
    "max-len": ["error", { code: 120, ignoreComments: true, ignoreStrings: true }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-param-reassign": ["error", { props: false }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.test.js", "**/*.spec.js"] }],
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
  },
}
