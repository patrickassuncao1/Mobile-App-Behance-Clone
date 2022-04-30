import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import RegisterScreen from '../pages/Register/First';
import RegisterScreenSecond from '../pages/Register/Second';
import RegisterScreenThird from '../pages/Register/Third';
import Login from '../pages/Login';
import { propsNavigationStack, propsNavigationTabs } from '../types/types';
import Home from '../pages/Home';
import theme from '../themes';
import HeaderTabs from '../components/HeaderTabs';
import Menu from '../pages/Menu';

const Tab = createBottomTabNavigator<propsNavigationTabs>();
const Stack = createNativeStackNavigator<propsNavigationStack>();

const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName='Home' >
            <Tab.Screen name="Menu" component={Menu} options={{
                headerTitle: (props) => <HeaderTabs {...props} title="Menu" />,
                headerStyle: {
                    backgroundColor: theme.colors.secondary
                },
                tabBarIcon: ({ color, size }) => (
                    <Feather name="book-open" color={color} size={size} />
                ),
                tabBarActiveTintColor: theme.colors.primary,

            }}
            />

            <Tab.Screen name="Home" component={Home} options={{
                headerTitle: (props) => <HeaderTabs {...props} title="Sua Localização" icon={true} />,
                headerStyle: {
                    backgroundColor: theme.colors.secondary
                },
                tabBarIcon: ({ color, size }) => (
                    <Feather name="home" color={color} size={size} />
                ),
                tabBarActiveTintColor: theme.colors.primary,

            }}
            />

        </Tab.Navigator>
    )
}

const Routes = () => {
    return (

        <Stack.Navigator initialRouteName='Tabs'>
            <Stack.Screen
                name='RegisterFirst'
                component={RegisterScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='RegisterSecond'
                component={RegisterScreenSecond}
                options={{
                    headerShown: false
                }}
                initialParams={{}}
            />

            <Stack.Screen
                name='RegisterThird'
                component={RegisterScreenThird}
                options={{
                    headerShown: false
                }}
                initialParams={{}}
            />

            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='Tabs'
                component={Tabs}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

export default Routes;