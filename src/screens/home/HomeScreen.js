import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IncSlideHome from "./include/_inc_slide";
import IncCategoryHome from "./include/_inc_category_home";
import IncProductNewHome from "./include/_inc_product_new";
import ProductServiceApi from "../../api/ProductServiceApi";
import { useEffect, useState } from "react";
import IncHeaderTop from "../../components/header/_inc_header";
import IncLoadingTopHeader from "../../components/loading/_inc_header_top";
import Toast from "react-native-toast-message";

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 24);
const imageWidth = dimensions.width;

export default function HomeScreen({navigation}) {
    const Safe = useSafeAreaInsets();
    const [products, setProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [keyword, setKeyword] = useState('');

    const getProducts = async() => {
        const response = await ProductServiceApi.getListsProducts({});
        setProducts(response.data.products);
        setLoadingProduct(false);
    }

    const search = async () => {
        if (!keyword) {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Keyword không được để trống 👋'
            });
            return;
        }
        navigation.navigate('ProductListScreen',{
            keyword: keyword
        });
    }

    useEffect(() => {
        getProducts().then(r => {});
    },[]);

    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff", marginTop: Safe.top}}>
            <IncHeaderTop navigation={navigation} />
            { loadingProduct === true ? (
                <View style={{ padding: 16, paddingBottom: 0}}>
                    <IncLoadingTopHeader />
                </View>
            ) : (
                <View style={styles.boxSection}>
                    <View style={{flex:1}}>
                        <TextInput
                            value={keyword}
                            style={{
                                backgroundColor: "#F7F7F7",
                                height: 40,
                                alignItems: "center",
                                marginRight: 8,
                                borderRadius: 8,
                                padding: 10
                            }}
                            placeholder={"Tìm kiếm"}
                            onChangeText={(keyword) => setKeyword(keyword)}
                        />
                    </View>
                    <TouchableOpacity
                        style={{backgroundColor: 'orange', height: 40, width:40, borderRadius: 10, alignItems: "center", justifyContent:"center"}}
                        onPress={() => search()}
                    >
                        <Image style={{ width: 20, height: 20}} source={require('./../../../assets/images/icon-search.png')} />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.boxSection}>
                <IncSlideHome imageWidth={imageWidth} imageHeight={imageHeight} />
            </View>
            <IncCategoryHome navigation={navigation} />
            <View style={styles.boxSection}>
                <IncProductNewHome products={products} navigation={navigation} loading={loadingProduct} />
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    boxSection: {
        flexDirection:"row",
        alignItems:"center",
        padding: 16
    },
    imageSlide: {
        width: imageWidth,
        height: imageHeight,
        resizeMode: 'cover',
        flex: 1,
        borderRadius: 20
    },
    categoryHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 30,
        alignItems:"center"
    },
    categoryLists: {
        flex: 1,
        flexDirection: "row",
    },
    categoryListsItem: {
        width: 100,
        marginRight: 5,
        flex: 1,
        alignItems:"center",
        borderWidth: 1,
        borderColor: "#F7F7F7"
    },
    categoryItemAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    categoryItemTitle: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5
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
        overflow: "hidden"
    }
});
