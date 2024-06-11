'use client'

import React from 'react'
import styles from './DeepAnswer.module.css'
import { useAnswerStore } from '@/providers/AnswerProvider'
import { useTestStore } from '@/providers/TestProvider'

export const DeepAnswer = ({ currentQuestion, currentTest }: { currentQuestion: string, currentTest: string }) => {

    const { setTargetAnswer, addAnswer, answers } = useAnswerStore(state => state)
    const { tests } = useTestStore(state => state)

    const test = tests.find(el => el.id === currentTest)
    const question = test?.questions.find(el => el.id === currentQuestion)

    const isInAnswers = (id: string) => {
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].id === id) {
                return true
                }
            }
        return false
    }

    const writeAnswer = (answer: string, id: string) => {

        const obj = {
            id: id,
            answer: answer,
            question: question?.question!
        }


        if (isInAnswers(id)) {
            setTargetAnswer(obj , id)
        } else {
            addAnswer(obj)
        }
    }

  return (
    <>
        <p>Write deep answer</p>
        <textarea placeholder='answer' className={styles.textarea} value={answers.find(el => question?.answers![0].id! === el.id)?.answer} onChange={e => writeAnswer(e.target.value, question?.answers![0].id!)} />
    </>
  )
}
