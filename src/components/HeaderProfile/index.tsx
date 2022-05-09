import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import theme from "../../themes";

const HeaderProfile = ({ ...props }) => {
    return (
        <View {...props} >
            <View style={styles.header}>
                <View></View>
                <TouchableOpacity style={styles.iconBox}>
                    <Ionicons name="notifications-outline" size={23} color={theme.colors.white} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center'
    }
})

export default HeaderProfile;
