module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        'react/prefer-stateless-function': 0,
        'no-use-before-define': 0
    },
    "env": {
        browser: true,
        jest: true,
    },
    "parser": 'babel-eslint',
};
