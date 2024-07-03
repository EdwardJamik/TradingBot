import React from 'react';
import './top.scss'
import {Link} from "react-router-dom";

const backButtonIcon = [
    <svg fill="#000" stroke='#eee' strokeWidth='0.12' width='32' height='32' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"></rect>
        <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></path>
    </svg>
]

const Top = ({type, back, fSize}) => {


    return (
        <div className='top'>
            {back ?
                <Link to={back} className='back_button'>
                    {backButtonIcon}
                </Link>
                :
                <></>
            }


            <span className='breadcrumbs'>{type}</span>
        </div>
    );
};

export default Top;