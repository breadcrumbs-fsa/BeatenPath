import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

export default function BottomInfo() {
  return (
    <Grid item xs={12}>
      <ButtonGroup fullWidth aria-label="Full width outlined button group">
        <Button>Add to journey</Button>
        {/* <Button>width</Button>
          <Button>ButtonGroup</Button> */}
      </ButtonGroup>
    </Grid>
  )
}
