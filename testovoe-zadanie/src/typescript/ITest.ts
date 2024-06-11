export interface ISeveralAnswersQuestion {
    id: string,
    answers: {
        id: string,
        answer: string
    }[],
    question: string,
    type: string
}

export interface IOneAnswerQuestion {
    id: string,
    answers: {
        id: string,
        answer: string
    }[],
    question: string,
    type:  string
}

export interface IShortAnswerQuestion {
    answers?: {
        id: string,
        answer: string
    }[],
    id: string,
    question: string,
    type: string
}

export interface IDeepAnswerQuestion {
    answers?: {
        id: string,
        answer: string
    }[],
    id: string,
    question: string,
    type: string
}

export type Question = IDeepAnswerQuestion | IOneAnswerQuestion | ISeveralAnswersQuestion | IShortAnswerQuestion

export interface IAnswer {
    id: string,
    question: string,
    answer: string
}

export interface IResults {
    id: string,
    student: string,
    time?: number,
    answers: Array<IAnswer>
}

export interface ITest {
    id: string,
    name: string,
    questions: Array<Question>,
    results: Array<IResults>,
    time: number
}