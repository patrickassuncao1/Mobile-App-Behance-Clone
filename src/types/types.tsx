import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType, KeyboardTypeOptions } from 'react-native';

type params = {
  name?: string,
  email?: string,
  phone?: string
}

export type StateCart = {
  key: number,
  img: ImageSourcePropType,
  type: string,
  price: string,
  stars: number,
  gram: string,
  name: string,
  qnt?: number
}

export type propsNavigationStack = {
  RegisterFirst: undefined;
  RegisterSecond: params;
  RegisterThird: params;
  Login: undefined;
  Tabs: undefined,
  Items: undefined,
  Info: StateCart
};

export type propsNavigationMenu = {
  Items: undefined,
  Info: StateCart
}

export type propsNavigationTabs = {
  Home: undefined,
  Menu: undefined,
  Cart: undefined,
  Profile: undefined
}

export type RootStackScreenProps<T extends keyof propsNavigationMenu> =
  NativeStackScreenProps<propsNavigationMenu, T>;

export type MenuTabScreenProps =
  CompositeScreenProps<
    BottomTabScreenProps<propsNavigationTabs, 'Menu'>,
    RootStackScreenProps<keyof propsNavigationMenu>
  >;

export type textInput = {
  placeholder?: string,
  value?: string,
  keyboardType?: KeyboardTypeOptions | undefined,
  onChangeText?: ((text: string) => void) | undefined
}

export type PropsStack = NativeStackNavigationProp<propsNavigationStack>;
export type PropsCartScreen = NativeStackScreenProps<propsNavigationTabs, 'Cart'>;
export type PropsInfoScreen = NativeStackScreenProps<propsNavigationMenu, 'Info'>;

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


export type CartType = {
  addCartItem?: (data: StateCart | undefined) => void,
  totalValue?: number,
  shoppingCart?: StateCart[],
  deleteCartItem?: (data: StateCart | undefined) => void,
  removeCartItem?: (data: StateCart | undefined) => void
}


