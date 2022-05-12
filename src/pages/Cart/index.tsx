import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCart } from "../../contexts/cart";
import { styles } from "../../themes/style";
import theme from "../../themes";
import generateBoxShadowStyle from "../../themes/BoxShandow";
import { formatCurrency } from "../../utils";
import ButtonNext from "../../components/ButtonNext";
import ItemCart from "../../components/ItemCart";

const windowWidth = Dimensions.get('window').width;

const TextInfo = ({ text, money }: { text?: string, money?: string }) => {
    return (
        <View style={stylesSecond.textInfo}>
            <Text style={stylesSecond.text}>{text}</Text>
            <Text style={stylesSecond.text}>{money}</Text>
        </View>
    )
}

const EmptyCart = () => {
    return (
        <View>
            <Text style={{ fontWeight: 'bold' }}>
                Sem Itens no carrinho
            </Text>
        </View>
    )
}

const Cart = () => {

    const { shoppingCart, addCartItem, deleteCartItem, removeCartItem } = useCart();

    const amount = formatCurrency(shoppingCart ? shoppingCart : []);

    return (
        <SafeAreaView style={styles.TabContainer}>
            <View style={[stylesSecond.containerBox, { flex: 1, maxHeight: '70%' }]}>
                <FlatList
                    data={shoppingCart}
                    showsVerticalScrollIndicator={false}
                  /*   ItemSeparatorComponent={() => <View style={{ height: 10 }} />} */
                    keyExtractor={(item) => String(item.key)}
                    refreshing={true}
                    ListEmptyComponent={() => <EmptyCart />}
                    ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
                    renderItem={({ item, index }) => (
                        <View key={index}>
                            <ItemCart
                                addCartItem={addCartItem}
                                removeCartItem={removeCartItem}
                                deleteCartItem={deleteCartItem}
                                item={item}
                            />
                        </View>

                    )}
                />
            </View>
            {shoppingCart && shoppingCart.length > 0 && (
                <View style={{ alignItems: 'center', marginTop: '5%' }}>
                    <TextInfo text="Delivery:" money="R$ 0,00" />
                    <View
                        style={{
                            borderBottomColor: theme.colors.subText,
                            opacity: 0.5,
                            borderBottomWidth: 1,
                            width: windowWidth - (windowWidth * 0.2),
                            marginTop: 5
                        }}
                    />
                    <TextInfo text="Total:" money={`R$ ${amount}`} />
                    <View style={{ width: windowWidth, alignItems: 'center', marginTop: 10 }}>
                        <ButtonNext
                            text="Confirmar"
                            onPress={() => console.log('Pagamento realizado')}
                        />
                    </View>

                </View>
            )}

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
    },
    textInfo: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        width: windowWidth - (windowWidth * 0.3)
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },


})

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717', stylesSecond);

export default Cart;