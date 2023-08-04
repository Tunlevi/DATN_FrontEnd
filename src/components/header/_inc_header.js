import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import FavouriteScreen from "../../screens/favourite/FavouriteScreen";

export default function IncHeaderTop({navigation})
{
    const user = useSelector((state) => state.authReduce.user);
    const listsCart = useSelector((state) => state.cartReducer.listsCart);
    const listsFavourite = useSelector((state) => state.favouriteReducer.lists);

    const checkLogin = async () => {
        if (user) {
            navigation.navigate('MenuAccountScreen');
        } else  {
            navigation.navigate('LoginScreen');
        }
    }

    return (
        <View style={styles.headerTop}>
            <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Image
                    style={styles.tinyLogo}
                    source={require("./../../../assets/images/icon-home.png")}
                />
            </TouchableOpacity>
            <Text style={styles.txtName}>{user?.name ? `Hi ` + user?.name : '' }</Text>
            <TouchableOpacity
                onPress={() => checkLogin()}
            >
                <Image
                    style={styles.avatar}
                    source={require("./../../../assets/images/avatar.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('ShoppingCartScreen')}
            >
                <View style={{
                    position: "relative"
                }}>
                    <Image
                        style={styles.avatar}
                        source={require('./../../../assets/images/icons-shopaholic.png')}
                    />
                    <View style={{
                        position: "absolute",
                        top:0,
                        right:0,
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        backgroundColor: "orange",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: "white"
                        }}>{listsCart.length ? listsCart.length : 0}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('FavouriteScreen')}
            >
                <View style={{
                    position: "relative"
                }}>
                    <Image
                        style={styles.avatar}
                        source={require('./../../../assets/images/favourite.png')}
                    />
                    <View style={{
                        position: "absolute",
                        top:0,
                        right:0,
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        backgroundColor: "orange",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: "white"
                        }}>{listsFavourite.length ? listsFavourite.length : 0}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTop: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 10
    },
    txtName: {
        flex:1,
        fontSize: 15,
        color: 'black',
        fontWeight: "bold",
        textAlign: "center"
    },
    tinyLogo: {
        width: 32,
        height: 32,
    },
    avatar: {
        width: 32,
        height: 32,
        marginLeft: 5
    },
    boxSection: {
        flexDirection:"row",
        alignItems:"center",
        padding: 16
    },
});
