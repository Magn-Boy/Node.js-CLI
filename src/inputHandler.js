import fs from 'fs';


function readFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.trim(); 
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        process.exit(1); 
    }
}

function readFromStdin() {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding('utf8');

        process.stdin.on('readable', () => {
            const chunk = process.stdin.read();
            if (chunk !== null) {
                data += chunk;
            }
        });

        process.stdin.on('end', () => {
            resolve(data.trim());
        });
    });
}

export { readFromFile, readFromStdin };
