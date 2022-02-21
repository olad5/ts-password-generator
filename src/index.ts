const asciiChars: number[] = Array.from(Array(94)).map((e, i) => i + 33);//unicode character set of password characters
const characters: string[] = asciiChars.map((x) => String.fromCharCode(x));// generates the  characters from the unicode character set

class PasswordGenerator {
    length: number
    amtOfLetters: number
    excludeList: string

    constructor(length: number, amtOfLetters: number, excludeList: string) {
        this.length = length
        this.amtOfLetters = amtOfLetters
        this.excludeList = excludeList
    }

    generate() {

        let availableCharPool: string[] = characters.filter((c) => this.excludeList.includes(c) === false)

        let availableCharPoolLetters: string[] = availableCharPool.filter((c) => {
            let charCode = c.charCodeAt(0)
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
                return c
            }
        })

        let availableCharPoolSymbolsNumbers: string[] = availableCharPool.filter(x => availableCharPoolLetters.indexOf(x) === -1);


        let resultingArray: string[] = []

        for (let i = 0; i < this.amtOfLetters; i++) {
            resultingArray.push(availableCharPoolLetters[Math.floor(Math.random() * availableCharPoolLetters.length)])
        }

        for (let i = 0; i < (this.length - this.amtOfLetters); i++) {
            resultingArray.push(availableCharPoolSymbolsNumbers[Math.floor(Math.random() * availableCharPoolSymbolsNumbers.length)])
        }


        function shuffleArray(arr: string[]): string[] {
            return arr.sort(() => Math.random() - 0.5);
        }

        let password: string = (shuffleArray(resultingArray).join(''))
        return password

    }

}

const password = new PasswordGenerator(20, 9, 'JNkAm*ASKAja')
console.log(password.generate());
