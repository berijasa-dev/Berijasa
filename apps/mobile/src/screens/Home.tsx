import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { MainStackScreen } from "../navigation/MainStackNavigation";
import { FocusAwareStatusBar } from "../components/FocusAwareStatusBar";
import { sfont, sh, sw } from "../styles/style-helpers";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Home: MainStackScreen<"Home"> = () => {
    return (
        <>
            <FocusAwareStatusBar style="dark" backgroundColor={"white"} />
            <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
                <ScrollView>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingLeft: sw(36),
                        }}
                    >
                        <Text
                            style={{
                                paddingTop: sh(43),
                                fontSize: sfont(16),
                                fontWeight: "400",
                            }}
                        >
                            BERIJASA.COM
                        </Text>
                        <Image
                            source={require("../../assets/patterns/home-up.png")}
                            style={{
                                marginLeft: "auto",
                                height: sh(230),
                                marginRight: -17,
                            }}
                            resizeMode="contain"
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: sw(37),
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
                            {"UNDER\nDEVELOPMENT"}
                        </Text>
                        <Text
                            style={{
                                fontSize: sfont(15),
                                fontWeight: "300",
                                marginBottom: sh(36),
                                textAlign: "center",
                            }}
                        >
                            The website is currently being built, but will be up
                            soon! Be the first to know when we go live.
                        </Text>
                        <TextInput
                            placeholder="enter your email here"
                            style={{
                                borderColor: "#707070",
                                borderWidth: 2,
                                paddingVertical: sh(12),
                                paddingHorizontal: sw(30),
                                borderRadius: sh(12) * 3,
                                borderBottomRightRadius: 0,
                                width: "100%",
                                fontSize: sfont(15),
                                fontWeight: "300",
                                textAlign: "center",
                                color: "#B2B2B2",
                            }}
                        />
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
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: sfont(15),
                                    fontWeight: "300",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                ENTER
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
                    <Image
                        source={require("../../assets/patterns/home-down.png")}
                        style={{ marginTop: 40, height: sh(210) }}
                        resizeMode="contain"
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({});
