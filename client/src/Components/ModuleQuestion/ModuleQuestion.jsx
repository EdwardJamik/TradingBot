import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './modulequestion.scss'
import Top from "../TopElement/Top.jsx";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import axios from "axios";
import {url} from "../../Config.jsx";
const ModuleQuestion = ({module_id,lesson_id,question,answer, userAnswer}) => {

    const {webApp, user} = useTelegram()
    const [isAnswer, setAnswer] = useState(null)

    const successModals = async () => {
        const {data} = await axios.post(`${url}/api/v1/setAnswer/`, {
            chat_id: user?.id,
            module_id,
            lesson_id,
            answer: isAnswer
        }, {withCredentials: true});

        if(data === 'reg')
            webApp?.close()
    }

    useEffect(() => {
        if(isAnswer !== null && isAnswer !== userAnswer)
            successModals()
        else if(userAnswer)
            setAnswer(userAnswer)
    }, [isAnswer]);

    return (
        <>
            {question ?
                question.map((item, index) => (
                        <button
                            style={isAnswer !== null ? parseInt(index) === parseInt(answer) ? {background: 'rgba(55, 255, 55, .2)'} : {background: 'rgba(255, 55, 55, .2)'} : {}}
                            onClick={() => setAnswer(index)} className='answer'>
                            {item}
                        </button>
                ))
                :
                <></>
            }
        </>
    );
};

export default ModuleQuestion;