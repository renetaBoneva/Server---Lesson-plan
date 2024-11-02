const config = require('../config/index');

exports.generateLessonPlan = async (req, res) => {
    const OPEN_AI_KEY = config.OPEN_AI_KEY;
    const openai = new OpenAI({ apiKey: OPEN_AI_KEY });
    const aiModel = 'gpt-3.5-turbo-0125';
    // const question = req.body.question;
    // const questionJSON = JSON.stringify({ question });

    const prompt = [];
    prompt.push("Здравей! Аз съм учител и се подготвям за следващия ми учебен час.");
    prompt.push("Моля те, генерирай ми план-конспект на урока Дробни числа по математика за 5 клас.");
   

    const messages = [
        {
            role: 'system',
            content: prompt.join(' ')
        }
    ];

    const completion = await openai.chat.completions.create({
        model: aiModel,
        messages,
        response_format: { 'type': 'text' }
    })

    const aiResponse = completion.choices[0].message.content;
   return res.status(200).json({ aiResponse });
}