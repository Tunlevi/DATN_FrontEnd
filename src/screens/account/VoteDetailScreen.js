import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View }
    from "react-native";
// import RNPickerSelect from "react-native-picker-select";
import React, { useEffect, useState } from "react";
// import Select from 'react-select';
import OrderServiceApi from "../../api/OrderServiceApi";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { remoteAll } from "../../redux/cartSlice";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;


const optionsVote = [
    { value: '5', label: 'Thật tuyệt vời' },
    { value: '4', label: 'Tuyệt vời' },
    { value: '3', label: 'Bình thường' }
]

export default function VoteDetailScreen(props)
{
    const navigation = props.navigation;
    const params = props.route.params;
    const [order, setOrder] = useState([]);
    const [contentVote, setContentVote] = useState(null);
    const [numberVote, setNumberVote] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [productName, setProductName] = useState(null);
    const [productId, setProductId] = useState(0);
    const [userID, setUserId] = useState(0);
    const token = useSelector((state) => state.authReduce.token_info);

    const user = useSelector((state) => state.authReduce.user);

    const getProfile = async () => {
        if (user)
        {
            setUserId(user.id);
        }
    }

    const findOrderDetail = async (orderID = 0) =>
    {
        if (params.transaction.name) setProductName(params.transaction.name);
        if (params.transaction.product_id) setProductId(params.transaction.product_id);

        console.log('---------- params: ', params);
        if (!orderID) {
            orderID = params?.order ? params.order.id : 0;
        }
        const response = await OrderServiceApi.findOneOrder(orderID);
        console.log('--------- response: ', orderID);
        if (response.status === 'success') {
            setOrder(response.data);
            setTransactions(response.data.transactions);
        }
    }

    const handleVote = async () => {
        let data = {
            user_id: userID,
            content_vote: contentVote,
            product_id: productId,
            number_vote: numberVote
        }

        const response = await OrderServiceApi.storeVote(data, token);
        if (response.status === 'success') {
            Toast.show({
                type: 'success',
                text1: 'Thông báo',
                text2: 'Đánh giá thành công 👋'
            });
            navigation.navigate('OrderDetailScreen',{
                order: params
            });
        } else {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Đánh giá thất bại 👋'
            });
        }
    }

    useEffect(() => {
        findOrderDetail().then(r => {});
        getProfile().then(r => {});
    },[]);

    return (
        <View style={{flex:1, backgroundColor: "#ffffff"}}>
            <View style={{ paddingLeft: 15, paddingRight: 15}}>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>
                            Đánh giá sản phẩm <Text style={{ color:"red"}}>{productName}</Text>
                        </Text>
                        <TextInput
                            style={styles.inputLg}
                            placeholder={'Nội dung ....'}
                            value={contentVote}
                            multiline={true}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(contentVote) => setContentVote(contentVote)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Điểm đánh giá</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'1,2,3,4,5'}
                            value={numberVote}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(numberVote) => setNumberVote(numberVote)}
                        />
                    </View>
                    <View>

                    </View>
                    <TouchableOpacity style={styles.buttonLogin}
                                      onPress={() => handleVote()}
                    >
                        <Text style={styles.buttonLoginText}>Đánh giá sản phẩm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    lists: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        padding: 15
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: "left",
        marginBottom: 15
    },
    form: {
        marginTop: 30
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "bold"
    },
    inputLg : {
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        minHeight: 50,
        backgroundColor: "#f5f5f5"
    },
    input : {
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        minHeight: 28,
        backgroundColor: "#f5f5f5"
    },
    buttonLogin: {
        backgroundColor: '#fc8503',
        borderRadius: 10,
        justifyContent:'center',
    },
    buttonLoginText: {
        padding: 10,
        textAlign: 'center',
        justifyContent:'center',
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center'
    }
})



