'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type AnswerStore, createAnswerStore } from '@/stores/answerstore'

export const AnswerStoreContext = createContext<StoreApi<AnswerStore> | null>(
  null,
)

export interface AnswerStoreProviderProps {
  children: ReactNode
}

export const AnswerStoreProvider = ({
  children,
}: AnswerStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AnswerStore>>()
  if (!storeRef.current) {
    storeRef.current = createAnswerStore()
  }

  return (
    <AnswerStoreContext.Provider value={storeRef.current}>
      {children}
    </AnswerStoreContext.Provider>
  )
}

export const useAnswerStore = <T,>(
  selector: (store: AnswerStore) => T,
): T => {
  const answerStoreContext = useContext(AnswerStoreContext)

  if (!answerStoreContext) {
    throw new Error(`useAnswerStore must be use within AnswerStoreProvider`)
  }

  return useStore(answerStoreContext, selector)
}