import AxiosClient from "./ClientApi";
const AuthService =
    {
        async login(data)
        {
            try {
                const url = `auth/login`;
                const response = await AxiosClient.post(url, data);
                if (response.status === 200) {
                    return response.data;
                }
            } catch (e) {
                console.log('--------------- E ', e);
                return {
                    status: 500,
                    data: {}
                }
            }
        },

        async register(data)
        {
            try {
                const url = `auth/register`;
                const response = await AxiosClient.post(url, data);
                if (response.status === 200) {
                    return response.data;
                }
            } catch (e) {
                console.log('--------------- E ', e);
                return {
                    status: 500,
                    data: {}
                }
            }
        },

        async getInfo(token)
        {
            try {
                const url = `auth/info`;

                const response = await AxiosClient.post(url,{},{
                    headers: {
                        Authorization: 'Bearer ' + token.accessToken
                    }
                });

                if (response.status === 200) {
                    return response.data;
                }
            } catch (e) {
                // console.log('-------------e@getInfo', e);
                return {
                    status: 500,
                    data: {}
                }
            }
        },

        async updateProfile(data, token) {
            try {
                const url = `user/update`;
                const response = await AxiosClient.put(url, data, {
                    headers: {
                        Authorization: 'Bearer ' + token.accessToken
                    }
                });
                if (response.status === 200) {
                    return response.data;
                }
            } catch (e) {
                console.log('--------------- E ', e);
                return {
                    status: 500,
                    data: {}
                }
            }
        }
    }

export default AuthService;
