const { insideOut, arrayDiff } = require('./solution');
const { readFromFile, readFromStdin } = require('./inputHandler');
const { writeToOutputFile, writeToStdout } = require('./outputHandler');

const args = process.argv.slice(2);


let inputFile, outputFile;

while (args.length > 0) {
    const arg = args.shift();
    switch (arg) {
        case '-i':
        case '--input':
            inputFile = args.shift();
            break;
        case '-o':
        case '--output':
            outputFile = args.shift();
            break;
        default:
            console.error(`Unknown option: ${arg}`);
            process.exit(1);
    }
}

async function main() {
    let inputData;
    if (inputFile) {
        inputData = readFromFile(inputFile);
    } else {
        inputData = await readFromStdin();
    }
    if (inputData) {
        const result = insideOut(inputData);
        if (outputFile) {
            writeToOutputFile(outputFile, result);
        } else {
            writeToStdout(result);
        }
    }
}

main().catch(err => {
    console.error(`An error occurred: ${err}`);
    process.exit(1);
});
