'use client'

import React from 'react'
import styles from './OneAnswer.module.css'
import { useAnswerStore } from '@/providers/AnswerProvider'
import { useTestStore } from '@/providers/TestProvider'

export const OneAnswer = ({ currentQuestion, currentTest }: { currentQuestion: string, currentTest: string }) => {

    const { deleteTargetAnswer, addAnswer, answers } = useAnswerStore(state => state)
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

    const selectAnswer = (answer: string, id: string) => {
        const obj = {
            id: id,
            answer: answer,
            question: question?.question!
        }


        if (!isInAnswers(id)) {
            question?.answers!.forEach(answer => {
                deleteTargetAnswer(answer.id)
            })
            addAnswer(obj)
        }
    }

  return (
    <>
        <p>Choose one</p>
        <ul className={styles.answersUl}>
            {question?.answers?.map(answer =>
                <p className={styles.answer} onClick={() => selectAnswer(answer.answer, answer.id)} key={answer.id}>
                    <div className={`${styles.check} ${isInAnswers(answer.id) && styles.select}`} />
                    {answer.answer}
                </p>
            )}
        </ul>
    </>
  )
}
