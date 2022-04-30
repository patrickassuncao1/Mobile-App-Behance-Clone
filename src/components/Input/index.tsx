import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import theme from "../../themes";
import { InputRef, textInput } from "../../types/types";

type InputType = textInput & {
    maxLength?: number
}

const Input = forwardRef(({
    placeholder,
    value,
    keyboardType,
    onChangeText,
    maxLength,
}: InputType,
    ref?: Ref<InputRef>) => {

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
                ref={inputRef}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                style={[
                    styles.input, {
                        borderColor: errorValidate ? theme.colors.primary : undefined,
                        borderWidth: errorValidate ? 1 : undefined,
                    }
                ]}
                maxLength={maxLength}

            />
        </View>
    )
})

const styles = StyleSheet.create({
    input: {
        height: 45,
        width: '80%',
        margin: 6,
        backgroundColor: theme.colors.secondary,
        padding: 10,
        borderRadius: 10
    },
    view: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'center'
    }
})


export default Input;