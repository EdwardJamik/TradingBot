import React, {useEffect, useState} from 'react';
import './listModule.scss'
import {Link} from "react-router-dom";
import axios from "axios";
import {url} from "../../Config.jsx";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const lockIcon = [
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
]

const ListModule = () => {
    const {user} = useTelegram()
    const [module, setModule] = useState(null)
    const getUserData = async () => {
        const {data} = await axios.post(`${url}/api/v1/getModuleList/`, {chat_id: user?.id}, {withCredentials: true});

        setModule(data)
    }

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <div className='list_module'>

            {module === null ?
                <Spin indicator={<LoadingOutlined spin/>} style={{color: '#f6f7f8'}} fullscreen size="large"/>
                :
                <ul>
                    {module?.map((currentModule,index)=>
                            <li key={`module_${index}`} style={currentModule?.open ? {opacity:1} : {opacity:0.6}}>
                                <Link to={currentModule?.open ? `/module/${currentModule?._id}` : ''} >
                                    <div className='module' style={currentModule?.color ? {background: `${currentModule?.color}`} : {background: '#8176ff'}}>
                                        <div className='module_content'>
                                            <div className='description'>
                                                <h2>{currentModule?.title}</h2>
                                            </div>
                                            <div className='image'>
                                                <img src={`/image/${currentModule?.image}`} alt={`${currentModule?.title}`}/>
                                            </div>
                                        </div>
                                        <div className='module_bottom'>
                                            <span>{currentModule?.lesson_count} урока</span>
                                            {currentModule?.open ?  <></> : <span>{lockIcon}</span>}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            }


        </div>
    );
};

export default ListModule;