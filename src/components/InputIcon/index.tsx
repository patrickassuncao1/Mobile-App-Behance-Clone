import { StyleSheet, TextInput, View } from "react-native";
import theme from "../../themes";
import { InputRef, textInput } from "../../types/types";
import { Feather } from '@expo/vector-icons';
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";

const InputIcon = forwardRef(({
    placeholder,
    value,
    keyboardType,
    onChangeText
}: textInput, ref: Ref<InputRef>) => {

    const [seePassword, setSeePassword] = useState(true);
    const inputRef = useRef<TextInput | null>(null);
    const [errorValidate, setErrorValidate] = useState(false);

    useImperativeHandle(ref, () => ({
        focusOnError() {
            setErrorValidate(true);
            inputRef.current?.focus();
        },
        resetError() {
            setErrorValidate(false);
        }
    }))

    return (

        <View style={styles.view}>
            <TextInput
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                ref={inputRef}
                style={[styles.input, {
                    borderColor: errorValidate ? theme.colors.primary : undefined,
                    borderWidth: errorValidate ? 1 : undefined,
                }]}
                secureTextEntry={seePassword ? true : false}
            />
            <View style={styles.icon}>
                <Feather
                    name={seePassword ? 'eye-off' : 'eye'}
                    size={25}
                    color="rgba(0,0,0,0.8)"
                    onPress={e => setSeePassword(!seePassword)}
                />
            </View>
        </View>

    )
})

const styles = StyleSheet.create({
    view: {
        width: '80%',
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        height: 45,
        marginTop: 6,
        marginBottom: 6
    },
    input: {
        height: '100%',
        width: '80%',
        backgroundColor: theme.colors.secondary,
        padding: 10,
        paddingRight: 0,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    icon: {
        height: '100%',
        width: '20%',
        backgroundColor: theme.colors.secondary,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }

})


export default InputIcon;
