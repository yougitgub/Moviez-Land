import bcrypt from "bcryptjs";
export async function passwordHashing(password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

export async function passwordCompare(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}
