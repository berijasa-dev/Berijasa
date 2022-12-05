module.exports = function (api) {
    api.cache(true);

    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    extensions: [
                        ".js",
                        ".jsx",
                        ".ts",
                        ".tsx",
                        ".android.js",
                        ".android.tsx",
                        ".ios.js",
                        ".ios.tsx",
                        ".json",
                    ],
                    root: ["."],
                    alias: {
                        "~assets": "./assets",
                        "~src": "./src",
                        "~screens": "./src/screens",
                    },
                },
            ],
            "react-native-reanimated/plugin",
        ],
    };
};
