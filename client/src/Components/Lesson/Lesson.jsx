import React, {useEffect, useRef, useState} from 'react';
import './lesson.scss'
import {Link, useParams} from "react-router-dom";
import Top from "../TopElement/Top.jsx";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import axios from "axios";
import {url} from "../../Config.jsx";
import lessonJson from "../../lessons.json";
import ModuleQuestion from "../ModuleQuestion/ModuleQuestion.jsx";

const Module = () => {
    const contentRef = useRef(null);

    const {user} = useTelegram()
    const [module, setModule] = useState(null)
    const [isLesson, setLesson] = useState(null)
    const [isAnswer, setAnswer] = useState(null)
    const {lesson_id} = useParams()
    const getUserData = async () => {
        const {data} = await axios.post(`${url}/api/v1/getLessonContent/`, {
            chat_id: user?.id,
            lesson_id
        }, {withCredentials: true});

        setModule(data?.module)
        setLesson(data?.lesson)
        setAnswer(data?.answer)
    }

    useEffect(() => {
        getUserData()
    }, []);

    useEffect(() => {
        const paragraphs = contentRef.current.querySelectorAll('p');

        paragraphs.forEach(p => {
            const htmlContent = p.innerHTML;
            const tagRegex = /(<[^>]+>)/g;
            const tags = [...htmlContent.matchAll(tagRegex)];
            let textContent = htmlContent.replace(tagRegex, '|||');

            const words = textContent.split(' ');

            words.forEach((word, index) => {
                if (word.length > 6) {
                    const hyphenatedWord = word.slice(0, 5) + '&shy;' + word.slice(5);
                    words[index] = hyphenatedWord;
                }
            });

            let newContent = '';
            let tagIndex = 0;

            words.forEach((word, wordIndex) => {
                let parts = word.split('|||');
                parts.forEach((part, partIndex) => {
                    newContent += part;
                    if (partIndex < parts.length - 1 && tagIndex < tags.length) {
                        newContent += tags[tagIndex][0];
                        tagIndex++;
                    }
                });

                if (wordIndex < words.length - 1) {
                    newContent += ' ';
                }
            });

            while (tagIndex < tags.length) {
                newContent += tags[tagIndex++][0];
            }

            newContent = newContent.replace(/\|{1,}/g, '');

            p.innerHTML = newContent;
        });
    }, []);



    return (
        <>
            <Top type={`Урок ${isLesson?.lesson_index}`} back={`/module/${module?._id}`}/>
            <div className='list_module item'>
                <ul>
                    <li>
                        <div className='module'
                             style={module?.color ? {background: `${module?.color}`} : {background: '#8176ff'}}>
                            <div className='module_content'>
                                <div className='description'>
                                    <h2>{isLesson?.title}</h2>
                                </div>
                                <div className='image'>
                                    <img src={`/image/${isLesson?.image}`}
                                         alt={`${isLesson?.title}`}/>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className='module_page'>
                <div className="module_content" ref={contentRef}>

                    <div dangerouslySetInnerHTML={{__html: isLesson?.content}}/>

                    {isLesson?.question ?

                        <div className='question'>
                            <div className="question_title">
                                <img src="/image/question.avif" alt="Question"/>
                                <div>
                                    <span>Проверь себя</span>
                                    <p>{isLesson?.question}</p>
                                </div>
                            </div>
                            <div className="answer_list">
                                <ModuleQuestion module_id={module?._id} lesson_id={isLesson?._id} question={isLesson?.answer} answer={isLesson?.answer_index} userAnswer={isAnswer}/>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    <Link to={`/module/${module?._id}`}>
                        <button style={{background:`${module?.color}`}}>Перейти к следующему уроку</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Module;