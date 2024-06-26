import fs from 'fs';

// Задача на преобразование строк
function insideOut(str) {
    const words = str.split(' ');
    function processWord(word) {
        const len = word.length;
        const mid = Math.floor(len / 2);
        let firstHalf = word.slice(0, mid).split('').reverse().join('');
        if (len % 2 !== 0) {
            firstHalf += word[mid];
        }
        let secondHalf = word.slice(mid + (len % 2)).split('').reverse().join('');
        return firstHalf + secondHalf;
    }
    return words.map(processWord).join(' ');
}
// Задача для генерации строки треугольника из последовательных нечетных чисел по индексу
function oddRow(rowIndex) {
    const triangle = [];
    for (let i = 1; i <= rowIndex; i++) {
        const start = 2 * (i + 1) + 1;
        const row = [];
        for (let j = 0; j < i; j++) {
            row.push(start + 2 * j);
        }
        triangle.push(row);
    }
    return triangle[rowIndex - 1];
}

export { insideOut, oddRow };