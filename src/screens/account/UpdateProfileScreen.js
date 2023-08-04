import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import AuthService from "../../api/AuthService";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { setUser } from "../../redux/authSlice";

export default function UpdateProfileScreen()
{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.authReduce.token_info);
    const user = useSelector((state) => state.authReduce.user);
    const getProfile = async () => {
        if (user)
        {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
        }
    }

    const updateProfile = async () => {
        const data = {
            email: email,
            name: name,
            phone: phone,
            address: address,
        }

        const response = await AuthService.updateProfile(data, token);
        if (response.status === 'success') {
            Toast.show({
                type: 'success',
                text1: 'Thông báo',
                text2: 'Cập nhật thành công 👋'
            });
            dispatch(setUser(response.data))
        }
    }

    useEffect(() => {
        getProfile().then(r => {});
    },[]);

    return (
        <View style={{flex:1, backgroundColor: "#ffffff"}}>
            <View style={{ paddingLeft: 15, paddingRight: 15}}>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Họ tên</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Name ....'}
                            value={name}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(name) => setName(name)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            placeholder={'098 ....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(phone) => setPhone(phone)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            placeholder={'Hà nội ....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(address) => setAddress(address)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            placeholder={'Email ....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonLogin}
                                      onPress={() => updateProfile()}
                    >
                        <Text style={styles.buttonLoginText}>Cập nhật thông tin</Text>
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
    input : {
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
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
