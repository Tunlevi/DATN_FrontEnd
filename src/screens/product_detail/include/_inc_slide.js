import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Carousel } from "react-native-basic-carousel";

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 24);
const imageWidth = dimensions.width;

export default function IncSlideProductDetail(props)
{
    const product = props?.product;

    const slides = [
        {
            image: product?.avatar
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
                pagination={false}
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
