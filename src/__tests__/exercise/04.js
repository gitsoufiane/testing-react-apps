// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  
  const submittedData = {
    username: 'soufiane',
    password: 'soufiane',
  }

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByRole('textbox', {name: /username/i})
  userEvent.type(username, submittedData.username)

  const password = screen.getByLabelText(/password/i)
  userEvent.type(password, submittedData.password)

  const submit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submit)

  expect(handleSubmit).toHaveBeenCalledWith(submittedData)


  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
