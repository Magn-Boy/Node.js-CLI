import minimist from 'minimist';
import { insideOut, oddRow } from './solution.js';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const args = minimist(process.argv.slice(2), {
    alias: {
      t: 'task',
      i: 'input',
      o: 'output'
    }
});

const handleInput = (input, output, task) => {

    if (typeof input !== 'string') {
        console.error('Путь к входному файлу не задан или указан некорректно');
        process.exit(1);
    }

    const inputSrc = input ? createReadStream(input, 'utf8') : process.stdin;
    const outputSrc = output ? createWriteStream(output) : process.stdout;

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            if (chunk === undefined || typeof chunk !== 'string') {
                return callback();
            }
        
            let data;
            try {
                if (task === 'insideOut') {
                    data = insideOut(chunk.toString());
                } else if (task === 'arrayDiff') {
                    const arrays = JSON.parse(chunk.toString());
                    if (arrays.length !== 2) {
                        throw new Error('Должно быть 2 массива');
                    }
                    data = JSON.stringify(arrayDiff(arrays[0], arrays[1]));
                } else if (task == 'oddRow') {
                    const rowIndex = parseInt(chunk.toString());
                    data = JSON.stringify(oddRow(rowIndex));
                }
                this.push(data);
                callback();
            } catch (err) {
                console.error('Ошибка во время обработки данных:', err);
                callback(err);
            }
        },
        readableObjectMode: true,
        writableObjectMode: true
    });

    return pipeline(inputSrc, transformStream, outputSrc)
        .catch(err => {
            console.error('Pipeline failed:', err);
        });
};

const { input, output, task } = args;

if (!task) {
    console.error('Необходимо указать задачу (-t или --task)');
    process.exit(1);
}

handleInput(input, output, task)
    .then(() => console.log('Операция успешно завершена'))
    .catch(err => {
        console.error('Ошибка:', err);
        process.exit(1);
    });