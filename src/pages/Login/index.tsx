import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import ButtonNext from "../../components/ButtonNext";
import Card from "../../components/Card";
import Input from "../../components/Input";
import InputIcon from "../../components/InputIcon";
import theme from "../../themes";
import { styles } from "../../themes/style";
import { useEffect, useRef, useState } from "react";
import { TypesValidate, validationMessage } from "../../utils";
import { useToast } from "../../contexts/toast";
import { InputRef, PropsStack } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

type LoginInputType = {
    email: {
        value: string,
        validate: TypesValidate
    },
    password: {
        value: string,
        validate: TypesValidate
    }
}


const Login = () => {
    
    const navigation = useNavigation<PropsStack>();

    const [input, setInput] = useState<LoginInputType>({
        email: {
            value: '',
            validate: ['required', 'email']
        },
        password: {
            value: '',
            validate: ['required']
        }
    });
    const emailRef = useRef<InputRef | null>(null);
    const passwordRef = useRef<InputRef | null>(null);

    const { showToast } = useToast();

    useEffect(() => emailRef.current?.resetError(), [input.email.value]);
    useEffect(() => passwordRef.current?.resetError(), [input.password.value]);

    const handleSubmit = () => {
        const inputStateName: ['email', 'password'] = ['email', 'password'];

        for (const inputOptions of inputStateName) {
            const message = validationMessage(
                input[inputOptions].validate,
                input[inputOptions].value,
                inputOptions === 'email' ? "Email" : 'Senha'
            )

            if (message) {
                showToast ? showToast(message, theme.colors.primary)
                    : console.log('deu erro');

                inputOptions === 'email' ? emailRef.current?.focusOnError()
                    : passwordRef.current?.focusOnError();

                return
            };

        }

        navigation.navigate('Tabs');

    }

    return (
        <SafeAreaView style={styles.container}>
            <Card>
                <Text style={[styles.title, { marginBottom: 5 }]}>
                    Bem vindo de volta!
                </Text>
                <Text style={styleSecond.subtitle}>
                    Entre na sua conta
                </Text>
                <Input
                    placeholder="Email"
                    ref={emailRef}
                    value={input.email.value}
                    keyboardType="email-address"
                    onChangeText={(text) => setInput({
                        ...input,
                        email: {
                            value: text,
                            validate: input.email.validate
                        }
                    })}
                />
                <InputIcon
                    placeholder="Senha"
                    ref={passwordRef}
                    value={input.password.value}
                    onChangeText={(text) => setInput({
                        ...input,
                        password: {
                            value: text,
                            validate: input.password.validate
                        }
                    })}
                />

                <ButtonNext text="Entrar" onPress={handleSubmit} />

                <Text style={[styles.subTitle, { fontWeight: 'bold', marginBottom: 20 }]}>
                    Esqueceu sua senha ?
                </Text>

                <Text style={styles.text}>
                    ou continue com
                </Text>

                <View style={styles.socialMedia}>
                    <AntDesign name="google" size={35}
                        color="#E64852"
                        style={styles.socialMediaGoogle}
                    />
                    <FontAwesome5
                        name="facebook"
                        size={35}
                        color="#7992DD"
                    />
                </View>
            </Card>
        </SafeAreaView>
    )
}

const styleSecond = StyleSheet.create({
    subtitle: {
        color: theme.colors.subText,
        fontSize: 15,
        marginBottom: '10%'
    }
})

export default Login;