import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head'
import { Header } from '../../components/Header/index'
import  style from './style.module.scss'
import { FiRefreshCcw } from "react-icons/fi"
import { setupAPIClient } from "../../services/api"
import { useState } from 'react'

import Modal from 'react-modal'

import {ModalOrder} from '../../components/ModalOrder'

type OrderProps = {
    id: string,
    table: string | number,
    status: boolean,
    draft: boolean,
    name: string | null
}
interface HomeProps{
    orders: OrderProps[]

}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product:{
        id:string;
        name:string;
        description: string,
        price: string,
        banner: string;
    }
    order:{
        id: string,
        table: number,
        status: boolean,
        name: string | null
    }
}

export default function Dashboard ({ orders }:HomeProps) {
    
    const [orderList, setOrderList] = useState(orders || [])

    const [modalItem ,setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
        setModalVisible(false)
    }

     async function handleOpenModalView(id: string){
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/order/detail', {
            params:{
                order_id: id,
            }
        })
        
        setModalItem(response.data)
        setModalVisible(true)

    }


    
    async function handleFinishItem (id:string) {
        const apiClient = setupAPIClient()
        
        await apiClient.put('/order/finish',{
            id: id
        })
        
        const response = await apiClient.get('/order/list')
        
        setOrderList(response.data)
        setModalVisible(false)

    }
    
    async function handleRefresh() {
        const api = setupAPIClient()

        const response = await api.get('/order/list')

        setOrderList(response.data)

    }


    Modal.setAppElement('#__next')
    return(
        <>
        <Head>
            <title>Painel</title>
        </Head>
        <div>
        <Header/>

        <main className={style.container}>
            <div className={style.containerHeader}>
                <h1>Pedidos</h1>
                <button>
                <FiRefreshCcw size={25} color="#3fffa3"
                onClick={handleRefresh}
                />
                
                </button>
            </div>

            <article className={style.listOrder}>
                
            {orderList.length == 0 && (
                <span className={style.empty}>
                    Nenhum item encontrado...
                </span>
            )}

            {orderList.map( item => (
               <section className={style.orderItem} key={item.id}>
                    <button onClick={() => handleOpenModalView(item.id)}>
                        <div className={style.tag}></div>
                        <span className={style.table} >Mesa {item.table}</span>
                    </button > 
                </section>

                    
                ))}
                
               
                
              
                
                

            </article>
        </main>

                { modalVisible && (<ModalOrder
                isOpen={modalVisible}
                onRequestClose={handleCloseModal}
                order={modalItem}
                handleFinishOrder={ handleFinishItem }
                />)}


        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/order/list')

    
    return{
        props:{
            orders: response.data
        }
    }
})