import React, { useEffect } from 'react'
import styles from './QuestionBody.module.css'
import { useTestStore } from '@/providers/TestProvider'
import { SeveralAnswers } from '../SeveralAnswers/SeveralAnswers'
import { OneAnswer } from '../OneAnswer/OneAnswer'
import { ShortAnswer } from '../ShortAnswer/ShortAnswer'
import { DeepAnswer } from '../DeepAnswer/DeepAnswer'

export const QuestionBody = ({ currentTest, currentQuestion }: { currentTest: string, currentQuestion: string }) => {
    
    const { tests } = useTestStore(state => state)

    const test = tests.find(el => el.id === currentTest)
    const question = test?.questions.find(el => el.id === currentQuestion)

    return (
        <article className={styles.questionBody}>
            <h1 className={styles.question}>{question?.question}</h1>
            {question?.type === 'one-answer'
            && <OneAnswer currentQuestion={currentQuestion} currentTest={currentTest} />}
            {question?.type === 'several-answers'
            && <SeveralAnswers currentQuestion={currentQuestion} currentTest={currentTest} />}
            {question?.type === 'deep-answer'
            && <DeepAnswer currentQuestion={currentQuestion} currentTest={currentTest} />}
            {question?.type === 'short-answer'
            && <ShortAnswer currentQuestion={currentQuestion} currentTest={currentTest} />}
        </article>
    )
}
