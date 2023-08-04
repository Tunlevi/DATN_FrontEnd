import { ScrollView, StyleSheet, Text, View } from "react-native";
import IncProductItem from "../../components/product/_inc_product_item";
import { useEffect, useState } from "react";
import ProductServiceApi from "../../api/ProductServiceApi";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function ProductListScreen(props)
{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = props.navigation;
    const params = props.route.params;

    const category = params?.category ? params.category: {};
    const keyword = params?.keyword  ? params.keyword : '';
    console.log('------------ params: ', params);
    const getProducts = async() => {
        let filters = {};
        if (category && category.id) filters.category_id = category.id;
        if (keyword) filters.keyword = keyword;

        const response = await ProductServiceApi.getListsProducts(filters);
        console.log('-------------- response; ', response);
        setProducts(response.data.products);
        setLoading(false);
    }

    // category
    useEffect(() => {
        getProducts().then(r => {});
    },[]);

    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff"}}>
                { category && category.name && (
                    <View style={styles.boxTitlePage}>
                        <Text style={styles.boxTitleText}>{category.name}</Text>
                    </View>
                )}
                <View style={styles.lists}>
                    { loading === true ? (
                        <>
                            <SkeletonPlaceholder  backgroundColor="#efedef" >
                                <SkeletonPlaceholder.Item style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View  style={{width: 60, height: 60, borderRadius: 50}} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                    <SkeletonPlaceholder.Item style={{ marginLeft: 10}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={100} height={10} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                            <View style={{ height: 10}} />
                            <SkeletonPlaceholder    backgroundColor="#efedef">
                                <SkeletonPlaceholder.Item style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View  style={{width: 60, height: 60, borderRadius: 50}} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                    <SkeletonPlaceholder.Item style={{ marginLeft: 10}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={100} height={10} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                            <View style={{ height: 10}} />
                            <SkeletonPlaceholder    backgroundColor="#efedef">
                                <SkeletonPlaceholder.Item style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View  style={{width: 60, height: 60, borderRadius: 50}} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                    <SkeletonPlaceholder.Item style={{ marginLeft: 10}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={100} height={10} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                            <View style={{ height: 10}} />
                            <SkeletonPlaceholder    backgroundColor="#efedef">
                                <SkeletonPlaceholder.Item style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View  style={{width: 60, height: 60, borderRadius: 50}} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                    <SkeletonPlaceholder.Item style={{ marginLeft: 10}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={1200} height={10} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                            <SkeletonPlaceholder.Item width={100} height={10} />
                                        </View>
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </>
                    ) : (
                        <>
                            { products && products.length > 0 && products.map((item, index) => (
                                <IncProductItem navigation={navigation} product={item} key={item.id} />
                            ))}
                        </>
                    )}

                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    boxTitlePage: {
        padding: 16,
        paddingBottom: 0
    },
    boxTitleText: {
        fontWeight: "bold",
        fontSize: 16,
        textTransform:"capitalize"
    },
    lists: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between',
        padding: 15,
    }
})
