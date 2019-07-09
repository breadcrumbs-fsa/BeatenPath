import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ProfileMenu from './LoginMenu'
import Button from '@material-ui/core/Button'
import NavMenu from './NavMenu'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/*<NavMenu />*/}

          <Typography variant="h6" className={classes.title}>
            {<img src="/BeatenPath.png" height="25px" />}
          </Typography>
          <div style={{marginBottom: '1vh'}}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.margin}
            >
              Create
            </Button>

            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.margin}
            >
              Find
            </Button>
          </div>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  )
}
