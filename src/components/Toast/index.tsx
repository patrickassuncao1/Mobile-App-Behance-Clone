import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View, Animated, Easing } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Feather } from '@expo/vector-icons';
import theme from "../../themes";
import { useToast } from "../../contexts/toast";

var timer: any = null;

const Toast = () => {

    const { state, hiddenToast } = useToast();
    const [stylesStatusBar, setStylesStatusBar] = useState<StatusBarStyle>('dark');
    const [pos] = useState(new Animated.Value(-(getStatusBarHeight() + 50)));


    useEffect(() => {
        state?.show && show();
    }, [state?.show])

    const hide = () => {
        Animated.timing(pos, {
            toValue: -(getStatusBarHeight() + 50),
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear
        }).start(() => {
            hiddenToast && hiddenToast();
            setStylesStatusBar('dark');
        });
    };

    const show = () => {
        clearTimeout(timer);
        setStylesStatusBar('light');
        Animated.timing(pos, {
            toValue: 0,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear
        }).start();

        timer = setTimeout(() => {
            hide();
        }, state?.duration);
    };

    const handleOnPress = () => {
        clearTimeout(timer);
        hide();
    }

    const zIndex = (val: number) => {
        return Platform.select({
            ios: { zIndex: val },
            android: { elevation: val }
        })
    }

    return (
        <View style={{ ...zIndex(100),}} >
            <StatusBar
                style={stylesStatusBar}
                translucent={true}
                backgroundColor={state?.background}
            />
            <TouchableWithoutFeedback onPress={handleOnPress} >
                <Animated.View style={[
                    styles.default,
                    {
                        backgroundColor: state?.background,
                        transform: [{ translateY: pos }]
                    }]}
                >
                    <View style={styles.msgContainer}>
                        <Feather name="x-circle" size={26} color={theme.colors.white}  />
                        <Text style={styles.text} >
                            {state?.message}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>

        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        position: 'absolute',
        width: "100%",
        paddingHorizontal: 7,
        paddingBottom: 15,
        paddingTop: getStatusBarHeight() + 15,
        alignSelf: 'center',
        justifyContent: 'center',
        
    },
    msgContainer: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: theme.colors.white,
        fontSize: 14,
        paddingHorizontal: 10,
    }
});

export default Toast;