import minimist from 'minimist';
import { insideOut, arrayDiff } from './solution.js';
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
    const inputSrc = input ? createReadStream(input, 'utf8') : process.stdin;
    const outputSrc = output ? createWriteStream(output) : process.stdout;

    transformStream = new Transform({
        transform(chunk, encoding, callback) {
            let data;
            if (task === 'insideOut') {
                data = insideOut(chunk.toString());
            } else if (task === 'arrayDiff') {
                try {
                    const arrays = JSON.parse(chunk.toString());
                    if (arrays.length !== 2) {
                        throw new Error('Должно быть 2 массива');
                    }
                    data = JSON.stringify(arrayDiff(arrays[0], arrays[1]));
                } catch (err) {
                    return callback(err);
                }
            }
            this.push(data);
            callback();
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