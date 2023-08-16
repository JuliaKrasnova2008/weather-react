import React, { useState } from 'react'
import './ForecastReport.css'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal';

export default function ForecastReport() {
    //состояние модалки, нужно передать в пропсы для <Modal />
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <div className='forecast-report'>
                <button
                    className='forecast-report__link'
                    onClick={() => setModalIsOpen(true)}
                >Прогнозный отчет</button>
                <Link to='/detail' className='forecast-report__link'>Погода на 5 дней</Link>
            </div>
            <Modal active={modalIsOpen} setActive={setModalIsOpen} />
        </>

    )
}
