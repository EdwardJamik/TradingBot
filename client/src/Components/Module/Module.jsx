import React, {useEffect, useRef} from 'react';
import './module.scss'
import {Link} from "react-router-dom";

const Module = () => {
    const contentRef = useRef(null); // Реф для доступу до елемента з контентом

    useEffect(() => {
        const paragraphs = contentRef.current.querySelectorAll('p');

        paragraphs.forEach(p => {
            const htmlContent = p.innerHTML;
            const tagRegex = /(<[^>]+>)/g; // Регулярний вираз для пошуку тегів
            const tags = [...htmlContent.matchAll(tagRegex)]; // Масив знайдених тегів з їх позиціями
            let textContent = htmlContent.replace(tagRegex, '|||'); // Заміна тегів на роздільник

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
        <div className='module_page'>
            <div className="module_title">
                <div className='image'>
                    <img src="/image/module_1.png" alt="Module 1"/>
                </div>
                <div className='description'>
                    <h2>Модуль 1</h2>
                    <p>Основы инвестиций</p>
                </div>
            </div>

            <div className="module_content" ref={contentRef}>
                <p>
                    <b>Цель курса:</b> Данный курс предназначен для начинающих инвесторов. Вы узнаете основные понятия и
                    принципы
                    инвестирования, научитесь анализировать акции и управлять рисками, а также освоите различные
                    стратегии
                    инвестирования.
                    </p>
                <p><b>Структура курса:</b> Курс состоит из 5 модулей, каждый из которых включает несколько уроков и тесты
                    для проверки знаний. В конце курса вы получите возможность записаться на индивидуальные консультации с
                    профессиональным наставником.
                </p>

                <Link to={'/module-test/0'}>
                    <button>Перейти к изучению</button>
                </Link>
            </div>

        </div>
    );
};

export default Module;