import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './modulequestion.scss'
import lessonJson from '../../lessons.json'
import Top from "../TopElement/Top.jsx";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import axios from "axios";
import {url} from "../../Config.jsx";
const ModuleQuestion = () => {
    const contentRef = useRef(null);

    const {webApp,user} = useTelegram()
    const [isAnswer, setAnswer] = useState(null)
    const { id } = useParams();

    const successModals = async () => {
        await axios.post(`${url}/api/v1/getRegUser/`, {chat_id: user?.id, first_name:user?.first_name, username:user?.username}, {withCredentials: true});
        webApp?.close()
    }

    return (
        <>
            <Top type={`Модуль 1 | ${lessonJson?.lessons[id]?.title}`} back={id > 0 ? `/module-test/${parseInt(id)-1}` : '/'}/>
            <div className='question_page'>
                <div className="question_title">
                    <div className='image'>
                        <span>?</span>
                    </div>
                    <div className='description'>
                        <h2>Вопрос</h2>
                        <p>{lessonJson?.lessons[id]?.question}</p>
                    </div>
                </div>

                <div className="question_content" ref={contentRef}>

                    {lessonJson?.lessons[id]?.answers ?
                        lessonJson?.lessons[id]?.answers.map((item,index) => (
                            <button style={isAnswer !== null ? lessonJson?.lessons[id]?.answers[index]?.type ? {background: 'rgba(55, 255, 55, .2)'} : {background:'rgba(255, 55, 55, .2)'} : {}} onClick={()=>setAnswer(index)} className='answer'>{item?.answer}</button>
                        ))
                        :
                        <></>
                    }

                    {isAnswer !== null ?
                        lessonJson?.lessons[parseInt(id) + 1] ?
                            <Link to={`/module-test/${parseInt(id) + 1}`}>
                                <button disabled={isAnswer === null}
                                        className={isAnswer !== null ? 'next_lesson' : 'wait_answer'}>Дальше
                                </button>
                            </Link>
                            :
                            <button className={isAnswer !== null ? 'next_lesson' : 'wait_answer'}
                                    disabled={isAnswer === null} onClick={() => successModals()}>Дальше</button>
                        :
                        lessonJson?.lessons[id + 1] !== undefined ?
                            <Link to={`/module-test/${parseInt(id) + 1}`}>
                                <button disabled={isAnswer === null}
                                        className={isAnswer !== null ? 'next_lesson' : 'wait_answer'}>Дальше
                                </button>
                            </Link>
                            :
                            <button className={isAnswer !== null ? 'next_lesson' : 'wait_answer'}
                                    disabled={isAnswer === null} onClick={() => successModals()}>Дальше</button>
                    }
                </div>

            </div>
        </>
    );
};

export default ModuleQuestion;