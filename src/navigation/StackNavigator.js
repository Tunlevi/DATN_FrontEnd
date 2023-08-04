import LoginScreen from "../screens/authentication/LoginScreen";
import RegisterScreen from "../screens/authentication/RegisterScreen";
import ProductListScreen from "../screens/product/ProductListScreen";
import ProductDetailScreen from "../screens/product_detail/ProductDetailScreen";
import TabNavigator from "./TabNavigator";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "../screens/category/CategoryScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ShoppingCartScreen from "../screens/shopping_cart/ShoppingCartScreen";
import MenuAccountScreen from "../screens/account/MenuAccountScreen";
import UpdateProfileScreen from "../screens/account/UpdateProfileScreen";
import OrderScreen from "../screens/account/OrderScreen";
import NotificationScreen from "../screens/nofitication/NotificationScreen";
import OrderDetailScreen from "../screens/account/OrderDetailScreen";
import FavouriteScreen from "../screens/favourite/FavouriteScreen";
import VoteDetailScreen from "../screens/account/VoteDetailScreen";
const Stack = createNativeStackNavigator();

export default function MainStackNavigation()
{
    return (
        <Stack.Navigator
            initialRouteName={'TabNavigator'}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                screenOptions={{
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                screenOptions={{
                    headerShown: true
                }}
            />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MenuAccountScreen"
                  component={MenuAccountScreen}
                  options={{
                      title: "Menu",
                      headerShown: true
                  }}
            />
            <Stack.Screen name="UpdateProfileScreen"
                  component={UpdateProfileScreen}
                  options={{
                      title: "Cập nhật thông tin",
                      headerShown: true
                  }}
            />
            <Stack.Screen name="OrderScreen"
                  component={OrderScreen}
                  options={{
                      title: "Đơn hàng",
                      headerShown: true
                  }}
            />
            <Stack.Screen name="OrderDetailScreen"
                  component={OrderDetailScreen}
                  options={{
                      title: "Chi tiết đơn hàng",
                      headerShown: true
                  }}
            />
            <Stack.Screen name="VoteDetailScreen"
                  component={VoteDetailScreen}
                  options={{
                      title: "Đánh giá sản phẩm",
                      headerShown: true
                  }}
            />
            <Stack.Screen name="ShoppingCartScreen" component={ShoppingCartScreen} />
            <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    title: "Thông báo",
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="ProductListScreen"
                component={ProductListScreen}
                options={{
                    title: "Sản phẩm",
                    headerShown: true
                }}
            />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={{
                    title: 'Chi tiết',
                    headerShown: true
                }}
            />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
    )
}
