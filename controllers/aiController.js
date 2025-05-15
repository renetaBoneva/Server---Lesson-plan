const { default: OpenAI } = require('openai');
const config = require('../config/index');

exports.generateLessonPlan = async (req, res) => {
    const OPEN_AI_KEY = config.OPEN_AI_KEY;
    const openai = new OpenAI({ apiKey: OPEN_AI_KEY });
    const aiModel = 'gpt-3.5-turbo-0125';
    // const aiModel = 'chatgpt-4o-latest';
    // const aiModel = 'gpt-4o-mini';
    const requirements = req.body;    

    const prompt = [];
    let planSkeleton = [];
    if (requirements.method) {
        planSkeleton.push("методи на преподаване")
    }

    if (requirements.target) {
        planSkeleton.push("цели на урока")
    }

    if (requirements.concepts) {
        planSkeleton.push("опорни понятия")
    }

    if (requirements.CoursesConnections) {
        planSkeleton.push("междупредметни връзки")
    }

    if (requirements.didacticTools) {
        planSkeleton.push("дидактически средства")
    }
    let planStructure = [];
    if (requirements.exercises) {
        planStructure.push("Задачи за упражнение")
    }
    if (requirements.conclusion) {
        planStructure.push("Заключителна част")
    }
    if (requirements.homework) {
        planStructure.push("Домашна работа")
    }

    prompt.push("Здравей! Аз съм учител в българско училище. Подготвям се за следващия ми учебен час.");
    prompt.push(`Моля те, да ми помогнеш като ми генерираш план-конспект на урока ${requirements.theme} 
        по предмета ${requirements.course} за ${requirements.classNum} клас.`);
    prompt.push(`Типът на урока е ${requirements.type},
        а продължителността на учебния час е ${requirements.time} минути.`);
    prompt.push(`Нека методическата подготовка да включва катоопорни точки учебния предмет, класа, 
        темата на урока, раздел от учебника, тип на урока, продължителност на учебния час${planSkeleton.length > 0 ? ',  ' + planSkeleton.join(', ') : ''}.`);
    prompt.push(`Моля да ми добавиш  и последна точка "Структура и ход на урока", която да 
        е най-дълга и да включва подробно описани подточките ${requirements.introduction ? 'Въвеждаща част, ' : ''} изложение на темата${planStructure.length > 0 ? ',  ' + planStructure.join(', ') : ''}.
        Нека за всяка подточка да бъде написано в скоби колко минути от часа ще заеме.`);
    prompt.push(`${requirements.notes
        ? `Моля да разгледаш внимателно стойността от полето "Бележки", да прецениш до колко е релевантна със запитването ми и да я вземеш предвид при изготвянето на плана:  ${requirements.notes}. 
        Ако някои от изискванията в бележки се припокриват с горепосочените, вземи предвид тези от бележките.`
        : ''}`);
    prompt.push('Моля, отговорът да е в string формат.');
    prompt.push('Моля, не добавяй допълнителен пояснителен текст към отговпра.');
    prompt.push('Моля, не добавяй "```plaintext ```" към отговпра.');

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