const cryptojs = require('crypto-js')
require("dotenv").config()
/**
 * Utility class for encryption and decryption
 */
class Crypt {
    constructor() {
        this.cipher = cryptojs.AES;
    }

    encryptData(valueToEncrypt) {
        var cipherText = this.cipher.encrypt(valueToEncrypt, process.env.SECRET_KEY).toString();
        return cipherText

    }

    decryptData(valueToDecrypt) {
        var plainText = this.cipher.decrypt(valueToDecrypt, process.env.SECRET_KEY).toString();
        return plainText
    }
}

// module.exports = Crypt

let crypt = new Crypt()

console.log(crypt.decryptData(crypt.encryptData("Hello")))