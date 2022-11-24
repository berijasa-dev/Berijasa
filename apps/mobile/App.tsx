import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./src/navigation/MainStackNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

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
                httpBatchLink({
                    url: "http://localhost:4000/trpc",
                    // optional
                    // headers() {
                    //     return {
                    //         authorization: getAuthCookie(),
                    //     };
                    // },
                }),
            ],
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
