import { StyleSheet, View } from "react-native"
import theme from "../../themes";
import generateBoxShadowStyle from "../../themes/BoxShandow";

interface Card {
    children: any
}
const Card = (props : Card) => {
    return (
        <View
            style={[styles.card, styles.shadowProp]}
        >
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        width: '90%',
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    shadowProp: {}
});

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717',styles);

export default Card;


