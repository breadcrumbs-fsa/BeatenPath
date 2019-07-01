import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ProfileMenu from './LoginMenu'
import NavMenu from './NavMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavMenu />
          <Typography variant="h6" className={classes.title}>
            BeatenPath
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  )
}