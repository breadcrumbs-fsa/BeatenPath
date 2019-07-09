import React, {useContext, useState} from 'react'
import {StoreContext} from '../../app'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ProfileMenu from './LoginMenu'
import Button from '@material-ui/core/Button'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import NavMenu from './NavMenu'
import Switch from '@material-ui/core/Switch'
import {defaultProps} from 'recompose'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  title: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

export const ButtonAppBar = () => {
  const [state, dispatch] = useContext(StoreContext)

  return (
    <ButtonAppBarView
      segments={state.segments}
      dispatch={dispatch}
      placePreview={state.placePreview}
      places={state.places}
      journeys={state.journeys}
      journey={state.journey}
      mode={state.mode}
    />
  )
}

export function ButtonAppBarView(props) {
  const classes = useStyles()
  console.log('mode: ', props.mode)
  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{root: classes.root}}>
        <Toolbar variant="dense">
          {/*<NavMenu />*/}

          <Typography variant="h6" className={classes.title}>
            {<img src="/BeatenPath.png" height="25px" />}
          </Typography>
          <div style={{marginBottom: '1vh'}}>
            {(props.mode === 'find' || props.mode === 'viewOnly') && (
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.margin}
                onClick={function() {
                  props.dispatch({type: 'CHANGE_MODE', mode: 'create'})
                  props.dispatch({type: 'CLEAR_PLACES'})
                  props.dispatch({type: 'SET_SINGLE_JOURNEY', journey: {}})
                }}
              >
                Create
              </Button>
            )}

            {(props.mode === 'create' || props.mode === 'viewOnly') && (
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.margin}
                onClick={function() {
                  props.dispatch({type: 'CHANGE_MODE', mode: 'find'})
                }}
              >
                Find
              </Button>
            )}
          </div>
          <ViewModuleIcon />
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default ButtonAppBar
