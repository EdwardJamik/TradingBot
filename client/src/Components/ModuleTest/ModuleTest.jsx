import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './moduletest.scss'
import lessonJson from '../../lessons.json'
import Top from "../TopElement/Top.jsx";
import {useTelegram} from "../../hooks/useTelegram.jsx";
const ModuleTest = () => {
    const contentRef = useRef(null); // Реф для доступу до елемента з контентом

    const {webApp} = useTelegram()
    const [lessonStep, setLessonStep] = useState(0)
    const { id } = useParams();

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

            p.innerHTML = newContent;
        });
    }, []);

    const successModals = () =>{
        webApp?.close()
    }

    return (
        <>
            <Top type={`Модуль 1 | ${lessonJson?.lessons[id]?.title}`} back={id > 0 ? `/module-test/${parseInt(id)-1}` : '/'}/>
            <div className='lesson_page'>
                <div className="lesson_title">
                    <div className='image'>
                        <img src="/image/module_1.png" alt="Module 1"/>
                    </div>
                    <div className='description'>
                        <h2>{lessonJson?.module_name}</h2>
                        <p>{lessonJson?.module_description}</p>
                    </div>
                </div>

                <div className="lesson_content" ref={contentRef}>
                    <div dangerouslySetInnerHTML={{__html: lessonJson?.lessons[id]?.text}}/>

                    {lessonJson?.lessons[id]?.answers?.length ?
                        <Link to={`/module-test/${id}/test`}>
                            <button>Дальше</button>
                        </Link>
                        :
                        lessonJson?.lessons[id] ?
                        <Link to={`/module-test/${parseInt(id)+1}`}>
                            <button>Дальше</button>
                        </Link>
                            :
                            <button onClick={()=>successModals()}>Дальше</button>
                    }
                </div>
            </div>
        </>
    );
};

export default ModuleTest;