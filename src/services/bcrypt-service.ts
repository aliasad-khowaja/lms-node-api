import * as bcrypt from 'bcrypt';

export let getEncryptedPassword = async (password: string) : Promise<string> => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

export let verifyEncryptedPassword = async (password : string, encryptedPassword: string) : Promise<boolean> => {
    const isValidPass = await bcrypt.compare(password, encryptedPassword);
    return isValidPass;
}