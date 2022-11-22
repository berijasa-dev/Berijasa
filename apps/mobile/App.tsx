import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";

const queryClient = new QueryClient();

function AppContent() {
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const query = trpc.getUser.useQuery({ name: text }, { enabled: !!text });
    const mutation = trpc.createUser.useMutation();

    return (
        <View style={styles.container}>
            <Text>Create:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={{
                    borderColor: "black",
                    borderWidth: 1,
                    width: "50%",
                    height: 50,
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    mutation.mutate(
                        { name: name },
                        {
                            onSuccess: () => {
                                setName("");
                            },
                        }
                    );
                }}
            >
                <Text>Create User</Text>
            </TouchableOpacity>
            <Text>Search</Text>
            <TextInput
                value={text}
                onChangeText={setText}
                style={{
                    borderColor: "black",
                    borderWidth: 1,
                    width: "50%",
                    height: 50,
                }}
            />
            {query.isSuccess && (
                <>
                    <Text>
                        {"Email:"}
                        {query.data?.email}
                    </Text>
                    <Text>
                        {"Name:"}
                        {query.data?.name}
                    </Text>
                    <Text>
                        {"ID:"}
                        {query.data?.id}
                    </Text>
                </>
            )}
            {query.isError && (
                <>
                    <Text>
                        {"Error:"}
                        {query.error.message}
                    </Text>
                </>
            )}
            {query.isFetching && (
                <>
                    <Text>{"Loading..."}</Text>
                </>
            )}
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
