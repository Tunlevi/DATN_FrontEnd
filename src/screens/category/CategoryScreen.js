import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CategoryServiceApi from "../../api/CategoryServiceApi";
import IncLoadingCategoryItem from "../../components/loading/_inc_category_item_loading";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default function CategoryScreen({navigation}) {
    const Safe = useSafeAreaInsets();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const getCategoriesHot = async() => {
        const response = await CategoryServiceApi.getListsCategories();
        setCategories(response.data.categories);
        setLoading(false);
    }

    useEffect(() => {
        getCategoriesHot().then(r => {});
    },[]);

    const products = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
        {
            id: 6,
        },

    ]
    return (
        <View style={{flex:1, backgroundColor: "#ffffff", marginTop: Safe.top}}>
            <View style={styles.lists}>
                { loading === true ? (
                    // <View>
                    //     <IncLoadingCategoryItem/>
                    // </View>
                    <View><Text>Loading</Text></View>
                ) : (
                    <>
                        { categories.map((item, index) => (
                            <View style={styles.item} key={item.id}>
                                <TouchableOpacity
                                    style={{ justifyContent: "center", flex: 1, alignItems: 'center'}}
                                    onPress={() => navigation.navigate('ProductListScreen',{
                                        category: item
                                    })}
                                >
                                    <Image
                                        style={styles.imageThumb}
                                        source={{ uri: item.avatar}}
                                    />
                                    <Text style={styles.titleCategory}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                )}
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
    item: {
        width: imageWidth / 3 - 25,
        height: 100,
        marginRight: 5,
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 10

    },
    imageThumb: {
        width: 50,
        height: 50,
        borderRadius:50,
        borderWidth: 1,
        borderColor: "#f3f3f3"
    },
    titleCategory: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
        textTransform: "capitalize"
    }
})
