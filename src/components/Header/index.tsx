import style from './style.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

export function Header() {

    const { signOut } = useContext(AuthContext)

    return(
        <header className={style.headerContainer}>
           
            <div className={style.headerContent}>
            <Link href='/dashboard'>
                <a className={style.logo} style={{color:'var(--red-900)', fontSize:'35px'}}>Logo</a>
            </Link>
            
            <nav className={style.menuNav}>
            <Link href='/category'>
                    <a>Categoria</a>
                </Link>

                <Link href='/product'>
                    <a>Cardápio</a>
                </Link>

                <button>
                    <FiLogOut color='#FFF' size={24} onClick={signOut}></FiLogOut>
                </button>
            </nav>
            </div>
        </header>
    )
}