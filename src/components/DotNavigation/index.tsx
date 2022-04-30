import { useRoute } from "@react-navigation/native"
import { View, StyleSheet, Text } from "react-native"
import theme from "../../themes"

interface LinkD {
    routeName: string
}

const LinkDot = (props: LinkD) => {
    const route = useRoute();
    
    return (
        <Text
            style={[
                styles.textDot, props.routeName === route.name ?
                    styles.colorActive
                    : styles.color
            ]}
        >
            .
        </Text>
    )
}

const DotNavigation = () => {
    return (
        <View style={styles.dotView}>
            <LinkDot routeName="RegisterFirst" />
            <LinkDot routeName="RegisterSecond" />
            <LinkDot routeName="RegisterThird" />
        </View>
    )
}

const styles = StyleSheet.create({
    dotView: {
        marginBottom:'10%',
        width: '100%',
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center'
    },
    textDot: {
        fontSize: 80,
        marginRight: 10
    },
    colorActive: {
        color: theme.colors.primary
    },
    color: {
        color: theme.colors.tertiary
    }

})

export default DotNavigation;