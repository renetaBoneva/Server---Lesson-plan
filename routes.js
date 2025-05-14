const aiController = require('./controllers/aiController');
const authController = require('./controllers/authController');
const { isOwner } = require('./middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('<h1>Server is running ...</h1>');
});

router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.put('/users/:_userID', isOwner, authController.editUser);
router.delete('/users/:_userID', isOwner, authController.deleteUser);

router.post('/generateMeLessonPlan', aiController.generateLessonPlan);

module.exports = router;