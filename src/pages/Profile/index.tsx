import { ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons, Foundation, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import theme from "../../themes";
import { styles } from "../../themes/style";
import generateBoxShadowStyle from "../../themes/BoxShandow";


const Cart = ({ children, text }: { children: ReactNode, text: string }) => {
    return (
        <View style={[stylesSecond.cart, stylesSecond.shadowProp]}>
            {children}
            <Text style={stylesSecond.cartText}>{text}</Text>
        </View>
    )
}

const Profile = () => {
    return (
        <SafeAreaView style={styles.TabContainer}>
            <View style={stylesSecond.circleImg}>
                <Image
                    source={require('../../../assets/images/avatar.png')}
                    style={stylesSecond.img}
                />
            </View>
            <Text style={[styles.title, stylesSecond.title]}>UserName</Text>
            <Text style={stylesSecond.number}>+55 (00) 00000-0000</Text>

            <View style={stylesSecond.viewCards}>
                <Cart text="Saldo">
                    <MaterialIcons name="attach-money" size={70} color={theme.colors.primary} />
                </Cart>
                <View style={{ width: 15 }}></View>
                <Cart text="Bônus">
                    <Foundation name="burst-sale" size={70} color={theme.colors.primary} />
                </Cart>

            </View>
            <View style={stylesSecond.viewCards}>
                <Cart text="Contatos">
                    <AntDesign name="contacts" size={70} color={theme.colors.primary} />
                </Cart>
                <View style={{ width: 15 }}></View>
                <Cart text="Pedidos">
                    <MaterialCommunityIcons name="menu-open" size={70} color={theme.colors.primary} />
                </Cart>
            </View>

            <View style={{ marginBottom: 10 }}></View>
        </SafeAreaView>
    )
}

const stylesSecond = StyleSheet.create({
    circleImg: {
        width: '60%',
        backgroundColor: theme.colors.white,
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999
    },
    img: {
        width: '95%',
        height: '95%'
    },
    title: {
        marginTop: 20,
        marginBottom: 5,
        fontWeight: '500'
    },
    number: {
        fontSize: 15
    },
    cart: {
        paddingVertical: '8%',
        width: '42%',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    shadowProp: {},
    cartText: {
        fontSize: 15,
        fontWeight: '400',
        marginTop: 5

    },
    viewCards: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    }

})

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717', stylesSecond);

export default Profile;