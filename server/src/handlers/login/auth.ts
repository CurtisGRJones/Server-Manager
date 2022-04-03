import {sleep} from "../../tools/sleep";

export async function auth ( user: string, pass: string ): Promise<boolean> {
    const x = sleep(1000)
    // TODO add authentication in here to prevent timing attacks

    await x
    return user == 'CJ' && pass == 'pass'
}