import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import CardMenu from "../../components/CardMenu";
import { useCart } from "../../contexts/cart";
import { styles } from "../../themes/style";
import theme from "../../themes";
import generateBoxShadowStyle from "../../themes/BoxShandow";
import { formatCurrency } from "../../utils";
import ButtonNext from "../../components/ButtonNext";


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
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    keyExtractor={(_, index) => String(index)}
                    ListEmptyComponent={() => <EmptyCart />}
                    ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
                    renderItem={({ item }) => (
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment={'start'}
                            scrollEventThrottle={16}
                            decelerationRate={'fast'}
                            snapToOffsets={[windowWidth - (windowWidth * 0.5)]}
                        >
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
                                        <Text style={stylesSecond.textNumber}>
                                            {item.qnt}
                                        </Text>
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
                            <View style={{ width: 10 }} />
                            <View style={[
                                stylesSecond.viewIconDelee,
                                stylesSecond.shadowProp
                            ]}>
                                <TouchableOpacity onPress={() => {
                                    if (removeCartItem) removeCartItem(item);
                                }}>
                                    <AntDesign name="delete" size={30} color="black" />
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
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
    viewIconDelee: {
        backgroundColor: theme.colors.white,
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
        width: windowWidth - (windowWidth * 0.8),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
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