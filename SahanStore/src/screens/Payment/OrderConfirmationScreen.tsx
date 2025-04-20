import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../theme/theme';

interface OrderInfo {
  label: string;
  value: string;
}

interface OrderSection {
  title: string;
  items: OrderInfo[];
}

const OrderConfirmationScreen: React.FC = () => {
  const router = useRouter();

  const orderSections: OrderSection[] = [
    {
      title: 'Order Details',
      items: [
        { label: 'Order Number', value: '#12345' },
        { label: 'Date', value: new Date().toLocaleDateString() },
        { label: 'Payment Method', value: 'Credit Card' },
      ],
    },
    {
      title: 'Delivery Information',
      items: [
        { label: 'Estimated Delivery', value: '2-3 business days' },
        { label: 'Shipping Address', value: '123 Main St, City, Country' },
      ],
    },
  ];

  const renderOrderSection = (section: OrderSection): JSX.Element => (
    <View key={section.title} style={styles.infoSection}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.items.map((item) => (
        <View key={item.label} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{item.label}</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={100} color={theme.colors.success} />
          </View>
          
          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.subtitle}>Thank you for your purchase</Text>
          
          <View style={styles.orderInfo}>
            {orderSections.map(renderOrderSection)}
          </View>

          <Text style={styles.description}>
            We've sent you an email with your order details and tracking information.
            You can track your order status in your account.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/')}
          >
            <Ionicons name="home" size={20} color={theme.colors.background} style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/cart' as any)}
          >
            <Ionicons name="location" size={20} color={theme.colors.primary} style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>Track Order</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  successIcon: {
    marginVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.xl,
  },
  orderInfo: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  infoSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.light,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.light,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.text.light,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonIcon: {
    marginRight: theme.spacing.sm,
  },
  primaryButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
  },
});

export default OrderConfirmationScreen; 