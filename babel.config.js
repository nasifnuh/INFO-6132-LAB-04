module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@": "./src",
            "@components": "./src/components",
            "@config": "./src/config",
            "@context": "./src/context",
            "@hooks": "./src/hooks",
            "@models": "./src/models",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@services": "./src/services",
          },
        },
      ],
    ],
  };
};
