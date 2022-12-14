import "expo-dev-client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
// import { httpBatchLink } from "@trpc/client";
import { httpLink } from "@trpc/client";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./src/navigation/MainStackNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import superjson from "superjson";
import Constants from "expo-constants";
const { manifest } = Constants;

const serverUrlFromExpoConstants = manifest?.debuggerHost
    ?.split(`:`)
    ?.shift()
    ?.concat(`:4000`);

const serverUrl = serverUrlFromExpoConstants
    ? serverUrlFromExpoConstants
    : `localhost:4000`;

const queryClient = new QueryClient();
AvoidSoftInput.setEnabled(true);
let token: string;

function AppContent() {
    return (
        <>
            <NavigationContainer>
                <MainStackNavigation />
            </NavigationContainer>
        </>
    );
}

export default function App() {
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpLink({
                    url: `http://${serverUrl}/api/trpc`,
                    headers: () => {
                        return {
                            Authorization: token,
                        };
                    },
                }),
            ],
            transformer: superjson,
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <AppContent />
                    </GestureHandlerRootView>
                </SafeAreaProvider>
            </QueryClientProvider>
        </trpc.Provider>
    );
}
