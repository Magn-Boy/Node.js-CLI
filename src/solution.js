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
}

// Задача на преобразование массивов
function arrayDiff(arr1, arr2) {
    
}

export { insideOut, arrayDiff };