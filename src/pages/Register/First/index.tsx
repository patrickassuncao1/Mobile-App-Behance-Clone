import { View, Text, SafeAreaView, TextInput } from "react-native";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Link, useNavigation } from "@react-navigation/native";

import DotNavigation from "../../../components/DotNavigation";
import ButtonNext from "../../../components/ButtonNext";
import Card from "../../../components/Card";
import { useRef, useState } from "react";
import Input from "../../../components/Input";
import { maskPhone, validationMessage, TypesValidate } from "../../../utils";
import { styles } from "../../../themes/style";
import { useToast } from "../../../contexts/toast";
import theme from "../../../themes";
import { InputRef, PropsStack } from "../../../types/types";
import { useEffect } from "react";

type InputOptions = {
    value: string,
    validate: TypesValidate
}
type Inputs = {
    name: InputOptions,
    phone: InputOptions,
    email: InputOptions
}

const RegisterScreen = () => {

    const { showToast } = useToast();
    const navigation = useNavigation<PropsStack>();
    const nameRef = useRef<InputRef | null>(null);
    const phoneRef = useRef<InputRef | null>(null);
    const emailRef = useRef<InputRef | null>(null);

    const [input, setInput] = useState<Inputs>({
        name: {
            value: '',
            validate: ['required']
        },
        phone: {
            value: '',
            validate: ['required', 'tel']
        },
        email: {
            value: '',
            validate: ['required', 'email']
        }
    });

    useEffect(() => emailRef.current?.resetError(), [input.email.value]);
    useEffect(() => nameRef.current?.resetError(), [input.name.value]);
    useEffect(() => phoneRef.current?.resetError(), [input.phone.value]);

    const handleInputPhone = (value: string) => {
        const mask = maskPhone(value);
        setInput({
            ...input, phone: {
                value: mask,
                validate: input.phone.validate
            }
        });
    }

    const handleSubmit = () => {
        const inputStateName: ['name', 'phone', 'email'] = ['name', 'phone', 'email'];

        for (const inputOptions of inputStateName) {
            const message = validationMessage(
                input[inputOptions].validate,
                input[inputOptions].value,
                inputOptions === 'name' ? "Nome" : inputOptions === 'phone' ? "Telefone"
                    : "Email"
            )

            if (message) {
                showToast ? showToast(message, theme.colors.primary)
                    : console.log('deu erro');

                inputOptions === 'name' ? nameRef.current?.focusOnError()
                    : inputOptions === 'phone' ? phoneRef.current?.focusOnError()
                        : emailRef.current?.focusOnError();

                return
            };

        }

        navigation.navigate('RegisterSecond', {
            name: input.name.value,
            email: input.email.value,
            phone: input.phone.value
        });

    }

    return (
        <SafeAreaView style={styles.container}>

            <DotNavigation />

            <Card>
                <Text style={styles.title}>
                    Cria Conta
                </Text>

                <Input
                    placeholder="Nome"
                    value={input.name.value}
                    onChangeText={value => setInput({
                        ...input, name: {
                            value: value,
                            validate: input.name.validate
                        }
                    })}
                    ref={nameRef}
                />
                <Input
                    placeholder="Telefone"
                    keyboardType="phone-pad"
                    value={input.phone.value}
                    onChangeText={handleInputPhone}
                    maxLength={14}
                    ref={phoneRef}

                />
                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    value={input.email.value}
                    ref={emailRef}
                    onChangeText={value => setInput({
                        ...input, email: {
                            value: value,
                            validate: input.email.validate
                        }
                    })}

                />

                <ButtonNext
                    onPress={handleSubmit}
                    text={'Próximo'}
                />


                <Text style={styles.text}>
                    ou conecte-se
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

            <Text style={[styles.text, styles.textFooter]}>
                Já possuir uma conta ?  <Link to={{ screen: 'Login' }} style={styles.textLogin}>
                    Faça Login
                </Link>

            </Text>
        </SafeAreaView >
    );
}


export default RegisterScreen;