const express = require('express');
const router = express.Router();
const { googleAuth, googleAuthCallback, githubAuth, githubAuthCallback } = require('../controller/userController');

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

router.get('/github', githubAuth);
router.get('/github/callback', githubAuthCallback);

module.exports = router;
