import { useState } from 'react'
import '../assets/css/Button.css'



function Button({ text, ico = null, onClick }) {


    return (
        <button className='frcc'>
            {ico && <img src={`/images/${ico}.svg`} alt="" />}
            {text}
        </button>
    )
}

export default Button
