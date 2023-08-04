import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import IncProductItem from "../../components/product/_inc_product_item";
import { useSelector } from "react-redux";
import IncHeaderTop from "../../components/header/_inc_header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
export default function FavouriteScreen(props) {
    const Safe = useSafeAreaInsets();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = props.navigation;

    const listsProducts = useSelector((state) => state.favouriteReducer.lists);

    const getProducts = async() => {
        setProducts(listsProducts);
        setLoading(false);
    }

    useEffect(() => {
        getProducts().then(r => {});
    },[listsProducts]);

    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff", marginTop: Safe.top}}>
                <IncHeaderTop navigation={navigation} />
                <Text style={styles.titleHeading}>Danh sách sản phẩm</Text>
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
                                <IncProductItem navigation={navigation} product={item} key={item.id} favourite={true} />
                            ))}
                        </>
                    )}

                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleHeading: {
        fontSize: 14,
        fontWeight: "bold",
        color:"#50556a",
        paddingTop: 15,
        paddingLeft: 15
    },
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
