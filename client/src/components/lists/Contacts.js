import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_CONTACTS } from '../../queries/index'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'

import Contact from '../listItems/Contact'

const Contacts = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS)
  if (loading) return 'Loading...'
  if (error) return `Errror! ${error.message}`
  console.log('data', data)
  return (
    <ul>
      {data.contacts.map(({ id, firstName, lastName }) => (
        <Container>
          <List>
            <Contact
              key={id}
              id={id}
              firstName={firstName}
              lastName={lastName}
            />
          </List>
        </Container>
      ))}
    </ul>
  )
}

export default Contacts
