import { View, Text, SafeAreaView, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { useRef, useState } from "react";

import { styles } from "../../../themes/style";
import DotNavigation from "../../../components/DotNavigation";
import Card from "../../../components/Card";
import theme from "../../../themes";
import ButtonNext from "../../../components/ButtonNext";
import { useToast } from "../../../contexts/toast";
import { propsNavigationStack, PropsStack } from "../../../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<propsNavigationStack, 'RegisterSecond'>;

const RegisterScreenSecond = ({ route, navigation }: Props) => {


    const [inputsCode, setInputsCode] = useState({
        first: '',
        second: '',
        third: '',
        fourth: ''
    });

    const { showToast } = useToast();

    const refFirstCode = useRef<TextInput | null>(null);
    const refSecondCode = useRef<TextInput | null>(null);
    const refThirdCode = useRef<TextInput | null>(null);
    const refFourthCode = useRef<TextInput | null>(null);

    const handleOnChangeText = (
        newText: string,
        ref: TextInput | null,
        input: string,
    ) => {
        if (newText !== '' && newText !== "." && newText !== '-') {
            ref?.focus();
            setInputsCode(prevState => ({ ...prevState, [input]: newText }));
        } else if (newText === '') {
            setInputsCode(prevState => ({ ...prevState, [input]: newText }));
        }
    }

    const keyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        value: string,
        ref: TextInput | null) => {

        if (e.nativeEvent.key === 'Backspace' && value === '') ref?.focus();

    }

    const handleSubmit = () => {
        const names: ['first', 'second', 'third', 'fourth'] = ['first', 'second', 'third', 'fourth'];

        for (const name of names) {
            if (inputsCode[name] === "") {
                showToast ?
                    showToast("Por favor preencha todos os campos", theme.colors.primary)
                    : console.log('deu erro');
                return
            }

        }
        navigation.navigate('RegisterThird', route.params);
    }

    return (
        <SafeAreaView style={styles.container}>
            <DotNavigation />
            <Card>
                <Text style={[styles.title, { marginBottom: 5 }]}>
                    Confirme seu número
                </Text>
                <Text style={styles.subTitle}>
                    O código de verificação foi enviado para
                    (00) 0000-0000
                </Text>
                <View style={stylesSecond.fieldInputs}>
                    <TextInput
                        style={[stylesSecond.numberField, { marginLeft: 0 }]}
                        keyboardType='numeric'
                        maxLength={1}
                        autoCompleteType="off"
                        value={inputsCode.first}
                        ref={refFirstCode}
                        onChangeText={(e) => handleOnChangeText(e, refSecondCode.current, 'first')}
                    />

                    <TextInput
                        style={stylesSecond.numberField}
                        keyboardType='numeric'
                        maxLength={1}
                        autoCompleteType="off"
                        ref={refSecondCode}
                        onChangeText={(e) => handleOnChangeText(e, refThirdCode.current, 'second')}
                        value={inputsCode.second}
                        onKeyPress={(e) => keyPress(e, inputsCode.second, refFirstCode.current)}
                    />
                    <TextInput
                        style={stylesSecond.numberField}
                        keyboardType='numeric'
                        maxLength={1}
                        autoCompleteType="off"
                        ref={refThirdCode}
                        onChangeText={(e) => handleOnChangeText(e, refFourthCode.current, 'third')}
                        value={inputsCode.third}
                        onKeyPress={(e) => keyPress(e, inputsCode.third, refSecondCode.current)}
                    />
                    <TextInput
                        style={stylesSecond.numberField}
                        keyboardType='numeric'
                        maxLength={1}
                        autoCompleteType="off"
                        ref={refFourthCode}
                        onChangeText={value => setInputsCode({ ...inputsCode, fourth: value })}
                        value={inputsCode.fourth}
                        onKeyPress={(e) => keyPress(e, inputsCode.fourth, refThirdCode.current)}
                    />

                    <Text style={stylesSecond.text} >
                        Não recebeu o código? <Text style={stylesSecond.textRed}>reenviar</Text>
                    </Text>
                </View>
            </Card>

            <View style={stylesSecond.viewButton}>
                <ButtonNext onPress={handleSubmit} text='Próximo' />
            </View>

        </SafeAreaView >
    );
}

const stylesSecond = StyleSheet.create({
    numberField: {
        width: 45,
        height: 48,
        fontSize: 26,
        borderRadius: 10,
        textAlign: 'center',
        marginLeft: 15,
        backgroundColor: theme.colors.secondary,
    },
    fieldInputs: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center',
        flexWrap: "wrap",
    },
    text: {
        paddingTop: 25,
        fontSize: 13
    },
    textRed: {
        color: '#ff0000',
        fontWeight: 'bold'
    },
    viewButton: {
        marginTop: '12%',
        marginBottom: '18%',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default RegisterScreenSecond;