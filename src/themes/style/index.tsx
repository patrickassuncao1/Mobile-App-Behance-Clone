import { StyleSheet } from "react-native";
import theme from "../";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

    },
    title: {
        fontSize: 25,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: '10%'
    },
    subTitle: {
        fontSize: 14,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center'
    },
    text: {
        fontSize: 14
    },
    socialMedia: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10
    },
    socialMediaGoogle: {
        marginRight: 20,
    },
    textFooter: {
        margin: '15%'
    },
    textLogin: {
        color: theme.colors.primary,
        fontWeight: 'bold'
    }, 
    TabContainer:{
        flex: 1,
        backgroundColor: theme.colors.secondary,
        alignItems:'center'
    }
});

export { styles }