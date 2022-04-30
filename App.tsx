import { NavigationContainer } from '@react-navigation/native';
import Toast from './src/components/Toast';
import AuthProvider from './src/contexts/auth';
import ToastProvider from './src/contexts/toast';

import Routes from './src/routes';

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
