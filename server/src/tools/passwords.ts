import * as crypto from 'crypto'
import {sleep} from "./sleep";

const HASHING_ALGORITHM = 'sha256'
const PEPPER = process.env.PEPPER

type seperatedPassword = {
    algorithm: string,
    salt: string,
    hash: string
}

function generateSalt(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function createHash( saltedPassword: string, algorithm: string = HASHING_ALGORITHM) {
    return crypto.createHash(algorithm).update(saltedPassword).digest('hex')
}

export function formatPassword( password: string ): string {
    const salt = generateSalt(32)
    const hash = createHash(password + salt + PEPPER)
    return `${HASHING_ALGORITHM}$${salt}$${hash}`
}

export function parseFormattedPassword( formattedPassword: string ): seperatedPassword {
    const passwordList = formattedPassword.split('$')
    return {
        algorithm: passwordList[0],
        salt: passwordList[1],
        hash: passwordList[2]
    }
}

export function checkPassword( formattedPassword: string, password: string ): boolean {

    const parsedPassword = parseFormattedPassword( formattedPassword )
    const hashedPassword = createHash(
        password + parsedPassword.salt + PEPPER,
        parsedPassword.algorithm
    )

    return hashedPassword == parsedPassword.hash
}