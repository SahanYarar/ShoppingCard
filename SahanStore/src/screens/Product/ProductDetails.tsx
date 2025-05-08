import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Product, Comment } from '../../types/product';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import { API_URL } from '../../config';
import { theme } from '../../theme/theme';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [commentLoading, setCommentLoading] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;

    setCommentLoading(true);
    try {
      console.log('Sending comment:', {
        text: newComment,
        rating,
        userId: user.id,
        userName: user.name,
        productId
      });

      const response = await fetch(`${API_URL}/products/${productId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newComment,
          rating,
          userId: user.id,
          userName: user.name,
        }),
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const comment = await response.json();
        console.log('Received comment from server:', comment);
        
        // Clear the input and reset rating
        setNewComment('');
        setRating(5);
        
        // Refresh comments from server
        await refreshComments();
      } else {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const refreshComments = async () => {
    try {
      console.log('Fetching comments for product:', productId);
      const commentsResponse = await fetch(`${API_URL}/products/${productId}/comments`);
      console.log('Comments response status:', commentsResponse.status);
      
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        console.log('Fetched comments:', commentsData);
        setComments(commentsData);
      } else {
        console.error('Failed to fetch comments:', await commentsResponse.text());
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        
        await refreshComments();
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (productId) {
      refreshComments();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading product...</Text>
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

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={32} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          <Text style={styles.price}>₺{product.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.desc}</Text>
        </View>

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>Comments</Text>
          
          {user ? (
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Write your comment..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                  >
                    <Ionicons
                      name={star <= rating ? "star" : "star-outline"}
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={[styles.addCommentButton, !newComment.trim() && styles.disabledButton]}
                onPress={handleAddComment}
                disabled={!newComment.trim() || commentLoading}
              >
                {commentLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.addCommentButtonText}>Post Comment</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.loginPrompt}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginPromptText}>Login to leave a comment</Text>
            </TouchableOpacity>
          )}

          <View style={styles.commentsList}>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUserName}>{comment.userName}</Text>
                    <View style={styles.commentRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= comment.rating ? "star" : "star-outline"}
                          size={16}
                          color={theme.colors.primary}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Text style={styles.commentDate}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    paddingTop: 50,
  },
  backButton: {
    padding: theme.spacing.md,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: theme.colors.background,
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
  imageContainer: {
    width: '100%',
    height: width * 0.5,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  brand: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.light,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  price: {
    fontSize: theme.typography.fontSize.xxl,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: 24,
    color: theme.colors.text.secondary,
  },
  addToCartButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.lg,
  },
  addToCartText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginLeft: theme.spacing.md,
  },
  commentsSection: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  addCommentContainer: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  commentInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: theme.spacing.md,
    color: theme.colors.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    justifyContent: 'center',
  },
  addCommentButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  addCommentButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
  },
  loginPrompt: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  loginPromptText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
  },
  commentsList: {
    gap: theme.spacing.md,
  },
  commentItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  commentUserName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  commentRating: {
    flexDirection: 'row',
  },
  commentText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  commentDate: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.light,
  },
  noCommentsText: {
    textAlign: 'center',
    color: theme.colors.text.light,
    fontSize: theme.typography.fontSize.md,
    fontStyle: 'italic',
    marginTop: theme.spacing.md,
  },
}); 