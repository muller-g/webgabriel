'use client';
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import styles from './page.module.css';
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  
  function login(){
    setLoading(true)
    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: '/dashboard'
    })
  }

  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <div className={styles.login_title}>
          <h1><span>Webgabriel.com.br</span></h1>
        </div>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <FaUser color="#fff"/>
          </InputLeftElement>
          <Input style={{paddingLeft: '35px', color: "#fff"}} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <FaLock color="#fff" />
          </InputLeftElement>
          <Input style={{paddingLeft: '35px', color: "#fff"}} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Senha' />
        </InputGroup>
        <Button
          isLoading={loading}
          loadingText='Entrando'
          colorScheme='teal'
          variant='solid'
          onClick={login}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
