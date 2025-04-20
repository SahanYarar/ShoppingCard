import { useLocalSearchParams } from 'expo-router';
import PaymentScreen from '../../screens/Payment/PaymentScreen';

export default function Payment() {
  const { totalAmount } = useLocalSearchParams<{ totalAmount: string }>();
  return <PaymentScreen totalAmount={totalAmount} />;
} 