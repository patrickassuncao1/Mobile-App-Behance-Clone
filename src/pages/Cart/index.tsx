import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import CardMenu from "../../components/CardMenu";
import { useCart } from "../../contexts/cart";
import { styles } from "../../themes/style";
import theme from "../../themes";

const EmptyCart = () => {
    return(
        <View>
            <Text style={{fontWeight:'bold'}}>
                Sem Itens no carrinho
            </Text>
        </View>
    )
}

const Cart = () => {

    const { shoppingCart, addCartItem, deleteCartItem } = useCart();

    return (
        <SafeAreaView style={styles.TabContainer}>
            <View style={[stylesSecond.containerBox, { flex: 1 }]}>
                <FlatList
                    data={shoppingCart}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    keyExtractor={(_, index) => String(index)}
                    ListEmptyComponent={() => <EmptyCart />}
                    ListFooterComponent={() => <View style={{ marginBottom: 120 }} />}
                    renderItem={({ item, index }) => (
                        <CardMenu source={item.img} >
                            <View style={stylesSecond.view}>
                                <View style={stylesSecond.description}>
                                    <View >
                                        <Text style={stylesSecond.textCard}>{item.name}</Text>
                                        <Text style={{ marginTop: 2 }}>{item.gram}</Text>
                                    </View>

                                    <Text style={stylesSecond.textPrice}>R$ {item.price}</Text>
                                </View>

                                <View style={stylesSecond.viewIcons}>
                                    <TouchableOpacity onPress={() => {
                                        if (addCartItem) addCartItem(item);
                                    }}>
                                        <MaterialIcons
                                            name="add-box"
                                            size={30}
                                            color={theme.colors.primary}
                                        />
                                    </TouchableOpacity>
                                    <Text style={stylesSecond.textNumber}>{item.qnt}</Text>
                                    <TouchableOpacity onPress={() => {
                                        if (deleteCartItem) deleteCartItem(item);
                                    }}>
                                        <AntDesign
                                            name="minussquare"
                                            size={26}
                                            color={theme.colors.primary}
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </CardMenu>
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

const stylesSecond = StyleSheet.create({
    containerBox: {
        maxWidth: '90%'
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 35,
        borderRadius: 10
    },
    shadowProp: {},
    textCard: {
        fontWeight: 'bold'
    },
    textPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,

    },
    viewIcons: {
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    textNumber: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        maxWidth: '80%',
        alignContent: 'center',
        justifyContent: 'space-around',

    },
    view: {
        height: '80%',
        marginHorizontal: 10,
        width: '45%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

})


export default Cart;