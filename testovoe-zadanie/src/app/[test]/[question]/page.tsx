'use client'

import { Timer } from '@/components/Timer/Timer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { AnswerProgressBar } from '@/components/AnswerProgressBar/AnswerProgressBar'
import { QuestionBody } from '@/components/QuestionBody/QuestionBody'
import { useTestStore } from '@/providers/TestProvider'
import { useAnswerStore } from '@/providers/AnswerProvider'
 
export default function Page({ params }: { params: { test: string, question: string } }) {
    
    const [isEnd, setIsEnd] = useState(false)
    const { tests } = useTestStore(state => state)
    const { student, answers, time, setStudent, clearTime, clearAnswers } = useAnswerStore(state => state)
    const router = useRouter()
    const test = tests.find(el => el.id === params.test)

    useEffect(() => {
        if(isEnd) {
            const sendResults = async () => {
                await fetch('http://localhost:3000/api/answerontest', {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      result: {
                        student: student,
                        answers: answers,
                        time: +time!
                      },
                      id: params.test
                    }),
                    referrer: "http://localhost:3000"
                  })
                setStudent('')
                clearTime()
                clearAnswers()
                router.replace(`/${params.test}/results`)
            }
            sendResults()
        }
    }, [isEnd])



    return (
        <main className={styles.main}>
            {test?.time !== 0 && <Timer testId={params.test} setIsEnd={setIsEnd} />}
            <AnswerProgressBar setIsEnd={setIsEnd} currentQuestion={params.question} currentTest={params.test} />
            <QuestionBody currentQuestion={params.question} currentTest={params.test} />
        </main>
    )
}