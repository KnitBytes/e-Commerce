const { getUserNotifications,getAdminNotifications,getUnreadCount} = require('../services/notificationService');

const fetchNotifications = async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ success: false, message: 'Access denied: users only' });
  }
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { notifications, metadata } = await getUserNotifications(userId, page, limit);
  res.status(200).json({ success: true, data: notifications, metadata });
};

const fetchAdminNotifications = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { notifications, metadata } = await getAdminNotifications(page, limit);
  res.status(200).json({ success: true, data: notifications, metadata });
};


const fetchUnreadCount = async (req, res) => {
  const userId = req.user.id;
  const isAdmin = req.user.role === 'admin';

  const count = await getUnreadCount(userId, isAdmin);
  res.status(200).json({ success: true, count });
  console.log('isAdmin:', isAdmin);
console.log('userId:', userId);
};


module.exports = {
  fetchNotifications,
  fetchAdminNotifications,
  fetchUnreadCount
};
