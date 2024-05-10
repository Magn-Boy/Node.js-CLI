import fs from 'fs';

function writeToOutputFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, data);
        console.log(`Data written to ${filePath}`);
    } catch (err) {
        console.error(`Error writing to file: ${err}`);
        process.exit(1); 
    }
}

function writeToStdout(data) {
    process.stdout.write(data);
}

export { writeToOutputFile, writeToStdout };
