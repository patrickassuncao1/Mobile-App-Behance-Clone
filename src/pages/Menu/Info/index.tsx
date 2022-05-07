import { Image, ScrollView, StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import theme from "../../../themes";
import { styles } from "../../../themes/style";
import { PropsInfoScreen } from "../../../types/types";
import { ReactNode } from "react";
import ButtonNext from "../../../components/ButtonNext";
import { useCart } from "../../../contexts/cart";
import { checkItemCart } from "../../../utils";

const windowHeight = Dimensions.get('window').height;

const FieldIcon = ({ text, children }: { text: string | number, children: ReactNode }) => {
    return (
        <View style={styleSecond.viewFlex}>
            {children}
            <Text style={{ marginHorizontal: 5 }}>{text}</Text>
        </View>
    )
}

const Info = ({ route }: PropsInfoScreen) => {
    const params = route.params;

    const { addCartItem, deleteCartItem, shoppingCart } = useCart();

    const qntdItem = checkItemCart(shoppingCart ? shoppingCart : [], params.key);

    return (
        <SafeAreaView style={[styles.TabContainer, { backgroundColor: theme.colors.white }]}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flex: 1 }}
                style={{ width: '100%' }}
            >
                <View style={styleSecond.view}>
                    <View style={[styleSecond.img, { marginBottom: 10 }]}>
                        <Image
                            source={params.img}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    <View style={styleSecond.containerBox}>
                        <View style={styleSecond.viewFlexSpace} >
                            <Text style={styleSecond.textPrice}>
                                R$ {params.price}
                            </Text>
                            <View style={[styleSecond.viewFlex, { width: 100 }]}>
                                <TouchableOpacity onPress={() => {
                                    if (addCartItem) addCartItem(params);
                                }}>
                                    <MaterialIcons
                                        name="add-box"
                                        size={30}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                                <Text style={styleSecond.textPrice}>
                                    {qntdItem}
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    if (deleteCartItem) deleteCartItem(params);
                                }}>
                                    <AntDesign
                                        name="minussquare"
                                        size={26}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styleSecond.viewFlexSpace}>
                            <Text style={styleSecond.textPrice}>{params.name}</Text>
                            <Text>{params.gram}</Text>
                        </View>
                        <View style={styleSecond.viewFlexSpace}>
                            <FieldIcon text="542 kkal">
                                <SimpleLineIcons
                                    name="fire"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </FieldIcon>
                            <FieldIcon text={'20 min'}>
                                <EvilIcons
                                    name={'clock'}
                                    size={25}
                                    color={theme.colors.primary}
                                />
                            </FieldIcon>
                            <FieldIcon text={params.stars}>
                                <AntDesign
                                    name="staro"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </FieldIcon>
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={styleSecond.marginTopView}>
                                <Text style={styleSecond.descriptionTitle}>Ingredientes:</Text>
                                <Text style={styleSecond.description}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </Text>
                            </View>
                            <View style={styleSecond.marginTopView}>
                                <Text style={styleSecond.descriptionTitle}>Descrição:</Text>
                                <Text style={styleSecond.description}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Quo maiores eveniet suscipit, delectus explicabo aliquam
                                    neque iusto beatae dicta voluptatum id dolore accusamus
                                    cum totam? Ipsum vitae quidem laudantium possimus?
                                </Text>
                            </View>
                            <View style={styleSecond.viewButton}>
                                <ButtonNext
                                    text="Adicionar no Carrinho"
                                    onPress={() => { if (addCartItem) addCartItem(params) }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styleSecond = StyleSheet.create({
    containerBox: {
        maxWidth: '90%',
    },
    img: {
        width: '68%',
        height: windowHeight - (windowHeight * 0.68)
    },
    view: {
        maxWidth: '100%',
        alignItems: 'center'
    },
    viewFlexSpace: {
        marginTop: 10,
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textPrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewFlex: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    marginTopView: {
        marginTop: 20
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '400'
    },
    description: {
        opacity: 0.7,
        marginTop: 5
    },
    viewButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});

export default Info;

