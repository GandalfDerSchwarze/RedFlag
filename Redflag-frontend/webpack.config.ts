const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = {
    entry: {
        index: './src/main/typescript/index.ts'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
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
                },
                {
                    from: 'node_modules/@shoelace-style/shoelace/dist/assets',
                    to: 'dist/shoelace/assets'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // Styles
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.template\.ts$/,
                loader: 'minify-template-literal-loader',
                options: {
                    caseSensitive: true,
                    collapseWhitespace: true
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', 'ttf'],
    }
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
        publicPath: '/static/',
        assetModuleFilename:"assets/fonts/[name][ext]"
    }
};

module.exports = (env: any) => {
    if (env && env.dev) {
        return merge(commonConfig, devConfig);
    } else {
        return merge(commonConfig, productionConfig);
    }
};