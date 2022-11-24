import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { MainStackScreen } from "../navigation/MainStackNavigation";
import { FocusAwareStatusBar } from "../components/FocusAwareStatusBar";

export const Home: MainStackScreen<"Home"> = () => {
    return (
        <>
            <FocusAwareStatusBar style="dark" backgroundColor={"white"} />
            <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
                <Text>HI</Text>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({});
