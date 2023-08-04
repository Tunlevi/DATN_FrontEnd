import AxiosClient from "./ClientApi";
const ProductServiceApi =
{
    async getListsProducts(filter)
    {
        try {
            const url = `product`;
            const params = {...filter}
            console.log('----------- params: ',params);
            const response = await AxiosClient.get(url,{
                params: params
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
    }
}

export default ProductServiceApi;
