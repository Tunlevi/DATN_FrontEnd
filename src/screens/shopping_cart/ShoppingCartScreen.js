import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { currencyFormat } from "../../utils/price";
import { useDispatch, useSelector } from "react-redux";
import {
    decrementQuantity,
    incrementQuantity,
    remoteAll,
    removeItemStore,
} from "../../redux/cartSlice";
import Toast from "react-native-toast-message";
import  OrderServiceApi from './../../api/OrderServiceApi';
import React, { useEffect, useState } from "react";
import IncHeaderTop from "../../components/header/_inc_header";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
export default function ShoppingCartScreen({navigation}) {
    const Safe = useSafeAreaInsets();
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [user_id, setUserId] = useState(0);

    const dispatch = useDispatch();
    let total = 0;
    const listsCart = useSelector((state) => state.cartReducer.listsCart);
    const user = useSelector((state) => state.authReduce.user);
    const token = useSelector((state) => state.authReduce.token_info);

    const getProfile = async () => {
        if (user)
        {
            setFullName(user.name);
            setPhone(user.phone);
            setAddress(user.address);
            setUserId(user.id);
        }
    }

    listsCart.map((item, index) => {
        total += item.quantity  * item.price;
    })

    const _onPressIncreaseQtyItem = async (product) =>
    {
        console.log('---------- PRODUCT: ', product);
        // let item = {
        //     name: product.name,
        //     id: product.id,
        //     avatar: product.avatar,
        //     quantity: product.quantity,
        //     price: product.price
        // }
        dispatch(incrementQuantity(product));
        console.log('----------- listsCart; ', listsCart);
    }

    const _onPressReduceQtyItem = async (product) =>
    {
        let item = {
            name: product.name,
            id: product.id,
            avatar: product.avatar,
            quantity: product.quantity,
            price: product.price
        }
        // dispatch(decrementQuantity(item));
    }

    const removeItem = async (item) => {
        dispatch(removeItemStore(item));
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Xoá thành công 👋'
        });
    }

    const addOrder = async () => {
        if (!fullName) {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Name không được để trống 👋'
            });
            return;
        }

        if (!phone) {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Phone không được để trống 👋'
            });
            return;
        }

        if (!address) {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Address không được để trống 👋'
            });
            return;
        }

        let order = {};
        order.name = fullName;
        order.phone = phone;
        order.address = address;
        order.user_id = user_id;
        order.note = "Ghi chú";
        order.total_money = total;
        order.discount = 0;
        order.products = [];

        listsCart.forEach((item, index) => {
            order.products.push({
                product_id : item.id,
                name : item.name,
                quantity : item.quantity,
                avatar: item.avatar,
                discount : 0,
                price : item.price,
                total_price : item.price * item.quantity
            });
        });

        const response = await OrderServiceApi.add(order, token);
        if (response.status === 'success') {
            Toast.show({
                type: 'success',
                text1: 'Thông báo',
                text2: 'Đơn hàng đang được xử lý 👋'
            });
            dispatch(remoteAll());
            navigation.navigate('HomeScreen');
        } else {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Tạo đơn thất bại 👋'
            });
        }
    }
    useEffect(() => {
        getProfile().then(r => {});
    },[user]);
    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff", marginTop: Safe.top}}>
                <IncHeaderTop navigation={navigation} />
                <Text style={styles.titleHeading}>Danh sách sản phẩm</Text>
                <View style={styles.lists}>
                    { listsCart && listsCart.map((item, index) => (
                        <View style={styles.item} key={item.id}>
                            <Image
                                style={styles.imageThumb}
                                source={{ uri: item.avatar}}
                            />
                            <View style={styles.itemInfo}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.price}>{currencyFormat(item.price || 0)} x {item.quantity}</Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <TouchableOpacity
                                        onPress={() => removeItem(item)}
                                        style={{ width: 15, height: 15}}>
                                        <Image style={{ width: 15, height: 15}} source={require('./../../../assets/images/icon-trash.png')} />
                                    </TouchableOpacity>

                                    {/*<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 80}}>*/}
                                    {/*    <TouchableOpacity style={styles.itemQty} onPress={()=>_onPressReduceQtyItem(item)}>*/}
                                    {/*        <Text style={styles.itemQtyText} >-</Text>*/}
                                    {/*    </TouchableOpacity>*/}
                                    {/*    <Text style={styles.valueQty}>{item?.quantity}</Text>*/}
                                    {/*    <TouchableOpacity style={styles.itemQty} onPress={()=>_onPressIncreaseQtyItem(item)}>*/}
                                    {/*        <Text style={styles.itemQtyText} >+</Text>*/}
                                    {/*    </TouchableOpacity>*/}
                                    {/*</View>*/}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                <Text style={styles.titleHeading}>Thanh toán</Text>
                <View style={styles.listsTotal}>
                    <View style={styles.listsTotalItem}>
                        <Text>Tổng tiền</Text>
                        <Text>{currencyFormat(total || 0)} đ</Text>
                    </View>
                    <View style={styles.listsTotalItem}>
                        <Text>Thuế</Text>
                        <Text>0 %</Text>
                    </View>
                    <View style={styles.listsTotalItem}>
                        <Text>Thành tiền</Text>
                        <Text>{currencyFormat(total || 0)} đ</Text>
                    </View>
                </View>
                <Text style={styles.titleHeading}>Thông tin người nhận</Text>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Họ tên</Text>
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            placeholder={'Name ....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(fullName) => setFullName(fullName)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            placeholder={'09....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(phone) => setPhone(phone)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Địa chỉ nhận hàng</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            placeholder={'Hà nội ....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(address) => setAddress(address)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.listsBtnOrder}
                        onPress={() => addOrder()}
                    >
                        <Text style={styles.listsBtnOrderText}>Đặt đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: "orange", marginBottom: 10, marginTop: 10}}
                              onPress={() => navigation.navigate('HomeScreen')}>
                            Về trang chủ
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    lists: {
        flex: 1,
        flexDirection: "column",
        padding: 15
    },
    titleHeading: {
        fontSize: 14,
        fontWeight: "bold",
        color:"#50556a",
        paddingTop: 15,
        paddingLeft: 15
    },
    item: {
        flex: 1,
        marginRight: 5,
        marginBottom: 10,
        flexDirection: "row",
        padding: 5,
        justifyContent: "space-around",
        borderBottomWidth: .5,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 10
    },
    itemInfo: {
        marginLeft: 10,
        width: imageWidth - 100,
    },
    imageThumb: {
        width: 50,
        height: 50,
        borderRadius:50,
        borderColor: "#f3f3f3"
    },
    title: {
        fontWeight: "500",
        color:"#50556a",
        // color:"#b5b6cf",
        textTransform: "capitalize"
    },
    price: {
        fontWeight: "400",
        color:"#d2d2d2",
        marginTop: 5,
        marginBottom: 5
    },
    listsTotal: {
        flex: 1,
        flexDirection: "column",
        padding: 15
    },
    listsTotalItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5
    },
    listsBtnOrder: {
        backgroundColor: '#fc8503',
        borderRadius: 15,
        justifyContent:'center',
        padding: 15,
        marginTop: 10
    },
    listsBtnOrderText: {
        textAlign: 'center',
        justifyContent:'center',
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    form: {
        marginTop: 30,
        padding: 15
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "bold"
    },
    input : {
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#f5f5f5"
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
        padding: 5,
    },
    valueQty: {
        alignItems: "center",
        marginLeft: 2,
        marginRight: 2,
        textAlign: "center",
        paddingHorizontal: 10
    }
})
