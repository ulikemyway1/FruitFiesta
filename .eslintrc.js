module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
    },
    {
      files: ["tests/**/*"],
      env: {
        jest: true,
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],
  },
  ignorePatterns: [
    "webpack.config.js",
    "webpack.dev.config.js",
    ".eslintrc.js",
  ],
};
