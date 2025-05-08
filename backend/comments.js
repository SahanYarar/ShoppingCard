let comments = [];


const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};


const getProductComments = (productId) => {
  const stringProductId = String(productId);
  return comments.filter(comment => String(comment.productId) === stringProductId);
};


const addComment = (comment) => {
  const newComment = {
    ...comment,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  comments.push(newComment);
  return newComment;
};


const deleteComment = (commentId) => {
  const index = comments.findIndex(comment => comment.id === commentId);
  if (index !== -1) {
    comments.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getProductComments,
  addComment,
  deleteComment
}; 