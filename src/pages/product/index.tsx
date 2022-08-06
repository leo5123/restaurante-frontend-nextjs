import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import style from './style.module.scss'
import { Header } from "../../components/Header"
import { FiUpload } from "react-icons/fi"
import { ChangeEvent, FormEvent, useState } from "react"
import { setupAPIClient } from "../../services/api"

import { toast } from "react-toastify"


type ItemProps = {
    id: string;
    name: string
}

interface CategoryProps{
    categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {
    
    

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [id_category, setId_category] = useState(0)
    const [description, setDescription] = useState('')

    // image preview

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return
        }
        const image = e.target.files[0]

        if(!image){
            return
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(imageAvatar)
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(image))
        }

        
    }

// form
    async function addProduct(e: FormEvent) {
       e.preventDefault()
       
       
       
        
    try {
        const data = new FormData();
        
        if(name === '' || price === '' || description === '' || imageAvatar === null){
            toast.error('Preencha todos os campos')
            return 
        }
        
        
        data.append('name', name);
        data.append('price', price);
        data.append('description', description);
        data.append('id_category', categories[categorySelected].id);
        data.append('file', imageAvatar);

        console.log(data)

        const apiClient = setupAPIClient();

        await apiClient.post('/createproduct', data)

        toast.success('Produto criado')
    } catch (error) {
        toast.error('Erro')
    }

    setName('')
    setPrice('')
    setDescription('')
    setImageAvatar(null)
    setAvatarUrl('')
        
    }
// change category name on select 
    function handleChangeCategory(e){
        setCategorySelected(e.target.value)
        setId_category(categorySelected)
    }

    return(
        <>
        <Head>
            <title>Crie um produto</title>
        </Head>
        <div>
        <Header></Header>
        <main className={style.container}>
            <h1>Novo produto</h1>

        <form onSubmit={addProduct} 
        className={style.form}>
           
           <label className={style.labelAvatar}>
           
            <span><FiUpload size={25} color='#FFF'></FiUpload></span>
           
            <input type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
           
            {avatarUrl && (
                <img 
                className={style.preview}
                src={avatarUrl}
                 alt="Foto do produto"
                 width={250}
                 height={250} 
                 />
            )}

           </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
                {categories.map((item, index) => {
                    return(
                        <option key={item.id} value={index}>
                            {item.name}
                        </option>
                    )
                })}
                </select>
                
                <input type="text" 
                className={style.input}
                placeholder="Digite o nome do produto"
                value={name}
                onChange={(e) => {setName(e.target.value)}}/>
                
                <input type="text" 
                className={style.input}
                placeholder="Digite o preço do produto" 
                value={price}
                onChange={(e) => {setPrice(e.target.value)}}
                />

                <textarea placeholder="Descreva seu produto"
                className={style.input}
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
                >

                </textarea>

                <button className={style.buttonAdd}
                 type='submit'>
                    Cadastrar</button>

            </form>            

           </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/categorylist')


    
    return{
        props:{
            categoryList: response.data
        }
    }
})