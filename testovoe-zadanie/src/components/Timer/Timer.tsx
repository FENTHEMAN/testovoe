'use client'

import { useAnswerStore } from '@/providers/AnswerProvider'
import { useTestStore } from '@/providers/TestProvider'
import React, { useEffect, useState } from 'react'
import styles from './Timer.module.css'

export const Timer = ({ testId, setIsEnd }: { testId: string, setIsEnd: (bool: boolean) => void }) => {

    const [isStart, setIsStart] = useState<boolean>(false)

    const { time, incrementTime, clearTime } = useAnswerStore(state => state)

    const { tests } = useTestStore(state => state)
    const currentTest = tests.find(test => test.id === testId)


    useEffect(() => {
        if (!isStart) {         
            const timerInterval = setInterval(() => {                       
                incrementTime();
            }, 1000);
            setIsStart(true);

            return () => {
                clearInterval(timerInterval)
                clearTime()
            };
        }
    }, [incrementTime])

    useEffect(() => {
        if (time! >= currentTest?.time!) {
            clearTime()
            setIsEnd(true)
        }
    }, [time])


    const currentTime = currentTest?.time! - time!

    const minutes = Math.floor(currentTime! / 60);
    const seconds = currentTime! % 60;



  return (
    <h1 className={styles.timerH1}>Timer: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
  )
}
