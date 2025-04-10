const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createNotification = async ({ user_id, message }) => {
  return await prisma.notification.create({
    data: {
      user_id,
      message,
    },
  });
};

const getUserNotifications = async (user_id, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  // Fetch paginated data
  const notifications = await prisma.notification.findMany({
    where: {
      OR: [{ user_id }, { user_id: null }]
    },
    orderBy: { created_at: 'desc' },
    skip,
    take: limit
  });

  // Mark as read
  const notificationIds = notifications.map(n => n.id);
  await prisma.notification.updateMany({
    where: {
      id: { in: notificationIds },
      is_read: false
    },
    data: { is_read: true }
  });

  // Total count
  const totalCount = await prisma.notification.count({
    where: {
      OR: [{ user_id }, { user_id: null }]
    }
  });

  return {
    notifications,
    metadata: {
      page,
      limit,
      totalCount,
      hasMore: page * limit < totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
  };
};

const getAdminNotifications = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const notifications = await prisma.notification.findMany({
    where: { user_id: null },
    orderBy: { created_at: 'desc' },
    skip,
    take: limit
  });

  const notificationIds = notifications.map(n => n.id);
  await prisma.notification.updateMany({
    where: {
      id: { in: notificationIds },
      is_read: false
    },
    data: { is_read: true }
  });

  const totalCount = await prisma.notification.count({
    where: { user_id: null }
  });

  return {
    notifications,
    metadata: {
      page,
      limit,
      totalCount,
      hasMore: page * limit < totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
  };
};
const getUnreadCount = async (user_id, isAdmin = false) => {
  const where = isAdmin
    ? { user_id: null, is_read: false } // Admin sees only global
    : { user_id, is_read: false };      // User sees only their own

  return await prisma.notification.count({ where });
};

module.exports = {
  createNotification,
  getUserNotifications,
  getAdminNotifications,
  getUnreadCount
};
