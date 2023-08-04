import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IncSlideProductDetail from "./include/_inc_slide";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartStore } from "../../redux/cartSlice";
import { addToFavouriteStore } from "../../redux/favouriteSlice";
import Toast from "react-native-toast-message";
import RenderHTML from "react-native-render-html";
import React from "react";
import { ageVote, ageVoteStatic, currencyFormat } from "../../utils/price";
import OrderServiceApi from "../../api/OrderServiceApi";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const dimensions = Dimensions.get('window');
const width = dimensions.width;

const WebDisplay = React.memo(function WebDisplay({html}) {
    return (
        <RenderHTML
            contentWidth={width}
            source={{html}}
            tagsStyles={tagsStyles}
        />
    );
});

export default function ProductDetailScreen({route, navigation}) {
    const [qty, setQty] = useState(1);
    const [contentProduct, setContentProduct] = useState(null);
    const [staticVote, setStaticVote] = useState([]);
    const [listsVote, setListsVote] = useState([]);
    const [loadingStatic, setLoadingStatic] = useState(true);
    const [loadingVote, setLoadingVote] = useState(false);
    const params = route.params;
    const product = params?.product;

    const _onPressIncreaseQty = (e) =>
    {
        setQty(qty+1);
    }

    const _onPressReduceQty = (e) =>
    {
        if (qty <= 0) return;
        setQty(qty-1);
    }

    const dispatch = useDispatch();

    const addToCart = async (product) => {

        let item = {
            name: product.name,
            id: product.id,
            avatar: product.avatar,
            quantity: qty,
            price: product.price
        }
        dispatch(addToCartStore(item));
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Thêm thành công 👋'
        });
    }

    const addToFavourite = async (product) => {

        let item = {
            name: product.name,
            id: product.id,
            avatar: product.avatar,
            category: product?.category,
            quantity: qty,
            price: product.price
        }
        dispatch(addToFavouriteStore(item));
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Thêm yêu thích thành công 👋'
        });
    }

    const getContentProduct = async () => {
        //
        if (product && product.content) setContentProduct(product.content);
    }

    const getStaticVote = async  () => {
        const response = await OrderServiceApi.getStatic(product.id);
        if(response.status === 'success') {
            setStaticVote(response.data);
        }

        setLoadingStatic(false);
    }

    const getListsVote = async  () => {
        const response = await OrderServiceApi.getListsVote(product.id);
        if(response.status === 'success') {
            setListsVote(response.votes.votes);
        }
        setLoadingVote(false);
    }

    useEffect(() => {
        getContentProduct().then(r => {});
        getStaticVote().then(r => {});
        getListsVote().then(r => {});
    },[]);

    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff", marginTop: 0}}>
                <IncSlideProductDetail product={product} />
                <View style={{ padding: 15}}>
                    <View style={{ flex: 1, flexDirection: "row",justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={{ color: "#484b64", fontWeight: "bold", fontSize: 18 }}>
                            {product?.name}
                        </Text>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center"}}>
                            <Image style={{ width: 16, height: 16}} source={require("./../../../assets/images/icon-star.png")} />
                            <Text style={{ marginLeft: 5}}>{ageVote(product)}</Text>
                            <Text style={{ marginLeft: 5}}>({product?.total_vote || 0})</Text>
                            <TouchableOpacity
                                onPress={() => addToCart(product)}
                                style={{
                                width: 30,
                                height: 30,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 1,
                                marginLeft: 5,
                                marginRight: 5
                            }}>
                                <Image style={{ width: 16, height: 16}} source={require("./../../../assets/images/icon-cart.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => addToFavourite(product)}
                                style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}>
                                <Image style={{ width: 16, height: 16}} source={require("./../../../assets/images/favourite.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.itemCategory} onPress={() => navigation.navigate('ProductListScreen')}>
                            <Text style={styles.itemCategoryItem}>{product?.category?.name || "Đang cập nhật"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop:  15}}>
                        <Text style={{ color: "#484b64", fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Giá</Text>
                        <View style={{ flex: 1, justifyContent:  "space-between", alignItems: "center", flexDirection: "row"}}>
                            <Text style={{ color: "#484b64", fontWeight: "bold" }}>{currencyFormat(product?.price)} đ</Text>
                            <View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <TouchableOpacity style={styles.itemQty} onPress={()=>_onPressReduceQty()}>
                                        <Text style={styles.itemQtyText} >-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.valueQty}>{qty}</Text>
                                    <TouchableOpacity style={styles.itemQty} onPress={()=>_onPressIncreaseQty()}>
                                        <Text style={styles.itemQtyText} >+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop:  15}}>
                        <Text style={{ color: "#484b64", fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Nội dung</Text>
                        <View style={{ flex: 1}}>
                            <Text>
                                {product?.description}
                            </Text>
                        </View>
                        <Text style={{ color: "#484b64", fontWeight: "bold", fontSize: 16, marginBottom: 10, marginTop: 15 }}>Đánh giá</Text>
                        { product &&  (
                            <View style={{ flex: 1, marginBottom: 10}}>
                                <View style={{ flex: 1, justifyContent:"flex-start", flexDirection: "row"}}>
                                    {[...Array(5)].map((star, index) => {
                                        return (
                                            ageVote(product) >= (index + 1) ? <Image key={index} style={styles.itemStarVote} source={require("./../../../assets/images/star-active.png")} />
                                                :  <Image key={index} style={styles.itemStarVote} source={require("./../../../assets/images/star.png")} />
                                        );
                                    })}
                                    <Text style={{ fontSize: 16}}>({ageVote(product)}) / ({product?.total_vote})</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "space-between", marginTop: 10}}>
                                    { loadingStatic === false && staticVote.length > 0 && staticVote.map((start, index) => {
                                        return (
                                            <View key={index} style={{ flex: 1, flexDirection: "row", alignItems: "center"}}>
                                                <Text style={{ color: "#323232", fontWeight: "bold"}}>{start.number_vote}</Text>
                                                <Image style={styles.itemStarVote} source={require("./../../../assets/images/star.png")} />
                                                <View style={{ height: 10, width: "70%", backgroundColor: "#f2f2f2"}}>
                                                    <Text style={{ width: `${ageVoteStatic(start.count_number, product.total_vote)}%`, backgroundColor: "#ff9f00", height:10, borderColor: 'red'}}></Text>
                                                </View>
                                                <Text style={{ color: "#323232", fontWeight: "bold", marginLeft: 10, textAlign:"right"}}>{ageVoteStatic(start.count_number, product.total_vote)}% ({start.count_number})</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        )}
                        { loadingVote === true ? (
                            <>
                                {[...Array(3)].map((item, index) => {
                                    return (
                                        <View style={{ marginBottom: 10}}>
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
                                        </View>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                { listsVote && listsVote.length > 0 && listsVote.map((item, index) => {
                                    return (
                                        <View key={index} style={{ borderBottomWidth: .5, paddingBottom: 10,marginBottom: 10, borderBottomColor: "#f2f2f2"}}>
                                            <View style={{ flex: 1, flexDirection: "row"}}>
                                                <Text style={{ fontWeight: "bold"}}>{item?.user?.name}</Text>
                                                <Text style={{ color: "#2ba832" }}>(Đã mua tại app)</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: "row", marginTop: 5}}>
                                                <View style={{ flex: 1, justifyContent:"flex-start", flexDirection: "row"}}>
                                                    {[...Array(5)].map((star, index) => {
                                                        return (
                                                            item.number_vote >= (index + 1) ? <Image key={index} style={styles.itemStarVoteV2} source={require("./../../../assets/images/star-active.png")} />
                                                                :  <Image key={index} style={styles.itemStarVoteV2} source={require("./../../../assets/images/star.png")} />
                                                        );
                                                    })}
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 5}}>
                                                <Text>{item.content_vote}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </>
                        )}
                        {/*<TouchableOpacity style={{ marginTop: 10}} onPress={() => navigation.navigate('HomeScreen')}>*/}
                        {/*    <Text> Về trang chủ</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    itemStarVote: {
        width: 16, height: 16
    },
    itemStarVoteV2: {
        width: 12, height: 12
    },
    itemCategory: {
        backgroundColor: '#d4edda',
        height: 20,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        alignSelf: 'flex-start'
    },
    itemCategoryItem: {
        color:"#28a745",
        fontSize: 13,
        fontWeight: "500",
    },
    itemQty: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        backgroundColor: "#f6f5fa",
        borderRadius: 10,
    },
    itemQtyText: {
        fontWeight: "bold",
        textAlign: "center",
        width: '100%',
        height: '100%',
        padding: 5
    },
    valueQty: {
        alignItems: "center",
        marginLeft: 2,
        marginRight: 2,
        textAlign: "center",
        paddingHorizontal: 10
    }
})
const tagsStyles = {
    a: {
        textDecorationLine: 'none',
    },
};
