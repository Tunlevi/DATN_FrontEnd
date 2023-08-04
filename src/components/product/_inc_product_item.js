import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ageVote, currencyFormat } from "../../utils/price";
import { addToCartStore } from "../../redux/cartSlice";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { removeItemStore } from "../../redux/favouriteSlice";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default function IncProductItem({product, navigation, favourite = false})
{
    const dispatch = useDispatch();
    const addToCart = async (product) => {

        let item = {
            name: product.name,
            id: product.id,
            avatar: product.avatar,
            quantity: 1,
            price: product.price
        }

        dispatch(addToCartStore(item));
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Thêm thành công 👋'
        });
    }

    const removeItem = async (product) => {
        console.log('------------ item: ', product);
        dispatch(removeItemStore(product))
    }

    return (
        <View style={styles.item}>
            <View style={styles.itemImg}>
                <Image
                    style={styles.imageThumb}
                    source={{ uri: product.avatar}}
                />
            </View>
            <View style={styles.itemInfo}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen', {
                        product: product
                    })}
                >
                    <Text style={styles.title}>{product.name}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity
                        style={styles.itemCategory}
                        onPress={() => navigation.navigate('ProductListScreen',{
                            category: product?.category
                        })}
                    >
                        <Text style={styles.itemCategoryText}>{product?.category?.name}</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: "row", alignItems:"center"}}>
                        <Image style={{ width: 16, height: 16}} source={require("./../../../assets/images/icon-star.png")} />
                        <Text>({ageVote(product)})</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
                    <Text style={styles.itemPrice}>{currencyFormat(product.price)}</Text>
                    <View style={{
                        width: 30,
                        height: 30,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => addToCart(product)}
                        >
                            <Image style={{ width: 16, height: 16}} source={require("./../../../assets/images/icon-cart.png")} />
                        </TouchableOpacity>
                    </View>
                    {favourite === true && (
                        <View style={{
                            width: 100,
                            height: 30,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}>
                            <TouchableOpacity
                                onPress={() => removeItem(product)}
                            >
                                <Text>Huỷ bỏ</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginRight: 5,
        marginBottom: 10,
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#f5f5f5",
        borderRadius: 15,
        padding: 10
    },
    itemInfo: {
        width: imageWidth - 140,
        marginLeft: 10,
    },
    itemImg: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    imageThumb: {
        borderRadius:50,
        width: 50,
        height: 50,
    },
    itemCategory: {
        backgroundColor: '#d4edda',
        height: 20,
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8
    },
    itemCategoryText: {
        color:"#28a745",
        fontWeight: "500",
        fontSize: 12
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "left",
        color: '#6c757d'
    },
    itemPrice: {
        fontWeight: "bold"
    }
})
