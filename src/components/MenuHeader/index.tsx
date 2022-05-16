import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from "react-native";
import theme from "../../themes";
import { zIndex } from "../../utils";
import { Ionicons } from '@expo/vector-icons';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useMenu } from "../../contexts/menu";
import { useEffect, useState } from "react";

type ItemMenuType = {
    text: string,
    iconName: "wallet-outline" | "call-outline" | "ios-settings-outline" |
    "newspaper-outline" | "chatbubble-ellipses-outline"
}

const windowWidth = Dimensions.get('window').width;

const ItemMenu = ({ text, iconName }: ItemMenuType) => {
    return (
        <TouchableOpacity style={styles.itemMenu}>
            <Ionicons name={iconName} size={25} color={theme.colors.white} />
            <Text style={styles.textItemMenu}>{text}</Text>
        </TouchableOpacity>
    )
}

const MenuHeader = () => {
    const { activeMenu, isActiveMenu } = useMenu();

    const [container] = useState(new Animated.ValueXY({
        x: windowWidth,
        y: 0
    }));

    useEffect(() => {
        isActiveMenu && showMenu();
    }, [isActiveMenu])

    const showMenu = () => {
        Animated.spring(container, {
            toValue: {
                x: 0,
                y: 0
            },
            useNativeDriver: false,
        }).start()
    }

    const hideMenu = () => {
        Animated.spring(container, {
            toValue: {
                x: windowWidth,
                y: 0
            },
            useNativeDriver: false,
        }).start()
    }
    const translate = {
        transform: [
            { translateX: container.x },
            { translateY: container.y }
        ]
    }


    return (
        <Animated.View style={[styles.view, translate]}>
            <Animated.View style={[styles.viewBackgroundOne]}>
                <View
                    style={styles.background}
                >
                    <TouchableOpacity
                        onPress={() => {
                            activeMenu && activeMenu();
                            hideMenu();
                            
                        }}
                        style={styles.iconView}
                    >
                        <Ionicons name="close" size={25} color={theme.colors.white} />
                    </TouchableOpacity>
                    <View style={styles.itemsView}>
                        <ItemMenu text="Carteira" iconName="wallet-outline" />
                        <ItemMenu text="Contatos" iconName="call-outline" />
                        <ItemMenu text="Configurações" iconName="ios-settings-outline" />
                        <ItemMenu text="Descontos" iconName="newspaper-outline" />
                        <ItemMenu text="Suporte" iconName="chatbubble-ellipses-outline" />
                    </View>
                </View>
            </Animated.View>
            <View style={styles.viewBackgroundTwo} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    view: {
        ...zIndex(20),
        position: 'absolute',
        top: 0,
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',

    },
    viewBackgroundOne: {
        flex: 1.2,
        width: '100%',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(255,255,255,0.8)',

    },
    background: {
        flex: 1,
        opacity: 1,
        backgroundColor: theme.colors.primary,
        width: '98%',
        borderTopEndRadius: 0,
        borderTopStartRadius: 100,
        borderBottomEndRadius: 150,
        borderBottomStartRadius: 300,
        borderColor: theme.colors.tertiary,
        borderStartWidth: 10,
        borderBottomWidth: 10,
        paddingHorizontal: 20,
        paddingTop: getStatusBarHeight()

    },
    viewBackgroundTwo: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    iconView: {
        alignItems: 'flex-end',
        width: '100%'
    },
    itemsView: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: '30%'
    },
    itemMenu: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 180,
        marginTop: 15

    },
    textItemMenu: {
        color: theme.colors.white,
        fontSize: 18,
        textAlign: 'right',
        marginLeft: 15
    }
})

export default MenuHeader;