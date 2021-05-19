const router = require('express').Router()
const messageController = require('../controllers/message.controller');
const auth = require('../middleware/auth.middleware');
router.get('/', messageController.getMessage);
router.post('/', auth.auth, auth.authAdmin, messageController.postMessage);