'use client'

import { useTestStore } from '@/providers/TestProvider'
import styles from './page.module.css'
import { useAnswerStore } from '@/providers/AnswerProvider'
import Link from 'next/link'

export default function Page({ params }: { params: { test: string } }) {

    const { tests } = useTestStore(state => state)
    const { student, setStudent } = useAnswerStore(state => state)

    const curentTest = tests.find(test => test.id === params.test)

    return (
        <main className={styles.main}>
            <h1 className={styles.testH1}>{curentTest?.name}</h1>
            {curentTest?.time !== 0 && <p>Time for test's running: {curentTest?.time! / 60} minute</p>}
            <p>Your name:</p>
            <input placeholder='name' className={styles.input} type="text" value={student} onChange={e => setStudent(e.target.value)} />
            <p>By clicking you will start this test, please recheck your name.</p>
            <Link className={styles.button} href={`/${params.test}/${curentTest?.questions[0].id}`}>Start test</Link>
        </main>
    )
}