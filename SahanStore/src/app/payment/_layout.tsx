import { Stack } from 'expo-router';

export default function PaymentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Payment',
        }}
      />
      <Stack.Screen
        name="confirmation"
        options={{
          title: 'Order Confirmation',
        }}
      />
    </Stack>
  );
} 