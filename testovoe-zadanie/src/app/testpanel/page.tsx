'use client'

import { useReducer, useState } from 'react'
import styles from './page.module.css'
import { Question } from '@/typescript/ITest'
import { nanoid } from 'nanoid'
import { revalidateTests } from '@/actions/serverActions'

const questionsReduser = (state: {
    questions: Question[]
}, action: {
    type: string,
    question: Question,
    id?: string
}) => {
    switch (action.type) {
        case 'add': {
            return { questions: [...state.questions, action.question] }
        }
        case 'delete': {
            return { questions: state.questions.filter(question => question.id !== action.id) }
        }
        default: {
            return state
        }
    }
}

const initState = {
    questions: []
}

export default function Page() {

    const [testName, setTestName] = useState<string>('')

    const [type, setType] = useState<string>("one-answer")
    const [time, setTime] = useState<string>("")
    const [answers, setAnswers] = useState<{ answer: string, id: string }[]>([])
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState<string>('')
    const [state, dispatchQuestions] = useReducer(questionsReduser, initState)

    const addQuestionClick = () => {
        if ((question !== "" && answers.length) || (question !== "" && type !== "one-answer" && type !== "several-answers")) {
            if (type === "one-answer") {
                dispatchQuestions(
                    {
                        type: 'add',
                        question: {
                            id: nanoid(8),
                            question: question,
                            type: type,
                            answers: answers.map(answer => {return {
                                id: nanoid(8),
                                answer: answer.answer
                            }})
                        },
                    }
                )
            } else if (type === "several-answers") {
                dispatchQuestions(
                    {
                        type: 'add',
                        question: {
                            id: nanoid(8),
                            question: question,
                            type: type,
                            answers: answers.map(answer => {return{
                                id: nanoid(8),
                                answer: answer.answer
                            }})
                        },
                    }
                )
            } else {
                dispatchQuestions(
                    {
                        type: 'add',
                        question: {
                            id: nanoid(8),
                            question: question,
                            type: type,
                            answers: [{
                                id: nanoid(8),
                                answer: ''
                            }]
                        },
                    }
                )
            }
            setAnswers([])
            setQuestion('')
            setType('one-answer')
        }
    }

    const addAnswerClick = () => {
        setAnswers([{ answer, id: nanoid(8) }, ...answers])
    }

    const deleteAnswerClick = (id: string) => {
        setAnswers(answers.filter(answer => answer.id !== id))
    }

    const addTestClick = async () => {
        const data = await fetch("http://localhost:3000/api/addtest", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: testName,
                questions: state.questions,
                results: [],
                time: +time
            }),
            referrer: "http://localhost:3000"
        })
        revalidateTests()
        console.log(data)
    }

    return (
        <main className={styles.main}>
            <div className={styles.addTestBlock}>
                <h1 className={styles.headeringPanelH1}>Add Test</h1>
                <div className={styles.panelDiv}>
                    <div className={styles.testNameDiv}>
                        <p>Write test name</p>
                        <input placeholder='test name' value={testName} onChange={e => setTestName(e.target.value)} className={styles.input} type="text" />
                        <p>Write test's time in seconds (optional)</p>
                        <input placeholder="test's time" value={time} onChange={e => setTime(e.target.value)} className={styles.input} type="text" />
                    </div>
                    <div className={styles.questionsDiv}>
                        <p>Add new questions</p>
                        <input placeholder='question' value={question} onChange={e => setQuestion(e.target.value)} className={styles.input} type="text" />
                        <p>Select question's answers type:</p>
                        <ul className={styles.typeUl}>
                            <button className={`${styles.button} ${type === "one-answer" && styles.active}`} onClick={() => setType("one-answer")}>One answer</button>
                            <button className={`${styles.button} ${type === "several-answers" && styles.active}`} onClick={() => setType("several-answers")}>Several answers</button>
                            <button className={`${styles.button} ${type === "deep-answer" && styles.active}`} onClick={() => setType("deep-answer")}>Deep answer</button>
                            <button className={`${styles.button} ${type === "short-answer" && styles.active}`} onClick={() => setType("short-answer")}>Short answer</button>
                        </ul>
                        {(type === 'one-answer' || type === 'several-answers')
                        && <>
                            <p>Write variants for answers</p>
                            <ul className={styles.typeUl}>
                                {answers.map((answer) => 
                                    <div key={answer.id} className={styles.answer}>
                                        <p>
                                            {answer.answer}
                                        </p>
                                        <span className={styles.delete} onClick={() => deleteAnswerClick(answer.id)}>delete</span>
                                    </div>
                                )}
                                <input placeholder='answer' className={styles.input} type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
                                <button onClick={addAnswerClick} className={styles.button}>Add answer</button>
                            </ul>
                        </>}
                        {state.questions.map(question =>
                            <div key={question.id} className={styles.question}>
                                <h2>{question.question} - {question.type}</h2>
                                {(question.type === 'one-answer' || question.type === 'several-answers') && question.answers?.map((answer, i) => 
                                    <p key={i}>{answer.answer}</p>
                                )}
                                <span className={styles.delete} onClick={() => dispatchQuestions({ type: 'delete', id: question.id, question })}>delete</span>
                            </div> 
                        )}
                        <button className={styles.button} onClick={addQuestionClick}>Add question</button>
                    </div>
                </div>
            </div>
            <div className={styles.addTestDescription}>
                <h1 className={styles.addTestH1}>By clicking on the button, you will add a test for all students</h1>
                <button onClick={addTestClick} className={styles.button}>Add test</button>
            </div>
        </main>
    )
}