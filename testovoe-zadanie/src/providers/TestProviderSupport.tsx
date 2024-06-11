'use client'

import React, { useEffect } from 'react'
import { useTestStore } from './TestProvider'
import { ITest } from '@/typescript/ITest'

export const TestProviderSupport = ({ tests }: { tests: ITest[] }) => {

    const { setTests } = useTestStore(state => state)

    useEffect(() => {
        setTests(tests)
    }, [tests])

  return (
    <></>
  )
}
