import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Carousel } from "react-native-basic-carousel";

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 24);
const imageWidth = dimensions.width;

export default function IncSlideHome()
{
    const slides = [
        {
            image: 'https://healthyeating.shop/wp-content/uploads/2023/02/goi-an-giam-can-eat-clean-e1678456532767.jpg'
        },
        {
            image: 'https://healthyeating.shop/wp-content/uploads/2021/01/che-do-an-giam-can-3-2048x865.jpg'
        }
    ]

    return (
        <View style={{ flex: 1}}>
            <Carousel
                data={slides}
                renderItem={({item, index}) => <View>
                    <Image style={styles.imageSlide} source={{ uri: item.image}} />
                </View>}
                onSnapItem={(item) => console.log(item)}
                pagination
                autoplay
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageSlide: {
        width: imageWidth,
        height: imageHeight,
        resizeMode: 'cover',
        flex: 1,
    },
})
