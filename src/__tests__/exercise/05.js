// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'

const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      return res(ctx.json({username: req.body.username}))
    },
  ),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(username)).toBeInTheDocument()
})
