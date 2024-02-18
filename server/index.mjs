import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const server = fastify();

server.register(fastifyStatic, {
    root: path.join(__dirname, '../client')
});

server.post('/calculate-statistics', async (request, reply) => {
    const { words } = request.body;
    return calculateStatistics(splitWords(words));
});

function splitWords(input) {
    return input.split(' ').filter(word => word.trim() !== '' && !isPunctuation(word)).map(word => word.toLowerCase());
}

function isPunctuation(word) {
    const punctuationMarks = [',', '.', ';', '!', '?'];
    return punctuationMarks.includes(word);
}

function calculateStatistics(words) {
    const uniqueWords = new Set(words);
    const wordCountMap = new Map();
    words.forEach(function (word) {
        if (wordCountMap.has(word)) {
            wordCountMap.set(word, wordCountMap.get(word) + 1);
        } else {
            wordCountMap.set(word, 1);
        }
    });

    return {
        uniqueWordsCount: uniqueWords.size,
        wordCountMap: Object.fromEntries(wordCountMap)
    };
}

server.listen(5555, (err, address) => {
    console.log(`Server listening on ${address}`);
});
