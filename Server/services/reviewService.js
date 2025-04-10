const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addReview = async (userId, productId, rating, review_text) => {
  // Validate rating is between 1 and 5
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      product_id_user_id: {
        product_id: productId,
        user_id: userId,
      },
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this product");
  }

  const review = await prisma.review.create({
    data: {
      user_id: userId,
      product_id: productId,
      rating,
      review_text,
    },
  });

  return review;
};

exports.getReviews = async (productId) => {
  const reviews = await prisma.review.findMany({
    where: { product_id: productId },
    include: { user: { select: { full_name: true } } }, // Include user info
  });

  return reviews;
};

exports.getAverageRating = async (productId) => {
    const reviews = await prisma.review.findMany({
      where: { product_id: productId },
    });
  
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = reviews.length ? total / reviews.length : 0;
  
    return parseFloat(average.toFixed(2));
  };
  
  exports.updateReview = async (userId, productId, rating, review_text) => {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }
  
    const existing = await prisma.review.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
    });
  
    if (!existing) {
      throw new Error("You have not reviewed this product yet");
    }
  
    const updated = await prisma.review.update({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
      data: {
        rating,
        review_text,
      },
    });
  
    return updated;
  };

  exports.deleteReview = async (userId, productId, role) => {
    const existing = await prisma.review.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
    });
  
    if (!existing && role !== "admin") {
      throw new Error("Review not found or unauthorized");
    }
  
    await prisma.review.delete({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
    });
  };