import { useContext, FormEvent, useState } from 'react'
import type { NextPage } from 'next'

import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Home.module.scss'

import { AuthContext } from '../contexts/AuthContext'

function Home (){
  
  const { signIn } = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    
    
    event.preventDefault();
    if(email === '' || password === ''){
      alert('Preencha os dados')
      return
    }

    setLoading(true);

    let data = {
      email,
      password
      }
    
    await signIn(data)

    setLoading(false)

  }


  return (
    <>
    <Head>
    <title>
    Faça seu login
    </title>
    </Head>
    <div className={styles.containerCenter}>
    
    <div className={styles.login}>
      <a className={styles.titleLogin}> Login: </a>
    <form onSubmit={handleLogin}>
      <Input 
      placeholder='Digite seu email' 
      type='text'
      value={email} 
      onChange={  (e) => setEmail(e.target.value)  }
      />

      <Input placeholder='Digite sua senha' type='password'
      value={password} onChange={  (e) => setPassword(e.target.value)  }
      />
      
      <Button
      type='submit' loading={loading} 
      >
        Acessar
      </Button>
    
      </form>

    <Link href='/signup'>
    <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
    </Link>
    </div>
    </div>
    

    
    </>  
  )
}

export default Home
