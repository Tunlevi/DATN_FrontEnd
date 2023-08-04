import AxiosClient from "./ClientApi";
const CategoryServiceApi =
{
    async getListsCategories(params)
    {
        try {
            const newParams = { ...params }
            const url = `category`;
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
    }
}

export default CategoryServiceApi;
