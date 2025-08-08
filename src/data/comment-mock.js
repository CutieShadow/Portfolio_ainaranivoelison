export const comments = [
  {
    id: "1",
    name: "John Doe",
    comment: "Great portfolio! Love the design.",
    timestamp: new Date("2024-01-15").toISOString(),
    likes: 5
  },
  {
    id: "2",
    name: "Jane Smith",
    comment: "Very impressive projects!",
    timestamp: new Date("2024-01-14").toISOString(),
    likes: 3
  }
];

export const addComment = (newComment) => {
  const comment = {
    id: String(comments.length + 1),
    ...newComment,
    timestamp: new Date().toISOString(),
    likes: 0
  };
  comments.push(comment);
  return comment;
};

export const likeComment = (commentId) => {
  const comment = comments.find(c => c.id === commentId);
  if (comment) {
    comment.likes += 1;
    return comment.likes;
  }
  return 0;
};
