import React, { FC } from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Home } from "../screens/Home";

/**
 * Determines which params can be passed to which screens
 */
export type MainStackArguments = {
    Home?: undefined;
};

/**
 * Abstraction over the different navigation props
 */
export interface MainStackScreenProps<TName extends keyof MainStackArguments> {
    navigation: StackNavigationProp<MainStackArguments, TName>;
    route: RouteProp<MainStackArguments, TName>;
}
/**
 * Abstraction over React.FC which only allows known routes
 */
export type MainStackScreen<TName extends keyof MainStackArguments> = FC<
    MainStackScreenProps<TName>
>;

const MainStack = createStackNavigator<MainStackArguments>();

const screenOptions = {
    headerTitle: "",
    headerShown: false,
    gestureEnabled: false,
};

export const MainStackNavigation: FC = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                animationEnabled: true,
                cardStyle: { backgroundColor: "white" },
            }}
            initialRouteName="Home"
        >
            <MainStack.Screen
                name="Home"
                component={Home}
                options={screenOptions}
            />
        </MainStack.Navigator>
    );
};
