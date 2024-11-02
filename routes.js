const aiController = require('./controllers/aiController');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('<h1>Server is running ...</h1>');
});

router.post('/generateMeLessonPlan', aiController.generateLessonPlan)

module.exports = router;