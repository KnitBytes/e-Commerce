const express = require('express');
const router = express.Router();
const { fetchNotifications, fetchAdminNotifications, fetchUnreadCount} = require('../controllers/notificationController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth(), fetchNotifications);
router.get('/admin', auth(), fetchAdminNotifications);
router.get('/unread-count', auth(), fetchUnreadCount);

module.exports = router;
