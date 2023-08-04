import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import AuthService from "../../api/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { setTokenLogin, setUser } from "../../redux/authSlice";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const login = async () => {

        if (!email) {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Email không được để trống 👋'
            });
            return;
        }

        if (!password) {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Mật khẩu không được để trống 👋'
            });
            return;
        }

        const data = {
            email: email,
            password: password
        }

        const response = await AuthService.login(data);
        if (response.status && response.status === 'success') {
            Toast.show({
                type: 'success',
                text1: 'Thông báo',
                text2: 'Đăng nhập thành công 👋'
            });

            dispatch(setTokenLogin(response.data.token_info));
            await getProfile(response.data.token_info);
            navigation.replace('HomeScreen');
        } else {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Sai thông tin đăng nhập 👋'
            });
        }
    }

    const getProfile = async (token) => {
        if (token)
        {
            const response = await AuthService.getInfo(token);
            if (response.status === 'success') {
                dispatch(setUser(response.data.user))
            }
        }
    }

    useEffect(() =>{
        getProfile().then(r => {});
    },[])

    return (
        <View style={{flex:1, backgroundColor: "#ffffff"}}>
            <View style={{ marginTop: 20, padding: 15}}>
                <Text style={styles.title}>Đăng nhập</Text>

                <Text style={{
                    color: "#c0bfd5",
                    marginBottom: 15,
                }}>
                    Mời bạn điền đầy đủ thông tin đăng nhập
                </Text>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Email ....'}
                            value={email}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'******'}
                            autoCompleteType="password"
                            textContentType="password"
                            placeholderTextColor='#b4b1cc'
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text style={{ color: "orange", marginBottom: 10}}
                              onPress={() => navigation.navigate('RegisterScreen')}>
                            Bạn chưa có tài khoản? click tại đây để đăng ký
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLogin}
                        onPress={() => login()}
                    >
                        <Text style={styles.buttonLoginText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: "orange", marginBottom: 10, marginTop: 10}}
                              onPress={() => navigation.navigate('HomeScreen')}>
                            Về trang chủ
                        </Text>
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
