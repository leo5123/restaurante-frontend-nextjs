import { FormEvent, useState } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import style from './style.module.scss'

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Category(){
    
    

    const [name, setName] = useState('')

    async function createCategory(e: FormEvent) {
        e.preventDefault()
        
        if(name == ''){
            toast.info('Insira um nome para a categoria')
            return
        }
        
       const api = setupAPIClient()

       try{
           
           await api.post('/category', {
            name: name
           })
           
           toast.success('Categoria criada com sucesso')
       }catch(err){
           toast.error('Erro ao criar a categoria')

       }

    }

    return(
        <>
        <Head><title>Crie uma categoria</title>
        </Head>
        <div>
        <Header/>
        <main className={style.container}>
            <h1>Cadastrar categoria</h1>
            
            <form onSubmit={createCategory} className={style.form}>
                
                <input type="text" 
                placeholder="Digite o nome da categoria" 
                className="input"
                value={name}
                onChange={(e) => {setName(e.target.value)}}/>
                
                <button type="submit">Cadastrar</button>
            </form>
        </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async () => {
    return{
        props:{}
    }
})