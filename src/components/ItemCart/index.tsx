import { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, PanResponder, Dimensions, Animated, Easing } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import CardMenu from "../CardMenu";
import theme from "../../themes";
import { StateCart } from "../../types/types";
import { zIndex } from "../../utils";

type TypeItemCart = {
    addCartItem?: (data: StateCart | undefined) => void,
    deleteCartItem?: (data: StateCart | undefined) => void,
    removeCartItem?: (data: StateCart | undefined) => void,
    item: StateCart
}
const windowWidth = Dimensions.get('window').width;


const ItemCart = ({ addCartItem, deleteCartItem, removeCartItem, item }: TypeItemCart) => {

    const [translateX] = useState(new Animated.Value(0));
    const [maxHeightContent] = useState(new Animated.Value(200));
    const [marginTopContent] = useState(new Animated.Value(10));
    const [opacityContainerIcon] = useState(new Animated.Value(1));

    const [deleteOn, setDeleteOn] = useState('black');

    const swipeLeft = () => {
        Animated.sequence([
            Animated.timing(translateX, {
                toValue: -(windowWidth),
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(marginTopContent, {
                toValue: 0,
                duration: 80,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(maxHeightContent, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(opacityContainerIcon, {
                toValue: 0,
                duration: 80,
                useNativeDriver: false,
            }),
        ]).start(() => {
            removeCartItem && removeCartItem(item)
        })
    }

    const resetPosition = () => {
        Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                gesture.dx < 0 && translateX.setValue(gesture.dx);
                gesture.dx < -(windowWidth * 0.25) ? setDeleteOn('red')
                    : setDeleteOn('black');
            },
            onPanResponderRelease: (event, gesture) => {
                gesture.dx < -(windowWidth * 0.25) ? swipeLeft()
                    : resetPosition();
            },

        })
    ).current

    const styleCard = {
        transform: [
            { translateX: translateX }
        ]
    }

    const styleContent = {
        marginTop: marginTopContent,
        maxHeight: maxHeightContent
    }


    const IconDelete = () => {

        return (
            <View style={styles.iconDelete}>
                <Animated.View style={[styles.viewIconDelee, { opacity: opacityContainerIcon }]}>
                    <AntDesign name="delete" size={30} color={deleteOn} />
                </Animated.View>
            </View>

        )
    }

    return (
        <Animated.View
            style={styleContent}
        >
            <IconDelete />
            <Animated.View style={[styleCard]}  {...panResponder.panHandlers}>
                <CardMenu source={item.img} >
                    <View style={styles.view}>
                        <View style={styles.description}>
                            <View >
                                <Text style={styles.textCard}>{item.name}</Text>
                                <Text style={{ marginTop: 2 }}>{item.gram}</Text>
                            </View>

                            <Text style={styles.textPrice}>R$ {item.price}</Text>
                        </View>

                        <View style={styles.viewIcons}>
                            <TouchableOpacity onPress={() => {
                                addCartItem && addCartItem(item);
                            }}>
                                <MaterialIcons
                                    name="add-box"
                                    size={30}
                                    color={theme.colors.primary}
                                />
                            </TouchableOpacity>
                            <Text style={styles.textNumber}>
                                {item.qnt}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                deleteCartItem && deleteCartItem(item);
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
            </Animated.View>
        </Animated.View>

    )
}

const styles = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '90%',
        width: windowWidth * 0.20
    },
    iconDelete: {
        ...zIndex(-10),
        height: '100%',
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',

    }

})

export default ItemCart;