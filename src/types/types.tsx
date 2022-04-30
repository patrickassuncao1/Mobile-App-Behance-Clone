import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardTypeOptions } from 'react-native';

type params = {
  name?: string,
  email?: string,
  phone?: string
}
export type propsNavigationStack = {
  RegisterFirst: undefined;
  RegisterSecond: params;
  RegisterThird: params;
  Login: undefined;
  Tabs: undefined

};

export type propsNavigationTabs = {
  Home: undefined,
  Menu: undefined, 
  Cart: undefined,
  Profile: undefined
}


export type textInput = {
  placeholder?: string,
  value?: string,
  keyboardType?: KeyboardTypeOptions | undefined,
  onChangeText?: ((text: string) => void) | undefined
}

export type PropsStack = NativeStackNavigationProp<propsNavigationStack>;

type ToastFuction = (message?: string, background?: string) => void;
export type ToastType = {
  showToast?: ToastFuction,
  hiddenToast?: ToastFuction,
  state?: {
    show: boolean,
    message: string,
    type: null,
    duration: number,
    background: string
  }
};

export type InputRef = {
  focusOnError: () => void,
  resetError: () => void
};
