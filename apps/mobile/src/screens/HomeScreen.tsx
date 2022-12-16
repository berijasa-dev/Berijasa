import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
    Button,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { MainStackScreen } from "../navigation/MainStackNavigation";
import { FocusAwareStatusBar } from "../components/FocusAwareStatusBar";
import { sfont, sh, sw } from "../styles/style-helpers";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeTopLeftImage, HomeTopRightImage } from "~assets/patterns";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { RouterOutput, trpc } from "trpc";

export const HomeScreen: MainStackScreen<"HomeScreen"> = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId:
            "285791189129-q0hu15n0n53ulgc7kn75le3dlsm9lful.apps.googleusercontent.com",
        androidClientId:
            "285791189129-v3kgpsj1s1ooajld0uufh55vh67i81r5.apps.googleusercontent.com",
    });

    const [expressResponse, setExpressResponse] =
        useState<RouterOutput["auth"]["loginWithGoogle"]>();

    const { mutate: loginWithGoogle } = trpc.auth.loginWithGoogle.useMutation();

    const k = trpc.user.getUsers.useQuery();
    console.log(k.data);
    const k2 = trpc.user.getUser.useQuery({ name: "Roudain Sarhan" });
    console.log(k2.data);

    useEffect(() => {
        if (response?.type === "success" && response.authentication?.idToken) {
            loginWithGoogle(
                {
                    idToken: response.authentication?.idToken,
                },
                {
                    onSuccess: (data) => {
                        setExpressResponse(data);
                    },
                    onError: (err) => {
                        Alert.alert(err.message);
                    },
                }
            );
        }
    }, [loginWithGoogle, response]);

    return (
        <>
            <FocusAwareStatusBar style="dark" backgroundColor={"white"} />
            <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <Text
                            style={{
                                fontSize: sfont(16),
                                fontWeight: "400",
                            }}
                        >
                            BERIJASA.COM
                        </Text>
                        <Ionicons
                            name="search"
                            size={40}
                            color={"#174953"}
                            style={{ marginLeft: "auto", marginRight: sw(29) }}
                        />
                        <Ionicons name="menu" size={40} color={"#174953"} />
                    </View>
                    <View>
                        <View
                            style={{
                                position: "absolute",
                                height: sh(280),
                                width: "100%",
                                zIndex: -1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Image
                                source={HomeTopLeftImage}
                                style={{
                                    aspectRatio: 0.68, // In my case
                                    width: undefined,
                                    height: "90%",
                                    resizeMode: "contain",
                                }}
                            />
                            <Image
                                source={HomeTopRightImage}
                                style={{
                                    aspectRatio: 0.42, // In my case
                                    width: undefined,
                                    height: "100%",
                                    resizeMode: "contain",
                                    alignSelf: "flex-end",
                                }}
                            />
                        </View>
                        <View
                            style={{
                                paddingHorizontal: sw(37),
                                marginTop: sh(165),
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    paddingBottom: sh(16),
                                    fontSize: sfont(33),
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "#174953",
                                }}
                            >
                                {"Welcome to\nBerijasa"}
                            </Text>
                            <Text
                                style={{
                                    fontSize: sfont(15),
                                    fontWeight: "300",
                                    marginBottom: sh(36),
                                    textAlign: "center",
                                }}
                            >
                                Do you need expert help for completing your
                                projects? Or are you looking for the perfect
                                opportunity to be self-empoyed? No matter what
                                you need, Berijasa has got you covered!
                            </Text>
                            <Button
                                disabled={!request}
                                title="login"
                                onPress={() => {
                                    void promptAsync();
                                }}
                            />

                            {!!expressResponse && (
                                <Text>{expressResponse.email}</Text>
                            )}
                            {!!expressResponse && (
                                <Text>{expressResponse.name}</Text>
                            )}
                            {!!expressResponse && expressResponse.image && (
                                <Image
                                    style={{ height: 100, width: 100 }}
                                    source={{ uri: expressResponse.image }}
                                />
                            )}
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#174953",
                                    borderWidth: 2,
                                    borderColor: "#174953",
                                    marginTop: sh(10),
                                    paddingVertical: sh(12),
                                    paddingHorizontal: sw(30),
                                    borderRadius: sh(12) * 3,
                                    borderBottomRightRadius: 0,
                                    width: "70%",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: sfont(15),
                                        fontWeight: "300",
                                        textAlign: "center",
                                        color: "#F2F5EA",
                                        opacity: 0.3,
                                    }}
                                >
                                    GET STARTED
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: sh(23) }}>
                                <Text
                                    style={{
                                        fontSize: sfont(15),
                                        fontWeight: "400",
                                        textAlign: "center",
                                        color: "#174953",
                                    }}
                                >
                                    LEARN MORE
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: sh(40),
                            }}
                        >
                            <Ionicons
                                name="logo-instagram"
                                size={sh(24)}
                                color={"#174953"}
                            />
                            <Ionicons
                                name="logo-twitter"
                                size={sh(24)}
                                color={"#174953"}
                                style={{ marginHorizontal: sw(40) }}
                            />
                            <Ionicons
                                name="logo-facebook"
                                size={sh(24)}
                                color={"#174953"}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: sh(10),
        flexDirection: "row",
        paddingHorizontal: sw(36),
        alignItems: "center",
    },
});
