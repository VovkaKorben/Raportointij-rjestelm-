import { useState, useEffect } from 'react'
import schema from '../../../shared/schema.json'
import { prettify } from '../../../shared/debug.js'
import { useParams } from 'react-router-dom';
import Button from '../components/Button.jsx'
import { BrowserRouter , Routes, Route, NavLink } from 'react-router-dom';
import api from '../helpers/api.js';
// <Button text="Data enter" ico="forms" className='smallbtn' bg='red' />
//<Button key={key} text={key} className='smallbtn' bg='red' />


const DepartmentNav = () => {
    return (
        <div className='buttons frlc'>
            {Object.entries(schema).map(([key, value]) => (
                <NavLink key={key} to={`/enter/${key}`}>
                    <Button text={value.name} className='smallbtn' bg={value.color} />
                </NavLink>
            ))}
        </div>
    );
};

function Enter() {



    const { department } = useParams();



    return (
        <div>
            <DepartmentNav current={department} />
            {
                Object.entries(schema).map(([key, value]) => (
                    <>
                        {<pre>{prettify(value, 1)}</pre>}

                    </>
                ))
            }

        </div>
    )
}

export default Enter
