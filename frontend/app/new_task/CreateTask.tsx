'use client'

import { gql } from 'graphql-tag'
import { TaskForm } from '../components'

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $note: String) {
    createTask(title: $title, note: $note) {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default function CreateTask() {
  return <TaskForm />
}
