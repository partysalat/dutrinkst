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
        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/browser/**/*"]}],


    }
};