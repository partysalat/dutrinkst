module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "globals": {
        "document": true
    },
    rules:{
        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/browser/**/*","**/*.spec.js"]}],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};