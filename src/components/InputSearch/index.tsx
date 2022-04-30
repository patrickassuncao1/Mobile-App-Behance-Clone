import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import theme from "../../themes";

type InputSearchType = TextInputProps & {
    setInputSearch?: Function
}

const InputSearch = ({ setInputSearch, ...props }: InputSearchType) => {
   
    const resetInput = () => {
        setInputSearch ? setInputSearch('') : console.log('error');
    }

    return (
        <View style={styles.view}>
            <View style={[styles.icon, styles.iconSearch]}>
                <Feather name="search" size={22} color={theme.colors.subText} />
            </View>
            <TextInput
                {...props}
                style={styles.input}
                value={props.value}
            />
            <View style={[styles.icon, styles.iconX]}>
                {props.value !== "" && (
                    <Feather
                        name="x"
                        size={18}
                        color={theme.colors.subText}
                        onPress={resetInput}
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '90%',
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        height: 45,
        marginBottom: 6
    },
    input: {
        height: '100%',
        width: '80%',
        backgroundColor: theme.colors.white,
        padding: 10,
        paddingLeft: 0,
        paddingRight: 0,
    },
    icon: {
        height: '100%',
        width: '10%',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconX: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
    },
    iconSearch: {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        paddingLeft: 1
    }

})

export default InputSearch