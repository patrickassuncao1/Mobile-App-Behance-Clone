import { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native"
import { slideImages } from "../../constants";
import theme from "../../themes"

const windowWidth = Dimensions.get('window').width;


const Slide = () => {
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <View style={styles.slidesView}>
            <FlatList
                data={slideImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    setActiveIndex(Math.round(event.nativeEvent.contentOffset.x /
                        (windowWidth - (windowWidth * 0.1))))
                }}
                scrollEventThrottle={16}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View key={item.id} style={{ width: windowWidth - (windowWidth * 0.1) }} >
                        <Image
                            source={item.img}
                            style={styles.slidesImg}
                        />
                    </View>
                )}
            />
            {
                slideImages.length > 0 && (
                    <View style={styles.dotContainer}>
                        {
                            slideImages.map((_, i) => (
                                <View
                                    style={[
                                        styles.dot,
                                        {
                                            backgroundColor: i === activeIndex
                                                ? theme.colors.primary : 'gray'
                                        }
                                    ]}
                                    key={i}
                                />
                            ))
                        }
                    </View>

                )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    
    slidesImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 6,
        marginHorizontal: 4
    },
    dotContainer: {
        position: 'absolute',
        bottom: '5%',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: 'center'
    },
    slidesView: {
        maxWidth: '90%',
        height: 200,
        marginTop: 10,
        position: 'relative'
    }
})

export default Slide;