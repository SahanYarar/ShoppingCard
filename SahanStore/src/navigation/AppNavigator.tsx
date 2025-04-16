import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Cart from '../screens/Cart/cart';
import Home from '../screens/Home/Home';
import ProductDetails from '../screens/Product/ProductDetails';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme/theme';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register}
          options={{ title: 'Register' }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Cart" 
          component={Cart}
          options={{ 
            title: 'Chocolate Cart',
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails as any}
          options={{ 
            title: 'Product Details',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 