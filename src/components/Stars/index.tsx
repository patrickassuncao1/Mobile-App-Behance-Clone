import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import theme from "../../themes";

type StarsType = {
    numberStars: number,
}

const Star = ({ color, margin }: { color: '#e0e0e0' | '#facf7e', margin?: boolean }) => {
    return (
        <AntDesign
            name="star"
            size={15}
            style={[styles.star, { marginLeft: margin ? 0 : undefined }]}
            color={color}
        />
    )
}
const Stars = ({ numberStars }: StarsType) => {
    const number = Number(numberStars).toFixed(1);
    const valueBr = number.replace('.', ',');

    return (
        <View style={styles.view}>
            <Star color={numberStars >= 1 ? '#facf7e' : '#e0e0e0'} margin={true} />
            <Star color={numberStars > 1 ? '#facf7e' : '#e0e0e0'} />
            <Star color={numberStars > 2 ? '#facf7e' : '#e0e0e0'} />
            <Star color={numberStars > 3 ? '#facf7e' : '#e0e0e0'} />
            <Star color={numberStars > 4 ? '#facf7e' : '#e0e0e0'} />
            <Text style={styles.text}>{valueBr}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 2,
        alignItems: 'center'
    },
    star: {
        marginHorizontal: 2
    },
    text:{
        marginLeft: 2,
        fontSize: 13,
        color: theme.colors.subText
    }
})

export default Stars;