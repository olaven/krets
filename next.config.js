const path = require('path');
const glob = require('glob');

module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push(
            /* {
                test: /\.test.js$/,
                loader: 'ignore-loader'
            } */
        );


        config.output = config.output || {};
        config.output.devtoolModuleFilenameTemplate = function (info) {
            return "file:///" + encodeURI(info.absoluteResourcePath);
        }


        config.devtool = 'eval-source-map';
        return config;
    }
};