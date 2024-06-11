// import { nanoid } from 'nanoid';
import { ITest } from '@/typescript/ITest';
import { createStore } from 'zustand/vanilla'

export type TestState = {
    tests: ITest[];
}

export type TestActions = {
    setTests: (tests: ITest[]) => void;
}

export type TestStore = TestState & TestActions

export const defaultInitState: TestState = {
    tests: []
}

export const createTestStore = (
    initState: TestState = defaultInitState,
) => {
    return createStore<TestStore>()((set) => ({
        ...initState,
        setTests: (tests) => (set(() => ({ tests: tests })))
  }))
}