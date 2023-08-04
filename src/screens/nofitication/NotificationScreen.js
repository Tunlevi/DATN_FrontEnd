import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default function NotificationScreen()
{
    const Safe = useSafeAreaInsets();
    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff"}}>
                <View style={{ flex: 1}}>
                    <View style={styles.listsNav}>
                        <View style={styles.itemList}>
                            <TouchableOpacity style={{
                                flex: 1,
                                flexDirection: "row"
                            }}
                                  onPress={() => navigation.navigate('UpdateProfileScreen')}
                            >
                                <View style={styles.itemImage}>
                                    <Image
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                        source={require('./../../../assets/images/icon-user.png')}
                                    />
                                </View>
                                <View style={styles.itemInfo}>
                                    <View style={styles.itemInfoHeader}>
                                       <View>
                                           <Text style={{
                                               color: "#181b38",
                                               fontWeight: "bold",
                                               fontSize: 12,
                                               textTransform: "capitalize"
                                           }}>Thông báo đơn hàng</Text>
                                       </View>
                                        <View>
                                            <Text style={{ color: "#fb8500"}}>2 phút trước</Text>
                                        </View>
                                    </View>
                                    <Text style={{
                                        color: "#bbb7d0",
                                        fontSize: 12,
                                        textTransform: "capitalize"
                                    }}>Arsenal nhập cuộc tự tin và sớm có bàn thắng mở tỷ số ngay phút thứ 7.</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageSlide: {
        width: imageWidth,
        resizeMode: 'cover',
        flex: 1,
    },
    listsNav: {
        margin: 15
    },
    itemList: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        justifyContent: "space-between",
        padding: 10
    },
    itemImage: {
        width: 50,
        height: 50,
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: 'white'
    },
    itemInfo: {
        marginLeft: 10,
        justifyContent:"center",
        flex: 1,
        alignContent: "center"
    },
    itemInfoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5
    }
})

