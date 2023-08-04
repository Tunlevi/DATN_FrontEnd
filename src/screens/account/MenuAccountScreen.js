import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logoutRedux, setTokenLogin } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
export default function MenuAccountScreen({navigation})
{
    const Safe = useSafeAreaInsets();

    const dispatch = useDispatch();
    const [account, setAccount] = useState({});

    const user = useSelector((state) => state.authReduce.user);
    const getProfile = async () => {
        if (user)
        {
            setAccount(user)
        }
    }

    const logoutAccount = async () => {
        dispatch(logoutRedux());
        navigation.navigate('HomeScreen');
    }

    useEffect(() => {
        getProfile().then(r => {});
    },[]);


    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff", marginTop: Safe.top}}>
                <View style={{ flex: 1, alignItems: "center", margin: 16}}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Image
                                style={styles.avatar}
                                source={require('./../../../assets/images/icon-user.png')}
                            />
                        </View>
                        <View style={styles.headerRight}>
                            <Text style={styles.name}>{account.name || ''}</Text>
                            <Text style={styles.email}>{account.email || ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1}}>
                    <View style={styles.listsNav}>
                        <View style={styles.itemList}>
                            <TouchableOpacity style={{
                                flex: 1,
                                flexDirection: "row"
                            }}
                                onPress={() => navigation.navigate('UpdateProfileScreen')}
                            >
                                <View style={styles.itemImage}>
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                        source={require('./../../../assets/images/icon-edit.png')}
                                    />
                                </View>
                                <View style={styles.itemName}>
                                    <Text style={{
                                        color: "#adadc8",
                                        fontWeight: "bold",
                                        fontSize: 12,
                                        textTransform: "capitalize"
                                    }}>Cập nhật thông tin</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemList}>
                            <TouchableOpacity style={{
                                flex: 1,
                                flexDirection: "row"
                            }}
                                onPress={() => navigation.navigate('OrderScreen')}
                            >
                                <View style={styles.itemImage}>
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                        source={require('./../../../assets/images/icon-cart-24.png')}
                                    />
                                </View>
                                <View style={styles.itemName}>
                                    <Text style={{
                                        color: "#adadc8",
                                        fontWeight: "bold",
                                        fontSize: 12,
                                        textTransform: "capitalize"
                                    }}>Đơn hàng</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemList}>
                            <TouchableOpacity style={{
                                flex: 1,
                                flexDirection: "row"
                            }}
                                onPress={() => navigation.navigate('NotificationScreen')}
                            >
                                <View style={styles.itemImage}>
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                        source={require('./../../../assets/images/icon-notification.png')}
                                    />
                                </View>
                                <View style={styles.itemName}>
                                    <Text style={{
                                        color: "#adadc8",
                                        fontWeight: "bold",
                                        fontSize: 12,
                                        textTransform: "capitalize"
                                    }}>Thông báo</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemList}>
                            <TouchableOpacity style={{
                                flex: 1,
                                flexDirection: "row"
                            }}
                                              onPress={() => logoutAccount()}
                            >
                                <View style={styles.itemImage}>
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                        source={require('./../../../assets/images/icon-logout.png')}
                                    />
                                </View>
                                <View style={styles.itemName}>
                                    <Text style={{
                                        color: "#adadc8",
                                        fontWeight: "bold",
                                        fontSize: 12,
                                        textTransform: "capitalize"
                                    }}>Đăng xuất</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#d1d1d1",
        flexDirection: "row",
        borderRadius: 10,
        height: 80,
        // backgroundColor: "#ffd40d",
        marginTop: 5,
        width: '100%',
        padding: 15
    },
    headerLeft: {
        width: 50,
        justifyContent: "center",
        height: 50
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderColor: "#f6f6f6",
        borderWidth: 1,
        borderRadius: 10
    },
    name: {
        fontWeight: "bold",
        marginBottom: 5
    },
    email: {
        fontSize: 13
    },
    headerRight: {
        width: imageWidth - 200,
        marginLeft: 10
    },
    imageSlide: {
        width: imageWidth,
        resizeMode: 'cover',
        flex: 1,
    },
    listsNav: {
        margin: 15
    },
    itemList: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        justifyContent: "space-between",
        padding: 10
    },
    itemImage: {
        width: 30,
        height: 30,
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: 'white'
    },
    itemName: {
        marginLeft: 10,
        justifyContent:"center",
        flex: 1,
        alignContent: "center"
    }
})
