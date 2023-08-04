import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { currencyFormat } from "../../utils/price";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderServiceApi from "../../api/OrderServiceApi";
import Moment from 'moment';

const dimensions = Dimensions.get('window');
export default function OrderScreen({navigation})
{
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state.authReduce.user);

    const getOrders = async () => {
        let filters = {};
        if (user) filters.user_id = user.id;

        const response = await OrderServiceApi.getListsOrder(filters);
        if (response.status === 'success') {
            console.log('-------------- response: ', response.data.orders);
            setOrders(response.data.orders);
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrders().then(r => {});
    },[]);

    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff"}}>
                <View style={styles.lists}>
                    { loading === false && orders && orders.length > 0 && orders.map((item, index) => (
                        <View style={{ flex: 1, marginBottom: 10, borderWidth: .5, padding: 10, borderColor: "#d2d2d2", borderRadius: 10}}>
                            <View style={styles.listItem}>
                                <View style={styles.item}>
                                    <View>
                                        <Text style={styles.itemTextBold}>#{item.id}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemTextValue}>{Moment(item.created_at).format('YYYY-MM-DD HH:mm')}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.item}>
                                    <View>
                                        <Text style={styles.itemTextValue}>Số lượng</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemTextBold}>{item?.transactions?.length}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.item}>
                                    <View>
                                        <Text style={styles.itemTextValue}>Tổng tiền</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemTextBold}>{currencyFormat(item.total_money)} đ</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.item}>
                                    <View>
                                        <Text style={styles.itemTextValue}>Trạng thái thanh toán</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.itemTextBold]}>{item.status_order?.name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.item}>
                                    <View>
                                        <Text style={styles.itemTextValue}>Chi tiết</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('OrderDetailScreen', {
                                            order: item
                                        })}
                                    >
                                        <Text style={styles.itemTextBold}>Xem</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
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
    }
})

