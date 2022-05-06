import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';

import CardMenu from "../../components/CardMenu";
import InputSearch from "../../components/InputSearch";
import Stars from "../../components/Stars";
import { listAllMenu, menuList } from "../../constants";
import theme from "../../themes";
import generateBoxShadowStyle from "../../themes/BoxShandow";
import { styles } from "../../themes/style";
import { filterMenu } from "../../utils";
import { useCart } from "../../contexts/cart";
import { PropsInfoScreen } from "../../types/types";

const Menu = ({ navigation }: PropsInfoScreen) => {

    const { addCartItem } = useCart();
    const [inputSearch, setInputSeach] = useState('');
    const [activeMenu, setActiveMenu] = useState({
        dataType: listAllMenu,
        menuKey: 1
    });


    const hanleOnPressActiveMenu = (key: number, type: string) => {
        const menu = filterMenu(type);
        setActiveMenu({ ...activeMenu, menuKey: key, dataType: menu });
    }


    return (
        <SafeAreaView style={styles.TabContainer}>
            <View style={[stylesSecond.containerBox, { maxHeight: 40, marginBottom: 10 }]}>
                <FlatList
                    data={menuList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item.key}
                            style={[
                                stylesSecond.menu,
                                stylesSecond.shadowProp,
                                {
                                    backgroundColor: item.key === activeMenu.menuKey
                                        ? theme.colors.primary : theme.colors.white
                                }
                            ]}
                            onPress={() => hanleOnPressActiveMenu(item.key, item.name)}

                        >
                            <Text style={{
                                color: item.key === activeMenu.menuKey
                                    ? theme.colors.white : "black"
                            }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <InputSearch
                setInputSearch={setInputSeach}
                placeholder="Pesquisar"
                onChangeText={(text) => setInputSeach(text)}
                value={inputSearch}
            />
            <View style={[stylesSecond.containerBox]}>
                <FlatList
                    data={activeMenu.dataType}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    keyExtractor={(item) => String(item.key)}
                    ListFooterComponent={() => <View style={{ marginBottom: 120 }} />}
                    renderItem={({ item }) => (
                        <CardMenu
                            source={item.img}
                            onPress={() => navigation.navigate('Info', item)}
                        >
                            <View style={{
                                marginHorizontal: 10,
                                width: '45%'
                            }}
                            >
                                <Text style={stylesSecond.textCard}>{item.name}</Text>
                                <Stars numberStars={item.stars} />
                                <Text style={{ marginTop: 2 }}>{item.gram}</Text>
                                <View style={stylesSecond.viewPrice}>
                                    <Text style={stylesSecond.textPrice}>R$ {item.price}</Text>
                                    <TouchableOpacity onPress={() => {
                                        if (addCartItem) addCartItem(item);
                                    }}>
                                        <MaterialIcons
                                            name="add-box"
                                            size={30}
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
        marginTop: 10,
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
    },
    viewPrice: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    }
})

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717', stylesSecond);

export default Menu;