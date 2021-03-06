const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");

const config = require("./webpack.config-builder")({
  withDevServer: true,
});

const port = 3000;

config.entry.main.unshift(`webpack-dev-server/client?http://localhost:${port}/`, `webpack/hot/dev-server`);

const compiler = webpack(config);
const devServerOptions = { ...config.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

server.listen(port, "localhost", () => {
  console.log(`dev server listening on port ${port}`);
});
