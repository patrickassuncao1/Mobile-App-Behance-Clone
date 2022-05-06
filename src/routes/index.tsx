import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import RegisterScreen from '../pages/Register/First';
import RegisterScreenSecond from '../pages/Register/Second';
import RegisterScreenThird from '../pages/Register/Third';
import Login from '../pages/Login';
import { PropsCartScreen, propsNavigationStack, propsNavigationTabs } from '../types/types';
import Home from '../pages/Home';
import theme from '../themes';
import HeaderTabs from '../components/HeaderTabs';
import Menu from '../pages/Menu';
import CartProvider from '../contexts/cart';
import Cart from '../pages/Cart';
import Info from '../pages/Menu/Info';

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
    return (
        <CartProvider>
            <Tab.Navigator
                initialRouteName='Home'
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
                <Tab.Screen name="Home" component={Home}
                    options={({ navigation }) => ({
                        headerTitle: (props) => <HeaderTabs
                            {...props} title="Sua Localização" icon={true}
                            navigation={navigation} />,
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="home" color={color} size={size} />
                        ),
                        tabBarActiveTintColor: theme.colors.primary,
                    })}
                />

            </Tab.Navigator>
        </CartProvider>

    )
}

const Routes = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='RegisterFirst'
                component={RegisterScreen}
            />

            <Stack.Screen
                name='RegisterSecond'
                component={RegisterScreenSecond}
                initialParams={{}}
            />

            <Stack.Screen
                name='RegisterThird'
                component={RegisterScreenThird}
                initialParams={{}}
            />

            <Stack.Screen
                name='Login'
                component={Login}
            />

            <Stack.Screen
                name='Tabs'
                component={Tabs}
                options={{
                    statusBarStyle: 'dark'
                }}
            />

        </Stack.Navigator>
    )
}

export default Routes;