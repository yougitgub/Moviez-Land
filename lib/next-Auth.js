import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from 'next-auth/providers/github'
import { passwordCompare } from "@/utils/bcrypt"
import User from "@/models/User"
import { dbConnect } from "@/lib/mongodb"

class CustomAuthError extends CredentialsSignin {
    constructor(message) {
        super(message);
        this.code = message;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    throw new CustomAuthError("Email and password are required.")
                }

                await dbConnect();
                const user = await User.findOne({ email: credentials.email })

                if (!user) {
                    throw new CustomAuthError("Email not found")
                }

                const isPasswordMatch = await passwordCompare(credentials.password, user.password)

                if (!isPasswordMatch) {
                    throw new CustomAuthError("Incorrect password")
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    favorites: user.favorites ? JSON.parse(JSON.stringify(user.favorites)) : [],
                    profileImg: user.profileImg
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.favorites = user.favorites;
                token.profileImg = user.profileImg;
            }
            if (trigger === "update" && session) {
                if (session.name) token.name = session.name;
                if (session.email) token.email = session.email;
                if (session.profileImg) token.profileImg = session.profileImg;
                if (session.favorites) token.favorites = session.favorites;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.favorites = token.favorites;
                session.user.profileImg = token.profileImg;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET,
})
