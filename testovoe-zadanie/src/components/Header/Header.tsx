'use client'

import React from 'react'
import styles from './Header.module.css'
import { useTestStore } from '@/providers/TestProvider'
import Link from 'next/link'
import { useAnswerStore } from '@/providers/AnswerProvider'
import { useParams, useRouter } from 'next/navigation'

export const Header = () => {

  const { tests } = useTestStore(state => state)
  const { answers, time, setStudent, student, clearTime, clearAnswers, testName } = useAnswerStore(state => state)

  const params = useParams<{test: string, question: string}>()
  const router = useRouter()

  const checkClick = async (id: string) => {
    if (time) {
      const result = confirm('If you rechange current test, all answers must be sended')
      if (result) {
        await fetch('http://localhost:3000/api/answerontest', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            result: {
              student: student,
              answers: answers,
              time: +time
            },
            id: params.test
          }),
          referrer: "http://localhost:3000"
        })
        setStudent('')
        clearTime()
        clearAnswers()

        router.replace(`/${id}`)
      }
    } else if(answers[0] !== undefined) {
      const result = confirm('If you rechange current test, all answers must be deleted')

      if (result) {
        setStudent('')
        clearTime()
        clearAnswers()

        router.replace(`/${id}`)
      }
    } else {
      router.replace(`/${id}`)
    }
  }

  return (
    <header className={styles.header}>
      <ul className={styles.testsUl}>
        {tests.map(test =>
          <button className={styles.button} onClick={() => checkClick(test.id)} key={test.id} >
            {test.name}
          </button>
        )}
      </ul>
      <div>
        <Link href={`/testpanel`}>Panel</Link>
      </div>
    </header>
  )
}
