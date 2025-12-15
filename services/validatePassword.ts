import bcrypt from 'bcrypt';

export default async function ValidatePassword(textPassword: string, hashPassword: string) {

    const res = await bcrypt.compare(textPassword, hashPassword);
    
    console.log(`BCRYPT: ${res}`)

    return res;
}