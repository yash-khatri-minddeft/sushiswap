import { FC } from 'react'

import { Custody } from './Section1/Custody'
import { Move } from './Section2/Move'
import { Guard } from './Section3/Guard'

export const Story: FC = () => {
  return (
    <>
      <Custody />
      <Move />
      <Guard />
    </>
  )
}
