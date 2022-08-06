import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

import Head from 'next/head'
import Link from 'next/link'

import styles from '../../../styles/Home.module.scss'
import { toast } from 'react-toastify'

import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { canSSRGuest } from '../../utils/canSSRGuest'



const Signup: NextPage = () => {

  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: FormEvent){
    e.preventDefault()
    
    if(email === '' || password === '' || name === ''){
      toast.info('Dados necessários')
      return
    }

    setLoading(true)
    
    
    const data = {
      name,
      email,
      password
    }
  
  await signUp(data)  

  setLoading(false)
  
  }
  
  

  return (
    <>
    <div className={styles.containerCenter}>
    <Head>
    <title>
    Faça seu cadastro
    </title>
    </Head>
    
    <div className={styles.login}>
      <a className={styles.titleLogin}> Cadastro: </a>
    <form onSubmit={handleSignup}>
      <Input placeholder='Digite seu nome' type='text'
      value={name}
      onChange={ (e) => setName(e.target.value)}
      />
      
      <Input placeholder='Digite seu email' type='text'
      value={email}
      onChange={ (e) => setEmail(e.target.value)}
      />

      <Input placeholder='Digite sua senha' type='password'
      value={password}
      onChange={ (e) => setPassword(e.target.value)}
      />
      
      <Button
      type='submit' loading={loading} 
      >
        Acessar
      </Button>
    
      </form>

    <Link href='/'>
    <a className={styles.text}>Já possui uma conta? Faça login</a>
    </Link>
    </div>
    </div>
    

    
    </>  
  )
}

export default Signup

export const getServerSideProps = canSSRGuest(async () => {
    return{
      props:{}
    }
})