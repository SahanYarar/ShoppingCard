import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../theme/theme';

interface PaymentMethod {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface PaymentScreenProps {
  totalAmount: string;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ totalAmount }) => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'card', color: theme.colors.primary },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal', color: '#003087' },
    { id: 'bank', name: 'Bank Transfer', icon: 'business', color: theme.colors.success },
    { id: 'cash', name: 'Cash on Delivery', icon: 'cash', color: theme.colors.accent },
  ];

  const formatCardNumber = (text: string): string => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : '';
  };

  const formatExpiryDate = (text: string): string => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handlePayment = (): void => {
    if (selectedMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        Alert.alert('Error', 'Please fill in all card details');
        return;
      }
      // Here you would typically integrate with a payment gateway
      Alert.alert('Success', 'Payment processed successfully!');
      router.push('/payment/confirmation' as any);
    } else {
      // Handle other payment methods
      Alert.alert('Success', 'Order placed successfully!');
      router.push('/payment/confirmation' as any);
    }
  };

  const renderPaymentMethods = (): JSX.Element[] => {
    return paymentMethods.map((method) => (
      <TouchableOpacity
        key={method.id}
        style={[
          styles.methodButton,
          selectedMethod === method.id && styles.selectedMethod,
        ]}
        onPress={() => setSelectedMethod(method.id)}
      >
        <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
          <Ionicons name={method.icon} size={24} color="#fff" />
        </View>
        <Text
          style={[
            styles.methodText,
            selectedMethod === method.id && styles.selectedMethodText,
          ]}
        >
          {method.name}
        </Text>
        {selectedMethod === method.id && (
          <Ionicons name="checkmark-circle" size={24} color={method.color} />
        )}
      </TouchableOpacity>
    ));
  };

  const renderCardForm = (): JSX.Element => (
    <View style={styles.cardForm}>
      <Text style={styles.formTitle}>Card Details</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          value={formatCardNumber(cardNumber)}
          onChangeText={(text) => setCardNumber(text.replace(/\s/g, ''))}
          keyboardType="numeric"
          maxLength={19}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM/YY"
            value={formatExpiryDate(expiryDate)}
            onChangeText={(text) => setExpiryDate(text.replace(/\D/g, ''))}
            maxLength={5}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="123"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={cardName}
          onChangeText={setCardName}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payment Method</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountText}>${Number(totalAmount).toFixed(2)}</Text>
        </View>

        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>
          {renderPaymentMethods()}
        </View>

        {selectedMethod === 'card' && renderCardForm()}

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.light,
  },
  backButton: {
    marginRight: theme.spacing.sm,
  },
  headerText: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  amountContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.xs,
  },
  amountText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  paymentMethods: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.text.light,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  selectedMethod: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  methodText: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  selectedMethodText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  cardForm: {
    padding: theme.spacing.md,
  },
  formTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.text.light,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    backgroundColor: theme.colors.surface,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  payButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.md,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  payButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
  },
});

export default PaymentScreen; 