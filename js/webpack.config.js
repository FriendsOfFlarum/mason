const config = require('flarum-webpack-config');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(config(), {
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'src/common/'),
        },
    },
});
