function makeKey (key) {
    let char = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "<", ">", "?", ",", ".", "/", ":", ";", " " ]
    let arrChar = key.split('')
    let lengthKey = key.length
    let arrNum = []
    arrChar.forEach(element => {
        arrNum.push(char.indexOf(element) + lengthKey)
    })
    let arrRes = []
    for (i=0; i<lengthKey; i++) {
        for (let j=i+1; j<lengthKey; j++) {
            arrRes.push(arrNum[i] + arrNum[j])
        }
    }
    for (i=0; i<lengthKey; i++) {
        for (let j=i+1; j<lengthKey; j++) {
            arrRes.push(arrNum[i] * arrNum[j])
        }
    }
    return arrRes
}

function encrypt (text, key) {
    let char = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "?", ",", ".", "/", ":", ";", " " ]
    let arrChar = text.split('')
    let lengthText = text.length
    let arrNum = []
    arrChar.forEach(element => {
        arrNum.push(char.indexOf(element))
    })
    let arrKey = makeKey(key)
    let lengthKey = key.length
    for (let i = 0; i < arrNum.length; i++) {
        let key1 = i % lengthKey
        let key2 = (i + lengthText) % lengthKey
        arrNum[i] += arrKey[key1] + arrKey[key2]
    }
    let arrRes = []
    arrNum.forEach(element => {
        arrRes.push(char[element % char.length])
    })
    let finalRes = '@'
    arrRes.forEach(element => {
        finalRes += element
    })
    finalRes += '@'
    return finalRes
}

function decrypt (text, key) {
    let char = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "?", ",", ".", "/", ":", ";", " " ]
    text = text.slice(1, text.length-1)
    let arrChar = text.split('')
    let lengthText = text.length
    let arrNum = []
    arrChar.forEach(element => {
        arrNum.push(char.indexOf(element))
    })
    let arrKey = makeKey(key)
    let lengthKey = key.length
    for (let i = 0; i < arrNum.length; i++) {
        let key1 = i % lengthKey
        let key2 = (i + lengthText) % lengthKey
        arrNum[i] -= arrKey[key1] + arrKey[key2]
    }
    let arrRes = []
    arrNum.forEach(element => {
        let count = element % char.length
        count += char.length
        count %= char.length
        arrRes.push(char[count])
    })
    let finalRes = ''
    arrRes.forEach(element => {
        finalRes += element
    })
    return finalRes
}
