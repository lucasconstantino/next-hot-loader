const traverse = require("traverse");

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(initial, options) {
      let config = initial;
      const { dev } = options;

      if (dev) {
        config = Object.assign({}, initial, {
          entry: async () => {
            const entries = await initial.entry();

            // 1. inject react-hot-loader patch entrypoint.
            if (entries["static/runtime/main.js"]) {
              entries["static/runtime/main.js"] = [
                "react-hot-loader/patch",
                entries["static/runtime/main.js"],
              ];
            }

            return entries;
          },
        });

        // 2. replace react-dom with patched @hot-loader/react-dom
        config.resolve.alias["react-dom"] = "@hot-loader/react-dom";

        // 3. add react-hot-loader/babel plugin
        config.module.rules = traverse(config.module.rules).map(function (x) {
          if (x && x.loader === "next-babel-loader" && x.options) {
            x.options.plugins = x.options.plugins || [];
            x.options.plugins.push(require.resolve("react-hot-loader/babel"));
            this.update(x);
          }
        });
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
