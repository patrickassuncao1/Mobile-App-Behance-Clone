import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import theme from "../../themes";


const HeaderTabs = ({ ...props }) => {

    return (
        <View {...props}  >
            <View style={styles.header}>
                <View style={styles.container}>
                    {props.icon && (<EvilIcons name="location" size={28} color="black" />)}
                    <Text style={ props.icon ? styles.iconText : styles.iconHeaderText }>
                        {props.title}
                    </Text>
                </View>

                <View style={[styles.container, { height: '100%', alignContent: 'center' }]}>
                    <TouchableOpacity style={[styles.iconBox, { marginRight: 10 }]}>
                        <SimpleLineIcons name="bag" size={20} color={theme.colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBox}>
                        <Feather name="menu" size={23} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center'
    },
    iconText: {
        fontSize: 14,
        paddingLeft: 5
    },
    iconHeaderText:{
        fontSize: 20,
        paddingLeft: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    iconBox: {
        width: 40,
        height: '70%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary
    }
})

export default HeaderTabs;