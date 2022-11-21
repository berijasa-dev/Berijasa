import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";

const queryClient = new QueryClient();

function AppContent() {
    const query = trpc.getUser.useQuery();
    return (
        <View style={styles.container}>
            <Text>
                {query.data?.name}
                {query.data?.id}
            </Text>
            <StatusBar style="auto" />
        </View>
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
                <AppContent />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
