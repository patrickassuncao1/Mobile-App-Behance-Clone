import { ReactNode } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons, Foundation, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import theme from "../../themes";
import { styles } from "../../themes/style";
import generateBoxShadowStyle from "../../themes/BoxShandow";
import { useNavigation } from "@react-navigation/native";
import { PropsStack } from "../../types/types";

type CartType = {
    children: ReactNode,
    text: string,
    onPress?: () => void
}

const Cart = ({ children, text, onPress }: CartType) => {
    return (
        <TouchableOpacity
            style={[stylesSecond.cart, stylesSecond.shadowProp]}
            onPress={onPress}
        >
            {children}
            <Text style={stylesSecond.cartText}>{text}</Text>
        </TouchableOpacity>
    )
}

const Profile = () => {

    const navigation = useNavigation<PropsStack>();

    const logout = () => {
        navigation.navigate('RegisterFirst');
    }

    return (
        <SafeAreaView style={styles.TabContainer}>
            <View style={stylesSecond.circleImg}>
                <Image
                    source={require('../../../assets/images/avatar.png')}
                    style={stylesSecond.img}
                />
            </View>
            <Text style={[styles.title, stylesSecond.title]}>Patrick</Text>
            <Text style={stylesSecond.number}>+55 (00) 00000-0000</Text>
            <View style={{ marginBottom: 10 }}></View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{width: '90%'}}
            >
                <View style={stylesSecond.viewCards}>
                    <Cart text="Saldo">
                        <MaterialIcons name="attach-money" size={70} color={theme.colors.primary} />
                    </Cart>
                    <Cart text="Bônus">
                        <Foundation name="burst-sale" size={70} color={theme.colors.primary} />
                    </Cart>

                </View>
                <View style={stylesSecond.viewCards}>
                    <Cart text="Pedidos">
                        <MaterialCommunityIcons name="menu-open" size={70} color={theme.colors.primary} />
                    </Cart>
                    <Cart text="Sair" onPress={logout}>
                        <AntDesign name="logout" size={70} color={theme.colors.primary} />
                    </Cart>
                </View>
                <View style={{ marginBottom: 10 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

const stylesSecond = StyleSheet.create({
    circleImg: {
        width: 250,
        backgroundColor: theme.colors.white,
        height: 250,
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
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    }

})

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717', stylesSecond);

export default Profile;