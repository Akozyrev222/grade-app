
        module.exports = {
            root: true,
            extends: '@react-native-community',
            parser: '@typescript-eslint/parser',
            rules: {
                'jsx-quotes': [1, 'prefer-double'],
            },
            plugins: [
                '@typescript-eslint',
                'redux-saga',
                'prettier',
                'prettier/@typescript-eslint',
            ],
        }
    
