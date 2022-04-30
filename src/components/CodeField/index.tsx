
import { MutableRefObject } from "react";
import { StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import theme from "../../themes";

type Code = {
    value: string,
    setValue: Function,
    ref: MutableRefObject<TextInput | null>,
    marginLeft: number
}

const CodeField = ({ value, setValue, ref, marginLeft }: Code) => {

    const handleInputs = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        if (e.nativeEvent.text === '.' || e.nativeEvent.text === '-') {
            e.preventDefault()
        } else {
            ref.current?.focus;
            setValue(e.nativeEvent.text)
        }

        /* e.target.value */
    }

    return (
        <TextInput
            style={[styles.numberField, { marginLeft: marginLeft }]}
            keyboardType='numeric'
            maxLength={1}
            autoCompleteType="off"
            ref={ref}
            value={value}
            onChange={(e) => handleInputs(e)}
        />
    )
}

const styles = StyleSheet.create({
    numberField: {
        width: 45,
        height: 48,
        fontSize: 26,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: theme.colors.secondary,
    }
});

export default CodeField;