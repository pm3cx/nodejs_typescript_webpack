import { resolve, join } from 'path';
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { Configuration } from "webpack";
import WebpackShellPluginNext from "webpack-shell-plugin-next";

import * as autoprefixer from "autoprefixer";

const miniCssExtractPlugin = require("mini-css-extract-plugin");

const getClientConfig = (
    env: { [key: string]: string },
    argv: { [key: string]: string }
): Configuration => {
    require("dotenv").config({
        path: resolve(__dirname, `.env.${env.mode}`),
    });
    return  {
        mode: argv.mode === "production" ? "production" : "development",
        entry: './public/src/assets/js/main.js',
        output: {
            path: resolve(__dirname, "build", "public"),
            filename: "assets/js/[name].js"
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './public/src/index.html' }),
            new miniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env"
                            ]
                        }
                    }
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        { loader: miniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: () => [autoprefixer]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ],
        }
    }
}
const getServerConfig = (
    env: { [key: string]: string },
    argv: { [key: string]: string }
): Configuration => {
    require("dotenv").config({
        path: resolve(__dirname, `.env.${env.mode}`),
    });
    return {
        entry: "./src/index.ts",
        target: "node",
        mode: argv.mode === "production" ? "production" : "development",
        externals: [nodeExternals()],
        plugins: [
            new WebpackShellPluginNext({
                onBuildStart: {
                    scripts: ["npm run clean:dev && npm run clean:prod"],
                    blocking: true,
                    parallel: false,
                },
                onBuildEnd: {
                    scripts: ["npm run dev"],
                    blocking: false,
                    parallel: true,
                },
            })
        ],
        module: {
            rules: [{
                test: /\.(ts|js)$/,
                loader: "ts-loader",
                options: {},
                exclude: /node_modules/,
            }]
        },
        resolve: {
            extensions: [".ts", ".js"],
            alias: {
                src: resolve(__dirname, "src"),
            }
        },
        output: {
            path: join(__dirname, "build"),
            filename: "index.js",
        },
        optimization: {
            moduleIds: "deterministic",
            splitChunks: {
                chunks: "all",
            }
        }
    }
}

export default [getServerConfig,getClientConfig];