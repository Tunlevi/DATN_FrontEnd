import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import CategoryServiceApi from "../../../api/CategoryServiceApi";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function IncCategoryHome({navigation})
{
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const getCategoriesHot = async() => {
        const response = await CategoryServiceApi.getListsCategories();
        setCategories(response.data.categories);
        setLoading(false);
    }

    useEffect(() => {
        getCategoriesHot().then(r => {});
    },[]);

    return (
        <>
            <View style={styles.boxSection}>
                <View style={styles.categoryHeader}>
                    <Text style={{
                        fontWeight: "bold"
                    }}>Danh mục</Text>
                    <TouchableOpacity>
                        <Text style={{ color: "orange"}}
                              onPress={() => navigation.navigate('ProductListScreen')}>
                            Xem tất cả
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.boxSection}>
                <View style={styles.categoryLists}>
                    { loading === true ? (
                        <>
                            <SkeletonPlaceholder style={[styles.categoryListsItem]}  borderRadius={4}  backgroundColor="#efedef">
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View  style={{width: 60, height: 60, borderRadius: 50}} />
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginLeft: 10}}></View>
                            <SkeletonPlaceholder style={styles.categoryListsItem}  borderRadius={4}  backgroundColor="#efedef">
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View  style={{width: 60, height: 60, borderRadius: 50}} />
                                </View>
                            </SkeletonPlaceholder>
                        </>
                    ) : (
                        <ScrollView horizontal={true}>
                            { categories.map((item, index) => (
                                <TouchableOpacity
                                    style={styles.categoryListsItem}
                                    key={item.id}
                                    onPress={() => navigation.navigate('ProductListScreen',{
                                        category: item
                                    })}
                                >
                                    <Image
                                        style={styles.categoryItemAvatar}
                                        source={{ uri: item.avatar}}
                                    />
                                    <Text style={styles.categoryItemTitle}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}

                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    boxSection: {
        flexDirection:"row",
        alignItems:"center",
        padding: 16
    },
    categoryHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 20,
        alignItems:"center"
    },
    categoryLists: {
        flex: 1,
        flexDirection: "row",
    },
    categoryListsItem: {
        width: 100,
        marginRight: 5,
        flex: 1,
        alignItems:"center",
        borderWidth: 1,
        borderColor: "#F7F7F7",
        padding: 5,
        borderRadius: 10
    },
    marginLeftLoading: {
        marginLeft: 10
    },
    categoryItemAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: "cover",
    },
    categoryItemTitle: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
});
