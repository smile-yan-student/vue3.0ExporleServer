const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
function resolve(url) {
    return path.resolve(__dirname, url);
}
module.exports = {
    mode: "production",
    entry: "/index.js",
    output: {
        path: resolve("./dist"),
        filename: "index.js",
    },
    // plugins: [new NodePolyfillPlugin()],
    // externals: {
    //     fs: require("fs"),
    // },
    target: "node",
};
