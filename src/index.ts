// NOTE: The Private variables and functions are labelled that way  becauses they are
// all just relevant within the context of the class
class RandomPasswordGenerator {
    private lettersCharacterPool: string[] = []
    private numbersCharacterPool: string[] = []
    length: number
    amtOfLetters: number

    constructor(length: number, amtOfLetters: number, exclusionString: string) {
        this.generateCharacterPools(exclusionString) // Whenever the class is initialized, this function is called and populates the characterPool
        this.length = length
        this.amtOfLetters = amtOfLetters
    }

    private generateCharacterPools(exclusionString: string) {
        const asciiChars: number[] = Array.from(Array(94)).map((e, i) => i + 33); // unicode character set of password characters
        const _characters = asciiChars.map((x) => String.fromCharCode(x)); // generates the  characters from the unicode character set
        const characterPool = _characters.filter((c) => exclusionString.includes(c) === false)
        this.lettersCharacterPool = characterPool.filter((c) => {
            let charCode = c.charCodeAt(0)
            return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)// the filter method just need a boolean value
        })
        this.numbersCharacterPool = characterPool.filter(x => this.lettersCharacterPool.indexOf(x) === -1)
    }

    private generateInclusionListFromCharacterPool(pool: string[], length: number) {
        let resultingArray: string[] = []
        for (let i = 0; i < length; i++) {
            resultingArray.push(pool[Math.floor(Math.random() * pool.length)])
        }
        return resultingArray
    }

    private shuffleArray(arr: string[]): string[] {
        return arr.sort(() => Math.random() - 0.5);
    }

    generate() {
        // Because this function cannot be called without initializing the class, it's safe to do this.
        const passwordValues = [
            ...this.generateInclusionListFromCharacterPool(this.lettersCharacterPool, this.amtOfLetters),
            ...this.generateInclusionListFromCharacterPool(this.numbersCharacterPool, this.length - this.amtOfLetters)
        ]
        let password: string = (this.shuffleArray(passwordValues).join(''))
        return password

    }
}

const password = new RandomPasswordGenerator(10, 4, 'JNkAm*ASKAja')
console.log(password.generate());
