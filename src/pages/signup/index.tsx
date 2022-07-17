import type { NextPage } from 'next'

import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

import Head from 'next/head'
import Link from 'next/link'

import styles from '../../../styles/Home.module.scss'

const Signup: NextPage = () => {
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
    <form action="">
      <Input placeholder='Digite seu nome' type='text'/>
      
      <Input placeholder='Digite seu email' type='text'/>

      <Input placeholder='Digite sua senha' type='password'/>
      
      <Button
      type='submit' loading={false} 
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
