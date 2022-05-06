import { Image, ScrollView, StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import theme from "../../../themes";
import { styles } from "../../../themes/style";
import { PropsInfoScreen } from "../../../types/types";


const windowHeight = Dimensions.get('window').height;


const Info = ({ route }: PropsInfoScreen) => {
    const params = route.params;
   
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
                                    /* if (addCartItem) addCartItem(item); */
                                }}>
                                    <MaterialIcons
                                        name="add-box"
                                        size={30}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                                <Text style={styleSecond.textPrice}>
                                    {params.qnt ? params.qnt : 0}
                                </Text>
                                <TouchableOpacity /* onPress={() => {
                                    if (deleteCartItem) deleteCartItem(item);
                                }} */>
                                    <AntDesign
                                        name="minussquare"
                                        size={26}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styleSecond.viewFlexSpace}>
                            <Text style={styleSecond.textPrice}>
                                {params.name}
                            </Text>
                            <Text style={[styles.text, { color: theme.colors.subText }]}>
                                {params.name}
                            </Text>
                        </View>
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
        alignContent: 'center'
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
    }
});

export default Info;

