/**Укорачивание строки
 * 
 * Если длина строки string больше максимально допустимой длины maxLength, строка
 * укорачивается до maxLength символов с добавлением endSymbols в конце
 * 
 * Принимается объект @param {object} со следующими полями:
 * 
 * @param {string} string 
 * @param {number} maxLength 
 * @param {string} endSymbols - по умолчанию добавит "..." (не обязательный параметр)
 * @param {number} correct - можно дополнительно укоротить строку на это количество
 * символов (не обязательный параметр). По умолчанию 3.
 */

export default function truncate({string, maxLength, endSymbols='...', correct = 3}) {
    if (String(string).length > Number(maxLength)) {
        return String(string).slice(0, maxLength - endSymbols.length - correct) + String(endSymbols);
    } else {
        return String(string);
    }
}