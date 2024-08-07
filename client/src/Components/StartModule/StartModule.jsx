import React, {useEffect, useState} from 'react';
import './start_module.scss'
import '../../Page/ListModule/listModule.scss'
import {Link, useParams} from "react-router-dom";
import Top from "../TopElement/Top.jsx";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import axios from "axios";
import {url} from "../../Config.jsx";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const lockIcon = [
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
]

const successIcon = [
    <svg fill="#028a0f" width="16" height="16" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg"
         className="cf-icon-svg">
        <path
            d="M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z"></path>
    </svg>
]

const StartModule = () => {
    const {user} = useTelegram()
    const [module, setModule] = useState(null)
    const [isLesson, setLesson] = useState(null)
    const {module_id} = useParams()

    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const displayText = isReadMore ? module?.content.slice(0, 101) : module?.content;
    const getUserData = async () => {
        const {data} = await axios.post(`${url}/api/v1/getLessonList/`, {
            chat_id: user?.id,
            module_id
        }, {withCredentials: true});

        setModule(data?.module)
        setLesson(data?.lesson)
    }

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <>
            <Top type={'Модуль'}/>

            {isLesson === null ?
                <Spin indicator={<LoadingOutlined spin/>} style={{color: '#f6f7f8'}} fullscreen
                      size="large"/>
                :
                <>
                    <div className='list_module item start'>
                        <ul>
                            <li>
                                <div className='module'
                                     style={module?.color ? {background: `${module?.color}`} : {background: '#8176ff'}}>
                                    <div className='module_content start'>
                                        <div className='image'>
                                            <img src={`/image/${module?.image}`}
                                                 alt={`${module?.title}`}/>
                                        </div>
                                        <div className='description'>
                                            <h2>{module?.title}</h2>
                                            <p style={{fontSize: '14px'}}> {displayText} {isReadMore && "..."}<span
                                                onClick={toggleReadMore} style={{opacity:'0.6', cursor: "pointer"}}>
                                                {isReadMore ? " Читать далее" : " Свернуть"}
                                            </span></p>
                                        </div>

                                        <div className="lesson_count">
                                            <p>{module?.lesson_count}</p>
                                            <span>Урока</span>
                                        </div>

                                        <Link to={`/module/${module?._id}`} className='startModuleButton'>
                                            Начать обучение
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </>
            }

        </>
    );
};

export default StartModule;