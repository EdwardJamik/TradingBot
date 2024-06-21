import React, {useEffect, useState} from 'react';
import './profile.scss'
import {Avatar, Skeleton} from "antd";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import axios from "axios";
import {url} from "../../Config.jsx";

const score = [
    <svg viewBox="0 0 24 24" width='28' height='28' fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="1"
              d="M19 5L19.9486 5.31621C20.9387 5.64623 21.4337 5.81124 21.7168 6.20408C22 6.59692 22 7.11873 21.9999 8.16234L21.9999 8.23487C21.9999 9.09561 21.9999 9.52598 21.7927 9.87809C21.5855 10.2302 21.2093 10.4392 20.4569 10.8572L17.5 12.5"
              stroke="#fdde2e" strokeWidth="1.5"></path>
        <path opacity="1"
              d="M4.99994 5L4.05132 5.31621C3.06126 5.64623 2.56623 5.81124 2.2831 6.20408C1.99996 6.59692 1.99997 7.11873 2 8.16234L2 8.23487C2.00003 9.09561 2.00004 9.52598 2.20723 9.87809C2.41441 10.2302 2.79063 10.4392 3.54305 10.8572L6.49994 12.5"
              stroke="#fdde2e" strokeWidth="1.5"></path>
        <path
            d="M12.0002 16C6.24021 16 5.21983 10.2595 5.03907 5.70647C4.98879 4.43998 4.96365 3.80673 5.43937 3.22083C5.91508 2.63494 6.48445 2.53887 7.62318 2.34674C8.74724 2.15709 10.2166 2 12.0002 2C13.7837 2 15.2531 2.15709 16.3771 2.34674C17.5159 2.53887 18.0852 2.63494 18.5609 3.22083C19.0367 3.80673 19.0115 4.43998 18.9612 5.70647C18.7805 10.2595 17.7601 16 12.0002 16Z"
            stroke="#fdde2e" strokeWidth="1.5"></path>
        <path opacity=".8" d="M12 17V19" stroke="#fdde2e" strokeWidth="1.5" strokeLinecap="round"></path>
        <path
            d="M15.5 22H8.5L8.83922 20.3039C8.93271 19.8365 9.34312 19.5 9.8198 19.5H14.1802C14.6569 19.5 15.0673 19.8365 15.1608 20.3039L15.5 22Z"
            stroke="#fdde2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path opacity="1" d="M18 22H6" stroke="#fdde2e" strokeWidth="1.5" strokeLinecap="round"></path>
    </svg>
]

const Profile = () => {

    const {webApp,user} = useTelegram()
    const [isUser, setUserImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const getUserData = async () => {
        const {data} = await axios.post(`${url}/api/v1/getUserData/`, {chat_id: user?.id}, {withCredentials: true});
        setUserImage(data)
        setLoading(false)
    }

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <>
            <div className='container profile'>
                <div className="profile_description">
                    <div className="profile_photo">

                        {loading ? (
                            <Skeleton.Avatar loading={loading} active size={140} />
                        ) : (
                            isUser?.photo ?
                                <img src={`data:image/png;base64,${isUser?.photo}`} alt="User photo"/>
                                :
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=42" size={140}/>

                        )
                        }
                    </div>
                    <div className='profile_option'>
                    <h3 className='fullname'>{isUser?.fullName}</h3>
                        <span>+380631913251</span>
                    </div>
                </div>

                <div className="profile_score">
                    <span className='score'>{score} {(1000).toLocaleString('uk-UA', {
                        useGrouping: true
                    })}</span>

                </div>

                <div className="profile_level">
                    <div className='score'>
                        <span>Beginner</span>
                    </div>
                    <div className='level'>
                        <div className='block_level'>
                            <span className='active'></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div className="profile_achievements">
                    <span className='title'>Достижения</span>
                    <ul className='achiv_list'>
                        <li className='active'>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_1.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Мастерство управления рисками</span>
                            </div>
                        </li>
                        <li className='active'>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Собственная торговая стратегия</span>
                            </div>
                        </li>
                        <li className='active'>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_3.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Стабильная прибыльность</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Выигрыш в соревновании</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Нанят в качестве младшего трейдера</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Удвоение счета за год</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Снижение эмоциональных сделок</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Бэктестинг алгоритмов</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Прибыльный торговый журнал</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Диверсификация активов</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Наставничество трейдеров</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Публикация анализа</span>
                            </div>
                        </li>
                        <li>
                            <div className='image'>
                                <span>?</span>
                                <img src="/image/ach_2.png" alt="achievement 1"/>
                            </div>
                            <div className='description'>
                                <span>Высокий ROI в симуляциях</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Profile;