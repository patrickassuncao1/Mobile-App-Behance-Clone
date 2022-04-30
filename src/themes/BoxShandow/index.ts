import { Platform } from "react-native";


const generateBoxShadowStyle = (
    xOffset: number,
    yOffset: number,
    shadowColorIos: string,
    shadowOpacity: number,
    shadowRadius: number,
    elevation: number,
    shadowColorAndroid: string,
    styles: any
) => {
    if (Platform.OS === 'ios') {
        styles.shadowProp = {
            shadowColor: shadowColorIos,
            shadowOffset: { width: xOffset, height: yOffset },
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        styles.shadowProp = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }

}

export default generateBoxShadowStyle;

