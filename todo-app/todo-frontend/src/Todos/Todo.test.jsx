import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('Todo', () => {
  it('renders todo text', () => {
    const mockTodo = { text: 'Test todo', done: false }
    render(<Todo todo={mockTodo} deleteTodo={() => {}} completeTodo={() => {}} />)
    expect(screen.getByText('Test todo')).toBeDefined()
  })
})