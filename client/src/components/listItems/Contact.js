import React from 'react'

import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Contact = ({ key, id, firstName, lastName }) => {
  const fullName = () => {
    return `${firstName} ${lastName}`
  }

  return (
    <ListItem>
      <ListItemText primary={fullName()} />
      <Button>Edit</Button>
    </ListItem>
  )
}

export default Contact
