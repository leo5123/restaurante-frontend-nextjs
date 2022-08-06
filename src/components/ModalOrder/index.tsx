import Modal from 'react-modal'
import style from './style.module.scss'

import { FiX } from 'react-icons/fi'

import { OrderItemProps } from '../../pages/dashboard/index' 
import { toToastItem } from 'react-toastify/dist/utils';
import { setupAPIClient } from '../../services/api';


interface ModelOrderProps{
    isOpen: boolean,
    onRequestClose: () => void;
    order: OrderItemProps[]
    handleFinishOrder: (id: string) => void 
}



export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder }: ModelOrderProps) {
    
    const customStyles = {
        content:{
            top: '35%',
            bottom: 'auto',
            left: '33%',
            right: 'auto',
            padding: '30px',
            margin: '0px',
            
            backgroundColor: '#1d1d2e',
            transform: 'translate (-50%, -50%)'
        }
    }
    
    

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        
        >

        <button
        type='button'
        onClick={onRequestClose}
        className={style.button}
        style={{ background: `transparent`, border:0}}>
        <FiX size={45} color='#f34748'/>
        </button>
         
        <div className={style.container}>
        <h2>Detalhes do pedido</h2>
        <span className={style.table}>
            <span>Mesa:<strong> {order[0].order.table}</strong></span>
        </span>

        {order.map(item => (
            <section key={item.id} className={style.containerItem}>
                <span className={style.amount}>{item.amount} - <strong>{item.product.name} </strong></span>
                <span className={style.description}>{item.product.description}</span>
            </section>
        ))}

            <button className={style.buttonOrder}
            onClick={ () => handleFinishOrder(order[0].order_id) }>
                Concluir pedido
            </button>
      </div>
        </Modal>
    )
}