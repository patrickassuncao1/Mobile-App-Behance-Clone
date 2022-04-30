import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native"

import theme from "../../themes";

type Button = {
    text: string,
    onPress: null | ((event: GestureResponderEvent) => void) | undefined

};


const ButtonNext = (props: Button) => {

    return (
        <Pressable
            onPress={props.onPress}
            accessibilityLabel="Próxima etapa para criar sua conta"
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? theme.colors.tertiary
                        : theme.colors.primary
                },
                styles.button
            ]}
        >
            <Text style={styles.buttonText}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: theme.colors.white,
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: 10,
        margin: 6,
        width: '80%',
        marginBottom: '5%'
    }
});

export default ButtonNext;