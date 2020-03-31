import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { v4 as uuidv4 } from 'uuid'

import { ADD_CONTACT, GET_CONTACTS } from '../../queries/index'

const AddContact = () => {
  const [id, setId] = useState(uuidv4())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [addContact] = useMutation(ADD_CONTACT, {
    update(cache, { data: { addContact } }) {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS })
      cache.writeQuery({
        query: GET_CONTACTS,
        data: { contacts: contacts.concat([addContact]) }
      })
    }
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        addContact({
          variables: {
            id,
            firstName,
            lastName
          },
          optimisticResponse: {
            __typename: 'Mutuation',
            addContact: {
              __typename: 'Contact',
              id,
              firstName,
              lastName
            }
          },
          update: (proxy, { data: { addContact } }) => {
            const data = proxy.readQuery({ query: GET_CONTACTS })
            proxy.writeQuery({
              query: GET_CONTACTS,
              data: {
                ...data,
                contacts: [...data.contacts, addContact]
              }
            })
          }
        })
      }}
    >
      <TextField
        label='First Name'
        defaultValue={firstName}
        placeholder='i.e. John'
        margin='normal'
        onChange={e => setFirstName(e.target.value)}
        variant='outlined'
        style={{ margin: '10px' }}
      />
      <TextField
        label='Last Name'
        defaultValue={lastName}
        placeholder='i.e. Smith'
        onChange={e => setLastName(e.target.value)}
        margin='normal'
        variant='outlined'
        style={{ margin: '10px' }}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ marginTop: '20px', alignItems: 'center', marginLeft: '10px' }}
      >
        Add Contact
      </Button>
    </form>
  )
}

export default AddContact
