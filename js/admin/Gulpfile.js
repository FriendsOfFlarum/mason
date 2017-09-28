var gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/mason': [
            '../lib/**/*.js',
            'src/**/*.js'
        ]
    }
});
