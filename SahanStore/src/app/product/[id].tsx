import { useLocalSearchParams } from 'expo-router';
import ProductDetails from '../../screens/Product/ProductDetails';

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  return <ProductDetails productId={id as string} />;
} 