import { ReactNode } from "react";
import { Image, StyleSheet, View, Dimensions, ImageSourcePropType, Pressable, GestureResponderEvent } from "react-native";
import theme from "../../themes";
import generateBoxShadowStyle from "../../themes/BoxShandow";


const windowWidth = Dimensions.get('window').width;

type CardMenuType = {
    source: ImageSourcePropType,
    children: ReactNode,
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined
}

const CardMenu = ({ source, children, onPress }: CardMenuType) => {
    return (
        <View style={[styles.itemMenu, styles.shadowProp]}>
            <Pressable style={styles.itemImage} onPress={onPress}>
                <Image
                    source={source}
                    style={{ width: '100%', height: '95%' }}
                />
            </Pressable>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    shadowProp: {},
    itemMenu: {
        paddingTop: 5,
        paddingBottom: 5,
        width: windowWidth - (windowWidth * 0.1),
        borderRadius: 10,
        backgroundColor: theme.colors.white,
        flexWrap: 'wrap',
        flexDirection: "row",
        alignItems: 'center',
    },
    itemImage: {
        justifyContent: 'center',
        height: 128,
        width: '35%',
        marginHorizontal: 20
    }
})

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717', styles);

export default CardMenu;