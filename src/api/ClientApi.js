import axios from "axios";
import { getDataByKey } from "../utils/stograte";
const AxiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosClient.defaults.baseURL = 'https://api-food.topcode.fun/api/v1';

// let accessToken = getDataByKey('token');
// if (accessToken) {
//     console.log('---------- TOKEN HEADER: ', accessToken);
//     AxiosClient.defaults.headers.common['Authorization'] =  'Bearer ' + accessToken.accessToken;
// }

export default AxiosClient;
