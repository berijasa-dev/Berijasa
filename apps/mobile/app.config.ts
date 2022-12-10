// eslint-disable-next-line turbo/no-undeclared-env-vars
const IS_DEV = process.env.APP_VARIANT === "development";

module.exports = () => {
    return {
        name: IS_DEV ? "Berijasa (Dev)" : "Berijasa",
        slug: "berijasa",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            eas: {
                projectId: "e3e39011-13ac-4003-828c-d09caf76c564",
            },
        },
        plugins: [
            [
                "expo-build-properties",
                {
                    android: {
                        kotlinVersion: "1.6.10",
                    },
                },
            ],
        ],
        ios: {
            bundleIdentifier: IS_DEV
                ? "com.berijasa.berijasamobile.dev"
                : "com.berijasa.berijasamobile",
            supportsTablet: true,
        },
        android: {
            package: IS_DEV
                ? "com.berijasa.berijasamobile.dev"
                : "com.berijasa.berijasamobile",
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF",
            },
        },
    };
};
