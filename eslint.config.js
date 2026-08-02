const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,
  {
    settings: {
      "import/resolver": {
        "react-native": {},
      },
    },
    ignores: ["node_modules/**", ".expo/**", "dist/**"],
  },
]);
