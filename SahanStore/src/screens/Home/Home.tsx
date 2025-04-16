import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types/product';
import { API_URL } from '../../config';
import { theme } from '../../theme/theme';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();
  const { addToCart } = useCart();
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('search', searchQuery);
        if (sortBy) {
          queryParams.append('sortBy', sortBy);
          queryParams.append('sortOrder', sortOrder);
        }
        
        const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, sortBy, sortOrder]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const toggleSort = (field: 'name' | 'price') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      global.token = undefined;
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productContent}>
        <TouchableOpacity 
          onPress={() => router.push(`/product/${item.id}`)}
          style={styles.productTouchable}
        >
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>₺{item.price.toFixed(2)}</Text>
              <Text style={styles.productDesc} numberOfLines={1}>{item.desc}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.addToCartButton}>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.addToCartTouchable}
          >
            <Ionicons name="cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="red" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Advertiser: {user?.name || 'User'}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'name' && styles.activeSortButton]}
            onPress={() => toggleSort('name')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'name' && styles.activeSortButtonText
            ]}>
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'price' && styles.activeSortButton]}
            onPress={() => toggleSort('price')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'price' && styles.activeSortButtonText
            ]}>
              Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.light,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  logoutButton: {
    padding: theme.spacing.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.light,
  },
  errorText: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.error,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  searchContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.light,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.text.light,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    color: theme.colors.text.primary,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.xs,
  },
  sortButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background,
  },
  activeSortButton: {
    backgroundColor: theme.colors.primary,
  },
  sortButtonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.sm,
  },
  activeSortButtonText: {
    color: theme.colors.surface,
  },
  list: {
    padding: theme.spacing.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: theme.colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productContent: {
    flex: 1,
    position: 'relative',
  },
  productTouchable: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  productImage: {
    width: 150,
    height: 150,
    objectFit: 'cover',
  },
  productInfo: {
    padding: theme.spacing.md,
  },
  productBrand: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.primary,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  productDesc: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.light,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addToCartTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 