import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
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
            if(!credentials){
                return null
            }

            if(credentials.email === 'admin@mail.com' && credentials.password === 'admin'){
                return {
                    id: '1',
                    name: 'Admin',
                    email: 'admin@mail.com'
                }
            }

            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }