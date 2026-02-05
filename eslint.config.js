const eslintConfigNext = require("eslint-config-next");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
  ...eslintConfigNext,
  eslintConfigPrettier,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
