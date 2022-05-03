import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import theme from "../../themes";
import { useCart } from "../../contexts/cart";

const Cart = () => {
    const { totalValue } = useCart();

    return (
        <TouchableOpacity style={[
            styles.iconBox,
            { marginRight: 10, position: 'relative' }
        ]}
        >
            <SimpleLineIcons name="bag" size={20} color={theme.colors.white} />
            {totalValue !== 0 && totalValue && (
                <View style={styles.cartNumberView}>
                    <Text style={styles.cartNumberText} >{totalValue}</Text>
                </View>
            )}

        </TouchableOpacity>
    )
}

const HeaderTabs = ({ ...props }) => {

    return (
        <View {...props}  >
            <View style={styles.header}>
                <View style={styles.container}>
                    {props.icon && (<EvilIcons name="location" size={28} color="black" />)}
                    <Text style={props.icon ? styles.iconText : styles.iconHeaderText}>
                        {props.title}
                    </Text>
                    {props.title === 'Carrinho' && (
                        <SimpleLineIcons
                            name="bag"
                            size={20}
                            style={{ marginLeft: 10 }}
                            color='black'
                        />
                    )}
                </View>

                <View style={[styles.container, { height: '100%', alignContent: 'center' }]}>
                    {props.title !== "Carrinho" && (<Cart />)}
                    <TouchableOpacity style={styles.iconBox}>
                        <Feather name="menu" size={23} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center'
    },
    iconText: {
        fontSize: 14,
        paddingLeft: 5
    },
    iconHeaderText: {
        fontSize: 20,
        paddingLeft: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    iconBox: {
        width: 40,
        height: '70%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
    },
    cartNumberView: {
        position: 'absolute',
        top: '15%',
        right: '7%',
        backgroundColor: theme.colors.cart,
        height: '40%',
        width: 18,
        borderRadius: 99,
        justifyContent: 'center'
    },
    cartNumberText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 11,
        textAlign:'center'
    }
})

export default HeaderTabs;