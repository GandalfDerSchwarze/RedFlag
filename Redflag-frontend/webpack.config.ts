const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path');


const commonConfig = {
    entry: {
        index: './src/main/typescript/index.ts'
    },
    output: {
        filename: 'main.ts',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'static/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Demo",
            template: 'src/main/typescript/index.html',
            chunks: ["index", "main"]
            //favicon:
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: "node_modules/@webcomponents/webcomponentsjs/",
                    from: "**/*.js",
                    to: "webcomponents"
                }
            ]
        })
    ],
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: './static',
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: "/static/index.html",
            disableDotRule: true
        },
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
};

const productionConfig = {
    mode: "production"
};

const devConfig = {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: './static',
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: "/static/index.html",
            disableDotRule: true
        },
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'target/classes/static/'),
        publicPath: '/static/'
    }
};

module.exports = (env: any) => {
    return commonConfig;
};