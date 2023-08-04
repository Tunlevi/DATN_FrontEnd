import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useDispatch } from "react-redux";
import { addToCartStore } from "../../../redux/cartSlice";
import Toast from "react-native-toast-message";
import { currencyFormat } from "../../../utils/price";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
const widthLoading = imageWidth / 2 - 25;


export default function IncProductNewHome({products, navigation, loading})
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

    return (
        <View style={styles.productLists}>
            { loading === true  ? (
                <>
                    <SkeletonPlaceholder borderRadius={4} backgroundColor="#efedef">
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                            <SkeletonPlaceholder.Item marginLeft={20}>
                                <SkeletonPlaceholder.Item width={120} height={10} />
                                <SkeletonPlaceholder.Item marginTop={6} width={80} height={10} />
                                <SkeletonPlaceholder.Item marginTop={6} width={80} height={10} />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </>
            ) : (
                <>
                    { products.map((item, index) => (
                        <View
                            key={item.id}
                        >
                            <View style={styles.productItem}>
                                <View style={{ flex: 1,  alignItems: "center"}}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProductDetailScreen',{
                                            product: item
                                        })}
                                    >
                                        <Image
                                            style={styles.productItemImageThumb}
                                            source={{ uri: item.avatar}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProductDetailScreen')}
                                >
                                    <Text numberOfLines={2} style={styles.productItemTitle}>{ item.name }</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginTop: 10}}>
                                    <Text style={styles.itemPrice}>{currencyFormat(item.price)}</Text>
                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => addToCart(item)}
                                        >
                                            <Image style={{ width: 16, height: 16}} source={require("./../../../../assets/images/icon-cart.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    boxSection: {
        flexDirection:"row",
        alignItems:"center",
        padding: 16
    },
    productLists: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    productItem: {
        width: imageWidth / 2 - 25,
        marginBottom: 15,
        backgroundColor:"#f5f5f5",
        borderRadius: 18,
        flexDirection: "column",
        padding: 10
    },
    productItemImageThumb: {
        width: 100,
        height: 100,
        borderRadius:50,
        borderColor: "#f3f3f3",
        alignItems: "center",
        flex: 1,
        marginBottom: 10
    },
    productItemTitle: {
        fontSize: 14,
        fontWeight: "500",
        overflow: "hidden",
        height: 40
    }
});
