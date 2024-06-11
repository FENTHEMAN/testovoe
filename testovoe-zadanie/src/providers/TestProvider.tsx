'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type TestStore, createTestStore } from '@/stores/teststore'
import { ITest } from '@/typescript/ITest'
import { TestProviderSupport } from './TestProviderSupport'

export const TestStoreContext = createContext<StoreApi<TestStore> | null>(
  null,
)

export interface TestStoreProviderProps {
  initialState: ITest[]
  children: ReactNode
}

export const TestStoreProvider = ({
  initialState,
  children,
}: TestStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TestStore>>()
  if (!storeRef.current) {
    storeRef.current = createTestStore()
  }

  return (
    <TestStoreContext.Provider value={storeRef.current}>
      {children}
      <TestProviderSupport tests={initialState} />  
    </TestStoreContext.Provider>
  )
}

export const useTestStore = <T,>(
  selector: (store: TestStore) => T,
): T => {
  const testStoreContext = useContext(TestStoreContext)

  if (!testStoreContext) {
    throw new Error(`useTestStore must be use within TestStoreProvider`)
  }

  return useStore(testStoreContext, selector)
}