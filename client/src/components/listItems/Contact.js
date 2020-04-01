import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import UpdateContact from '../forms/UpdateContact'
import RemoveContact from '../buttons/RemoveContact'

const Contact = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const fullName = () => {
    return `${firstName} ${lastName}`
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <div>
      {editMode ? (
        <UpdateContact
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <ListItem>
          <ListItemText primary={fullName()} />
          <Button
            onClick={() => setEditMode(true)}
            variant='contained'
            style={{ margin: '5px' }}
          >
            Edit
          </Button>
          <RemoveContact
            id={props.id}
            firstName={props.firstName}
            lastName={props.lastName}
          />
        </ListItem>
      )}
    </div>
  )
}

export default Contact
