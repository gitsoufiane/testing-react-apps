// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

const buildLoginForm1 = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

function buildLoginForm(credentials) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...credentials,
  }
}
test('submitting the form calls onSubmit with username and password', () => {
  const submittedData = buildLoginForm()

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByRole('textbox', {name: /username/i})
  userEvent.type(username, submittedData.username)

  const password = screen.getByLabelText(/password/i)
  userEvent.type(password, submittedData.password)

  const submit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submit)

  expect(handleSubmit).toHaveBeenCalledWith(submittedData)
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
