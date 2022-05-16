import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';

import { PropsCartScreen, propsNavigationStack, propsNavigationTabs } from '../../types/types';
import Home from '../../pages/Home';
import theme from '../../themes';
import HeaderTabs from '../../components/HeaderTabs';
import Menu from '../../pages/Menu';
import CartProvider from '../../contexts/cart';
import Cart from '../../pages/Cart';
import Info from '../../pages/Menu/Info';
import Profile from '../../pages/Profile';
import HeaderProfile from '../../components/HeaderProfile';
import MenuProvider, { useMenu } from '../../contexts/menu';
import MenuHeader from '../../components/MenuHeader';

const Tab = createBottomTabNavigator<propsNavigationTabs>();
const Stack = createNativeStackNavigator<propsNavigationStack>();


const RouteMenu = ({ navigation }: PropsCartScreen) => {
    return (
        <Stack.Navigator
            initialRouteName='Items'
            screenOptions={{
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                name='Items'
                component={Menu}
                options={{
                    headerTitle: (props) => <HeaderTabs
                        {...props} title="Menu" navigation={navigation} />,
                    headerStyle: { backgroundColor: theme.colors.secondary },

                }}
            />
            <Stack.Screen
                name='Info'
                component={Info}
                options={{
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: theme.colors.white
                    },
                }}
                initialParams={{}}

            />
        </Stack.Navigator>
    )
}

const RouteHome = ({ navigation }: PropsCartScreen) => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerTitle: (props) => <HeaderTabs
                        {...props} title="Home" navigation={navigation} />,
                    headerStyle: { backgroundColor: theme.colors.secondary }
                }}
            />
            <Stack.Screen
                name='Info'
                component={Info}
                options={{
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: theme.colors.white
                    },
                }}
                initialParams={{}}

            />
        </Stack.Navigator>
    )
}

const Tabs = () => {

    const { isActiveMenu } = useMenu();
    return (
        <MenuProvider>
            <CartProvider>
                <Tab.Navigator
                    initialRouteName='RouteHome'
                    screenOptions={{
                        headerStyle: { backgroundColor: theme.colors.secondary },
                    }}
                >
                    <Tab.Screen name="Menu" component={RouteMenu}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="book-open" color={color} size={size} />
                            ),
                            tabBarActiveTintColor: theme.colors.primary,
                            headerShown: false,
                        }}
                    />

                    <Tab.Screen name="Cart" component={Cart} options={{
                        headerTitle: (props) => <HeaderTabs {...props} title="Carrinho" />,
                        tabBarIcon: ({ color, size }) => (
                            <SimpleLineIcons name="bag" size={size} color={color} />
                        ),
                        tabBarLabel: 'Carrinho',
                        tabBarActiveTintColor: theme.colors.primary,

                    }}
                    />
                    <Tab.Screen name="RouteHome" component={RouteHome}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="home" color={color} size={size} />
                            ),
                            tabBarActiveTintColor: theme.colors.primary,
                            tabBarLabel: 'Home',
                            headerShown: false,
                        }}
                    />
                    <Tab.Screen name="Profile" component={Profile}
                        options={{
                            headerTitle: (props) => <HeaderProfile  {...props} />,
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome5 name="user-circle" color={color} size={size} />
                            ),
                            tabBarActiveTintColor: theme.colors.primary,
                            tabBarLabel: 'Perfil',

                        }}
                    />

                </Tab.Navigator>
            </CartProvider>
             <MenuHeader />
        </MenuProvider>


    )
}

export default Tabs;