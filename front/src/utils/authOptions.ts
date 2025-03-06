import useApi from "@/app/api/hook/axiosRequest"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null

                const response: any = await useApi.axiosRequest('POST', '/auth/login', {
                    email: credentials.email,
                    password: credentials.password
                })

                if (!response.response) return null

                const user = response.response.data.user
                const token = response.response.data.token

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    accessToken: token
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, token }: any) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.accessToken = token.accessToken
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}