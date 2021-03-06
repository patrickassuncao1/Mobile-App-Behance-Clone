import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, Dimensions, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from '@expo/vector-icons';
import InputSearch from "../../components/InputSearch";
import { restaurants, listImages, typesService } from "../../constants";
import theme from "../../themes";
import generateBoxShadowStyle from "../../themes/BoxShandow";
import { styles } from "../../themes/style";
import Slide from "../../components/Slide";
import { propsNavigationStack } from "../../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


const windowWidth = Dimensions.get('window').width;

type Icons = {
    name: 'location' | 'clock' | 'star',
    text: string
}

type Props = NativeStackScreenProps<propsNavigationStack, 'Info'>;

const Icons = ({ name, text }: Icons) => {
    return (
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            <EvilIcons name={name} size={23} color={theme.colors.primary} />
            <Text style={{ fontSize: 12 }}>{text}</Text>
        </View>
    )
}



const Home = ({ navigation }: Props) => {

    const [inputSearch, setInputSearch] = useState('');
    const [numberRestaurant, setNumberRestaurant] = useState(1);

    return (
        <SafeAreaView style={styles.TabContainer}>
            <View style={{ marginTop: 5 }}></View>
            <InputSearch
                setInputSearch={setInputSearch}
                placeholder="Pesquisar"
                onChangeText={(text) => setInputSearch(text)}
                value={inputSearch}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: '100%' }}>

                <View style={{ width: '100%', alignItems: 'center' }}>

                    <View style={[stylesSecond.containerBox, { maxHeight: 75 }]}>
                        <FlatList
                            data={typesService}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            renderItem={({ item }) => (
                                <View
                                    key={item.key}
                                    style={[stylesSecond.boxServices, stylesSecond.shadowProp]}
                                >
                                    {item.icon}

                                    <Text style={{ fontSize: 11 }}>
                                        {item.name}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={[stylesSecond.containerBox, { maxHeight: 180 }]}>
                        <View style={stylesSecond.flexWrap}>
                            <Text>Restaurantes:</Text>
                            <Text>{numberRestaurant}/{restaurants.length}</Text>
                        </View>

                        <FlatList
                            data={restaurants}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment={'start'}
                            scrollEventThrottle={16}
                            decelerationRate={'fast'}
                            onMomentumScrollEnd={(event) => {
                                setNumberRestaurant(Math.round(event.nativeEvent.contentOffset.x /
                                    (windowWidth - (windowWidth * 0.3))) + 1)
                            }}
                            snapToOffsets={
                                [...Array(restaurants.length)].map(
                                    (x, i) => i * (windowWidth - (windowWidth * 0.3)) -
                                        (windowWidth * 0.8) + 10
                                )
                            }
                            keyExtractor={(item) => String(item.key)}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            contentContainerStyle={{
                                marginTop: 10
                            }}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={[stylesSecond.restaurantsList, stylesSecond.shadowProp]}
                                    key={item.key}
                                >
                                    <View style={{ width: '100%', height: 80 }}>
                                        <Image
                                            source={item.image}
                                            style={stylesSecond.restaurantsListImg}
                                        />
                                    </View>
                                    <Text style={{ margin: 5, marginLeft: 8, fontWeight: 'bold' }}>
                                        {item.name}
                                    </Text>
                                    <View style={stylesSecond.fildIcons}>
                                        <Icons name='location' text={item.distance} />
                                        <Icons name='clock' text={item.timer} />
                                        <Icons name='star' text={item.stars} />
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>

                    <Slide />
                    <View style={[stylesSecond.containerBox, { marginBottom: 10, flex: 1 }]}>
                        <View style={[stylesSecond.flexWrap, { width: '100%', marginBottom: 10 }]}>
                            <Text>Popular:</Text>
                            <Text style={{ color: theme.colors.primary }}>Ver tudo</Text>
                        </View>
                        <FlatList
                            data={listImages}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => String(item.key)}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate('Info', item)
                                    }}
                                    style={stylesSecond.list}
                                >
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <Image
                                            source={item.img}
                                            style={{
                                                width: '82%',
                                                height: 120,
                                                marginBottom: 10,
                                                borderRadius: 10,
                                                borderBottomLeftRadius: 0,
                                                borderBottomRightRadius: 0
                                            }}
                                        />
                                    </View>

                                    <Text style={stylesSecond.listPrice}>
                                        R$ {item.price}
                                    </Text>
                                    <Text style={{ marginHorizontal: 12, color: 'black' }}>
                                        {item.name}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const stylesSecond = StyleSheet.create({
    boxServices: {
        width: 75,
        height: 70,
        paddingTop: 5,
        borderRadius: 5,
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerBox: {
        marginTop: 10,
        maxWidth: '90%'
    },
    shadowProp: {},
    flexWrap: {
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    restaurantsList: {
        width: windowWidth - (windowWidth * 0.3),
        borderRadius: 10,
        backgroundColor: theme.colors.white,
        height: 140
    },
    restaurantsListImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    fildIcons: {
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 3,
        paddingRight: '8%',
        marginTop: 2
    },
    list: {
        paddingBottom: 15,
        paddingTop: 20,
        width: windowWidth - (windowWidth * 0.6),
        borderRadius: 10,
        backgroundColor: theme.colors.white
    },
    listPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 12,
    }

})

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717', stylesSecond);

export default Home;