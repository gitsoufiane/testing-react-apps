// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen,act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import { tokenToString } from 'typescript'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

const TestComponent = () => {
  const { count,decrement,increment} = useCounter()
  return (
    <div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <span> count : {count}</span>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<TestComponent />)
  const increment = screen.getByRole('button', { name: /increment/i })
  const decrement = screen.getByRole('button', { name: /decrement/i })
  const count = screen.getByText(/count/i)
  expect(count).toHaveTextContent('count : 0')
  userEvent.click(increment)
  expect(count).toHaveTextContent('count : 1')
  userEvent.click(decrement)
  expect(count).toHaveTextContent('count : 0')
})

test('fake component', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  console.log(result)
  expect(result.count).toBe(0)
  act(()=>result.increment())
  expect(result.count).toBe(1)
  act(()=>result.decrement())
  expect(result.count).toBe(0)
}
)

/* eslint no-unused-vars:0 */
