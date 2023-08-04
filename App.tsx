import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigation from "./src/navigation/StackNavigator";
import 'react-native-gesture-handler';
import Toast from "react-native-toast-message";
const Drawer = createDrawerNavigator();
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
    return (
        <>
            <NavigationContainer>
                <Provider store={store}>
                    <MainStackNavigation />
                    {/*<Drawer.Navigator*/}
                    {/*    initialRouteName="MainStackNavigation"*/}
                    {/*    screenOptions={{*/}
                    {/*        headerShown: false*/}
                    {/*    }}*/}

                    {/*>*/}
                    {/*    <Drawer.Screen*/}
                    {/*        name="MainStackNavigation"*/}
                    {/*        component={MainStackNavigation}*/}
                    {/*        options={{*/}
                    {/*            title: 'Menu',*/}
                    {/*            headerShown: false*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*    <Drawer.Screen*/}
                    {/*        name="TabNavigator"*/}
                    {/*        component={TabNavigator}*/}
                    {/*        options={{*/}
                    {/*            title: 'Tab navigation',*/}
                    {/*            headerShown: false*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</Drawer.Navigator>*/}
                </Provider>
            </NavigationContainer>
            <Toast
                position='bottom'
            />
        </>
    );
}
