import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { currencyFormat } from "../../utils/price";
import React, { useEffect, useState } from "react";
import OrderServiceApi from "../../api/OrderServiceApi";
import VoteDetailScreen from "./VoteDetailScreen";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default function OrderDetailScreen(props)
{
    const navigation = props.navigation;
    const params = props.route.params;
    const [order, setOrder] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const cancelOrder = async () => {
        const response = await OrderServiceApi.cancelOrder({
            order_id : order.id,
            status : -1
        });

        if (response.status === 'success') {
            await findOrderDetail(order.id);
        }
    }

    const findOrderDetail = async (orderID = 0) =>
    {
        if (!orderID) {
            orderID = params?.order ? params.order.id : 0;
        }
        const response = await OrderServiceApi.findOneOrder(orderID);
        if (response.status === 'success') {
            setOrder(response.data);
            setTransactions(response.data.transactions);
        }
    }

    useEffect(() => {
        findOrderDetail().then(r => {});
    },[]);

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.listsProduct}>
                { transactions && transactions.map((item, index) => (
                    <View style={styles.itemProduct} key={item.id}>
                        <Image
                            style={styles.imageThumb}
                            source={{ uri: item.avatar}}
                        />
                        <View style={styles.itemInfo}>
                            <Text style={styles.title}>
                                {item.name}
                            </Text>
                            <Text style={styles.price}>
                                <Text>
                                    {currencyFormat(item.price || 0)} x {item.quantity}
                                </Text>
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('VoteDetailScreen', {
                                    transaction: item
                                })}
                                style={styles.btnVote}>
                                <Text style={{ color: "white"}}>Đánh giá</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            <View style={{ flex: 1, marginBottom: 10, padding: 10}}>
                <View style={styles.listItem}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemTextBold}>#{order.id}</Text>
                        </View>
                        <View>
                            <Text style={styles.itemTextValue}>20-02-2022</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemTextValue}>Số lượng</Text>
                        </View>
                        <View>
                            <Text style={styles.itemTextBold}>{order?.transactions?.length}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemTextValue}>Tổng tiền</Text>
                        </View>
                        <View>
                            <Text style={styles.itemTextBold}>{currencyFormat(order?.total_money || 0)} đ</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemTextValue}>Thanh toán</Text>
                        </View>
                        <View>
                            <Text style={[styles.itemTextBold]}>{order.status_order?.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemTextValue}>Trạng thái vận chuyển</Text>
                        </View>
                        <View>
                            <Text style={[styles.itemTextBold]}>{order?.shipping_status_order?.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemTextValue}>Ghi chú</Text>
                        </View>
                        <View>
                            <Text style={[styles.itemTextValue]}>{order.note}</Text>
                        </View>
                    </View>
                </View>
                { order.status == 0 || order.status == 1 && (
                    <View style={styles.listItem}>
                        <View style={styles.item}>
                            <View>
                                <Text style={styles.itemTextValue}>Thao tác</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => cancelOrder()}
                                style={styles.btnCancel}>
                                <Text style={{ color: "white"}}>Huỷ đơn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    lists: {
        flex: 1,
        flexDirection: "column",
        padding: 15,
    },
    titleHeading: {
        fontSize: 14,
        fontWeight: "500",
        color:"#b5b6cf",
        paddingTop: 15,
        paddingLeft: 15
    },
    listItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10
    },
    itemTextBold: {
        fontWeight: "bold"
    },
    itemTextValue: {
        color:"#a3a0c3"
    },
    item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    success: {
        color:"#155724"
    },
    btnCancel: {
        backgroundColor: "#dc3545",
        padding: 5,
        borderRadius: 5
    },
    btnVote: {
        backgroundColor: "#E91E63",
        padding: 5,
        borderRadius: 5
    },
    listsProduct: {
        flex: 1,
        flexDirection: "column",
        padding: 15
    },
    itemProduct: {
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
        marginLeft: 20,
        width: imageWidth - 150
    },
    imageThumb: {
        width: 50,
        height: 50,
        borderRadius:50,
        borderColor: "#f3f3f3"
    },
    boxVote: {
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
        marginBottom: 5,
        display: "flex",
        alignItems: "center"
    },
})


