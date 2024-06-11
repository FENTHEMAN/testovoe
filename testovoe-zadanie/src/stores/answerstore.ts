import { IAnswer } from '@/typescript/ITest';
import { time } from 'console';
import { nanoid } from 'nanoid';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla'

export type AnswerState = {
    answers: IAnswer[];
    testName: string;
    student: string;
    time?: number;
}

export type AnswerActions = {
    addAnswer: (answerObj: IAnswer) => void;
    deleteTargetAnswer: (id: string) => void;
    setTargetAnswer: (answerObj: IAnswer, id: string) => void;
    setStudent: (student: string) => void;
    incrementTime: () => void;
    clearTime: () => void;
    clearAnswers: () => void;
}

export type AnswerStore = AnswerState & AnswerActions

export const defaultInitState: AnswerState = {
    answers: [],
    testName: '',
    student: '',
    time: 0
}

export const createAnswerStore = (
    initState: AnswerState = defaultInitState,
) => {
    return createStore<AnswerStore>()(persist((set) => ({
        ...initState,
        addAnswer: (answerObj) => set(state => ({ answers: [...state.answers, answerObj] })),
        setTargetAnswer: (answerObj, id) => set(state =>  ({
            answers: state.answers.map(answer => answer.id === id ? { ...answer, ...answerObj }: answer)
        })),
        setStudent: (student) => (set(() => ({ student: student }))),
        incrementTime: () => (set(state => ({ time: state.time! + 1 }))),
        clearTime: () => (set(() => ({ time: 0 }))),
        clearAnswers: () => (set(() => ({ answers: [] }))),
        deleteTargetAnswer: (id) => (set(state => ({ answers: state.answers.filter(answer => answer.id !== id) })))
  }), {
    name: 'answer-local-storage',
    storage: createJSONStorage(() => localStorage)
  }))
}