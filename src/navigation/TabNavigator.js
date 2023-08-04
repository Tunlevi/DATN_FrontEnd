import HomeScreen from "../screens/home/HomeScreen";
import { Image } from "react-native";
import CategoryScreen from "../screens/category/CategoryScreen";
import ShoppingCartScreen from "../screens/shopping_cart/ShoppingCartScreen";
import LoginScreen from "../screens/authentication/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import MenuAccountScreen from "../screens/account/MenuAccountScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator()
{
    const user = useSelector((state) => state.authReduce.user);

    return (
        <Tab.Navigator  screenOptions={{
            headerShown: false,
            tabBarStyle:{

            },
            tabBarItemStyle:{
                padding: 5,
                borderRadius:10,
            }
        }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({size,focused,color}) => {
                        return (
                            <Image
                                style={{ width: size, height: size }}
                                source={require('./../../assets/images/icon-home.png')}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    title: 'Danh mục',
                    tabBarIcon: ({size,focused,color}) => {
                        return (
                            <Image
                                style={{ width: size, height: size }}
                                source={require('./../../assets/images/icon-menu.png')}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Đơn hàng"
                component={ShoppingCartScreen}
                options={{
                    title: 'Đơn hàng',
                    tabBarIcon: ({size,focused,color}) => {
                        return (
                            <Image
                                style={{ width: size, height: size }}
                                source={require('./../../assets/images/icon-cart.png')}
                            />
                        );
                    },
                }}
            />
            { user ? (
                <Tab.Screen
                    name="LoginScreen"
                    component={MenuAccountScreen}
                    options={{
                        title: user?.name,
                        tabBarIcon: ({size,focused,color}) => {
                            return (
                                <Image
                                    style={{ width: size, height: size }}
                                    source={require('./../../assets/images/icon-user.png')}
                                />
                            );
                        },
                    }}
                />
            ) : (
                <Tab.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: 'Đăng nhập',
                        tabBarIcon: ({size,focused,color}) => {
                            return (
                                <Image
                                    style={{ width: size, height: size }}
                                    source={require('./../../assets/images/icon-user.png')}
                                />
                            );
                        },
                    }}
                />
            )}

        </Tab.Navigator>
    )
}
