import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from '../pages/Register/First';
import RegisterScreenSecond from '../pages/Register/Second';
import RegisterScreenThird from '../pages/Register/Third';
import Login from '../pages/Login';
import { propsNavigationStack } from '../types/types';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator<propsNavigationStack>();

const Routes = () => {
    return (
        <Stack.Navigator
            initialRouteName='Tabs'
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