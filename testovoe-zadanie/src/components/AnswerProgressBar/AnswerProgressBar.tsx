'use client'

import { useAnswerStore } from '@/providers/AnswerProvider'
import { useTestStore } from '@/providers/TestProvider'
import React from 'react'
import styles from './AnswerProgressBar.module.css'
import Link from 'next/link'

export const AnswerProgressBar = ({ currentTest, currentQuestion, setIsEnd }: { currentTest: string, currentQuestion: string, setIsEnd: (bool: boolean) => void }) => {

  const { tests } = useTestStore(state => state)
  const { answers } = useAnswerStore(state => state)
  
  const test = tests.find(el => el.id === currentTest)

  const isFilled = (id: string) => {
    const question = test?.questions.find(el => el.id === id)
    for(let i = 0; i < test?.questions.length!; i++) {
      for (let n = 0; n < answers.length; n++) {
        {/* @ts-ignore */} 
        if (question?.answers[0].id === answers[n].id) {
          return true
        }
        {/* @ts-ignore */} 
        if (question?.answers[i] !== undefined && question?.answers[i].id === answers[n].id) {
          return true
        }
      }
    }
    return false
  }

  const nextQuestion = () => {
    if (test?.questions.map(el => el.id).indexOf(currentQuestion) === test?.questions.length! - 1) {
      return test?.questions[0].id
    } else {
      return test?.questions[test?.questions.map(el => el.id).indexOf(currentQuestion) + 1].id
    }
  }
  const backQuestion = () => {
    if (test?.questions.map(el => el.id).indexOf(currentQuestion) === 0) {
      return test?.questions[test?.questions.length - 1].id
    } else {
      return test?.questions[test?.questions.map(el => el.id).indexOf(currentQuestion) - 1].id
    }
  }

  return (
    <>
      <ul className={styles.answerBar}>
        {test?.questions.map(question =>
          <Link key={question.id} className={`${styles.link} ${isFilled(question.id) && styles.filled}`} href={`/${test.id}/${question.id}`}></Link>
        )}
      </ul>
      <Link className={styles.button} href={`/${currentTest}/${nextQuestion()}`}>Next question</Link>
      <Link className={styles.button} href={`/${currentTest}/${backQuestion()}`}>Back question</Link>
      <button className={styles.button} onClick={() => setIsEnd(true)}>Go to results</button>
    </>
  )
}
