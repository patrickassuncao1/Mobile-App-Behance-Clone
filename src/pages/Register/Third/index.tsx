import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Entypo } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import DotNavigation from "../../../components/DotNavigation";
import Card from "../../../components/Card";
import { styles } from "../../../themes/style";

import InputIcon from "../../../components/InputIcon";
import theme from "../../../themes";
import ButtonNext from "../../../components/ButtonNext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputRef, propsNavigationStack } from "../../../types/types";
import { useToast } from "../../../contexts/toast";

type textValidationPassword = {
    text: string,
    validate: boolean
}

type Props = NativeStackScreenProps<propsNavigationStack, 'RegisterThird'>;

const TextValidationPassword = ({ text, validate }: textValidationPassword) => {

    return (
        (validate ? (
            <Text style={stylesThird.textCheck} >
                <Entypo
                    name="check"
                    size={12}
                    color="#52ec71"
                /> {text}
            </Text >
        ) : (
            <Text style={[stylesThird.textCheck, stylesThird.textX]}>
                <Feather
                    name="x"
                    size={12}
                    color={theme.colors.primary}
                /> {text}
            </Text>
        ))

    )
}

const RegisterScreenThird = ({ route, navigation }: Props) => {

    const [validatePassword, setValidatePassword] = useState({
        password: '',
        uppercase: false,
        length: false,
        specialCharacters: false,
        confPassword: ""
    })

    const [checkboxState, setCheckboxState] = useState(false);

    const { showToast } = useToast();

    const passwordRef = useRef<InputRef | null>(null);
    const confPasswordRef = useRef<InputRef | null>(null);

    useEffect(() => passwordRef.current?.resetError(), [validatePassword.password]);
    useEffect(() => confPasswordRef.current?.resetError(), [validatePassword.confPassword]);

    const handleOnChangeText = (text: string) => {

        //VALIDAÇÃO DA SENHA 
        const regexUppercase = RegExp(/^(?=.*[A-Z]).+$/);
        const specialCharacters = RegExp(/^(?=.*[@#$%.&*]).+$/);
        const length = text.length >= 8;

        setValidatePassword({
            password: text,
            uppercase: regexUppercase.test(text),
            length: length,
            specialCharacters: specialCharacters.test(text),
            confPassword: validatePassword.confPassword
        })
    }

    const handleSubmit = () => {
        const validationPass: ['uppercase', 'length', 'specialCharacters'] = ['uppercase', 'length', 'specialCharacters'];

        for (const type of validationPass) {
            if (!validatePassword[type]) {
                passwordRef.current?.focusOnError();
                return
            }
        }

        if (validatePassword.confPassword !== validatePassword.password) {
            showToast ? showToast('As senhas estão diferentes', theme.colors.primary)
                : console.log('deu erro');
            confPasswordRef.current?.focusOnError();
            return
        }

        if (!checkboxState) {
            showToast ? showToast('Por favor aceite o contrato de licença', theme.colors.primary)
                : console.log('deu erro');
            return
        }

        navigation.navigate('Tabs');
    }


    return (
        <SafeAreaView style={styles.container}>
            <DotNavigation />
            <Card>
                <Text style={styles.title}>
                    Cria senha
                </Text>

                <InputIcon
                    placeholder="Senha"
                    onChangeText={handleOnChangeText}
                    value={validatePassword.password}
                    ref={passwordRef}
                />

                <View style={{ marginBottom: 20 }}>
                    <TextValidationPassword
                        text='A senha deve conter pelo menos 8 caracteres'
                        validate={validatePassword.length}

                    />
                    <TextValidationPassword
                        text='A senha deve conter uma letra maiúscula'
                        validate={validatePassword.uppercase}
                    />
                    <TextValidationPassword
                        text='A senha deve conter (@#$%.&*)'
                        validate={validatePassword.specialCharacters}
                    />
                </View>

                <InputIcon
                    placeholder="Confimar Senha"
                    value={validatePassword.confPassword}
                    onChangeText={(text) => setValidatePassword({ ...validatePassword, confPassword: text })}
                    ref={confPasswordRef}
                />

                <View style={stylesThird.viewBox}>
                    <BouncyCheckbox
                        onPress={(isChecked: boolean) => setCheckboxState(isChecked)}
                        style={stylesThird.checkBox}
                        isChecked={checkboxState}
                        iconStyle={{ borderRadius: 0 }}
                        fillColor='rgba(0,0,0,0.8)'
                    />
                    <Text style={stylesThird.textCheckBox}>
                        Eu concordo com
                        o contrato
                        de licença do
                        seguinte pedido.
                        <Text style={{ fontWeight: 'bold' }}>Leia Mais</Text>
                    </Text>
                </View>

                <ButtonNext onPress={handleSubmit} text={'Criar Senha'} />

            </Card>

            <View style={{ marginTop: '30%' }} />
        </SafeAreaView>
    )
}

const stylesThird = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: '33%',
        right: '15%',
        zIndex: 10

    },
    textCheck: {
        color: '#52ec71',
        fontSize: 12,
        marginTop: 3
    },
    textX: {
        color: theme.colors.primary
    },
    textCheckBox: {
        fontSize: 12,
        width: '80%'
    },
    viewBox: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        flexWrap: "wrap",
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: '10%'

    },
    checkBox: {
        marginRight: 0,
        width: '15%',
    }


})


export default RegisterScreenThird;