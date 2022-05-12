import { NavigationContainer } from '@react-navigation/native';
import Toast from './src/components/Toast';
import AuthProvider from './src/contexts/auth';
import ToastProvider from './src/contexts/toast';

import * as NavigationBar from 'expo-navigation-bar';


import Routes from './src/routes';
import theme from './src/themes';

NavigationBar.setBackgroundColorAsync(theme.colors.secondary);
NavigationBar.setButtonStyleAsync('dark');

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <Toast />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ToastProvider>
    </NavigationContainer>
  );
}
