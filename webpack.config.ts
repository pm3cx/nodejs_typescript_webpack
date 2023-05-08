import { resolve, join } from 'path';
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { Configuration } from "webpack";
import WebpackShellPluginNext from "webpack-shell-plugin-next";
import * as autoprefixer from "autoprefixer";


const getClientConfig = (
    env: { [key: string]: string },
    argv: { [key: string]: string }
): Configuration => {
    require("dotenv").config({
        path: resolve(__dirname, `.env.${env.mode}`),
    });
    return  {
        entry: "./public/js/main.js",
        target: 'web',
        mode: argv.mode === "production" ? "production" : "development",
        plugins: [
            new HtmlWebpackPlugin(
                {
                    template: resolve(__dirname, "./public/index.html")
                }
            ),
        ],
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    exclude: /(node_modules)/,
                    use: [
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        {
                            loader: 'style-loader',
                        },
                        {
                            // Interprets `@import` and `url()` like `import/require()` and will resolve them
                            loader: 'css-loader'
                        },
                        {
                            // Loader for webpack to process CSS with PostCSS
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: () => [
                                        autoprefixer
                                    ]
                                }
                            }
                        },
                        {
                            // Loads a SASS/SCSS file and compiles it to CSS
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".html", ".js", ".scss"],
            alias: {
                src: resolve(__dirname, "public"),
            }
        },
        output: {
            path: join(__dirname, "build", "public"),
            filename: "main.js",
        },
        optimization: {
            moduleIds: "deterministic",
            splitChunks: {
                chunks: "all",
            }
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