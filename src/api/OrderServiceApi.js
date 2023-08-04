import AxiosClient from "./ClientApi";
const OrderServiceApi =
    {
        async add(data, token = null)
        {
            try {
                const url = `order/add`;
                const response = await AxiosClient.post(url,data,{
                    headers: {
                        Authorization: token ? 'Bearer ' + token.accessToken : ''
                    }
                })

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

        async getListsOrder(filters) {
            try {
                const url = `order`;
                console.log('------ filters: ',filters);
                const response = await AxiosClient.get(url,{
                    params: filters
                })

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
        async getStatic(productId) {
            try {
                const url = `vote/static/${productId}`;
                const response = await AxiosClient.get(url)

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
        async getListsVote(productId) {
            try {
                const url = `vote?product_id=${productId}`;
                const response = await AxiosClient.get(url)

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

        async cancelOrder(data) {
            try {
                const url = `order/update-cancel-paid`;
                const response = await AxiosClient.put(url,data)

                if (response.status === 200) {
                    return response.data;
                }
            } catch (e) {
                return {
                    status: 500,
                    data: {}
                }
            }
        },

        async findOneOrder(orderID)
        {
            try {
                const url = `order/show/${orderID}`;
                const response = await AxiosClient.get(url)

                if (response.status === 200) {
                    return response.data;
                }
            } catch (e) {
                return {
                    status: 500,
                    data: {}
                }
            }
        },
        async storeVote(data, token = null)
        {
            try {
                const url = `vote`;
                const response = await AxiosClient.post(url,data,{
                    headers: {
                        Authorization: token ? 'Bearer ' + token.accessToken : ''
                    }
                })

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
    }

export default OrderServiceApi;
