import React, {useEffect, useState} from 'react';
import './listModule.scss'
import {Link} from "react-router-dom";
import axios from "axios";
import {url} from "../../Config.jsx";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const ListModule = () => {
    const {user} = useTelegram()
    const [module, setModule] = useState(null)
    const getUserData = async () => {
        const {data} = await axios.post(`${url}/api/v1/getSuccessModule/`, {chat_id: user?.id}, {withCredentials: true});

        setModule(data)
    }

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <div className='list_module'>

            {module === null ?
                <Spin indicator={<LoadingOutlined spin />} style={{color:'rgb(253, 222, 46)'}} fullscreen size="large" />
                :
                <ul>
                    <li style={module ? {background:'rgba(55, 255, 55, 0.1)', borderRadius:'10px'} : {}}>
                        <Link to={'/module'}>
                            <div className='module'>
                                <div className='image'>
                                    <img src="/image/module_1.png" alt="Module 1"/>
                                </div>
                                <div className='description'>
                                    <h2>Модуль 1</h2>
                                    <p>Основы инвестиций</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            }


        </div>
    );
};

export default ListModule;