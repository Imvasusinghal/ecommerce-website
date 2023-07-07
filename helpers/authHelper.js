import bcrypt, { compare } from 'bcrypt';

export const hashPassword= async(password) => {
    try{
        const saltRounds= 10;                   //HOW MANY TIMES OF ENCRYPITON TO DO
        const hashedPassword = await bcrypt.hash(password, saltRounds);     //SENDING THE PASSWORD AND ROUNDS AND STORING ENCRYPTED PASSWORD IN IT
        return hashedPassword;
    } catch(error) {
        console.log(error);
    }
};

export const comparePassword= async(password, hashedPassword) => {
    return bcrypt,compare(password, hashedPassword);
};