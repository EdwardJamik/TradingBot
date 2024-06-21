import React, {useEffect, useRef} from 'react';

import Top from "../../Components/TopElement/Top.jsx";
const Registration = () => {
    const contentRef = useRef(null);

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
    return (
        <>
            <Top type={`Завершение`} />
            <div className='question_page'>
                <div className="question_title">
                    <div className='image'>
                        <span>✓</span>
                    </div>
                    <div className='description'>
                        <h2>Поздравляем с завершением курса!</h2>
                    </div>
                </div>

                <div className="question_content" ref={contentRef}>
                    <p>Поздравляем с завершением курса!<br/>Вы узнали много нового об инвестициях и готовы сделать
                        следующий шаг. Для того чтобы наши специалисты могли помочь вам с персональным сопровождением и
                        консультациями, пожалуйста, оставьте свои контактные данные. Наш менеджер свяжется с вами для
                        дальнейших шагов.</p>
                </div>

                <div>
                    Пожалуйста, укажите ваше ФИО
                    <input type="text"/>
                </div>
                <div>
                    <button>Поделитесь номером телефона</button>
                </div>
            </div>
        </>
    );
};

export default Registration;