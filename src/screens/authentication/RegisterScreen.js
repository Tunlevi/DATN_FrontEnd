import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import AuthService from "../../api/AuthService";
import { setTokenLogin, setUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

export default function RegisterScreen({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState(null);

    const dispatch = useDispatch();

    const register = async () => {
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

        if (!name) {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Họ tên không được để trống 👋'
            });
            return;
        }

        const data = {
            email: email,
            password: password,
            name: name
        }

        const response = await AuthService.register(data);

        if (response.status && response.status === 'success') {
            let tokenInfo = response.data.token_info;

            Toast.show({
                type: 'success',
                text1: tokenInfo,
                text2: 'Đăng ký thành công 👋'
            })
            dispatch(setTokenLogin(response.data.token_info));
            setToken(response.data.token_info.accessToken);
            await getProfile(response.data.token_info.accessToken);
            navigation.replace('HomeScreen');

        } else {
            Toast.show({
                type: 'error',
                text1: '401',
                text2: 'Đăng ký thất bại. Xin vui lòng thử lại 👋'
            });
        }
    }

    const getProfile = async (token) => {
        if (token)
        {
            const response = await AuthService.getInfo(token);
            console.log('----------------- response register ', response);
            if (response.status === 'success') {
                dispatch(setUser(response.data.user));
            }
        }
    }

    return (
        <View style={{flex:1, backgroundColor: "#ffffff"}}>
            <View style={{ marginTop: 20, padding: 15}}>
                <Text style={styles.title}>Đăng ký</Text>

                <Text style={{
                    color: "#c0bfd5",
                    marginBottom: 15,
                }}>
                    Mời bạn điền đầy đủ thông tin đăng ký
                </Text>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Full name ....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(name) => setName(name)}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Email ....'}
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'******'}
                            secureTextEntry={true}
                            autoCompleteType="password"
                            textContentType="password"
                            placeholderTextColor='#b4b1cc'
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text style={{ color: "orange", marginBottom: 10}}
                              onPress={() => navigation.navigate('LoginScreen')}>
                            Bạn đã có tài khoản? click tại đây để đăng nhập
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonLogin}
                        onPress={() => register()}
                    >
                        <Text style={styles.buttonLoginText}>Đăng ký</Text>
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
    )
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
