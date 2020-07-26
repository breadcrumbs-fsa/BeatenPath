import React, {useContext} from 'react'
import {StoreContext} from '../../app'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ProfileMenu from './LoginMenu'
import Button from '@material-ui/core/Button'
import ViewModuleIcon from '@material-ui/icons/ViewModule'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#3e526a'
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  title: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: '#a4bb99',
    color: '#303f50'
  },
  margin2: {
    // margin: theme.spacing(1),
    backgroundColor: '#f19367',
    color: '#303f50'
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
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        classes={{root: classes.root}}
        style={{height: '42px'}}
      >
        <Toolbar variant="dense">
          {/*<NavMenu />*/}

          <div
            variant="h6"
            className={classes.title}
            // onClick={function() {
            //   props.dispatch({type: 'CHANGE_MODE', mode: 'home'})
            //   props.dispatch({type: 'CLEAR_PLACES'})
            //   props.dispatch({type: 'CLEAR_SEGMENTS'})
            //   props.dispatch({type: 'SET_SINGLE_JOURNEY', journey: {}})
            // }}
          >
            <img src="/BeatenPath2.png" height="25px" />
          </div>
          <div style={{marginBottom: '1vh'}}>
            {(props.mode === 'find' || props.mode === 'viewOnly') && (
              <Button
                variant="contained"
                size="small"
                className={classes.margin2}
                onClick={function() {
                  props.dispatch({type: 'CHANGE_MODE', mode: 'create'})
                  props.dispatch({type: 'CLEAR_PLACES'})
                  props.dispatch({type: 'CLEAR_SEGMENTS'})
                  props.dispatch({type: 'SET_SINGLE_JOURNEY', journey: {}})
                  props.dispatch({type: 'DELETE_PREVIEW'})
                }}
                style={{height: '4.5vh'}}
              >
                Create
              </Button>
            )}

            {props.mode === 'create' && (
              <Button
                variant="contained"
                size="small"
                className={classes.margin}
                onClick={function() {
                  props.dispatch({type: 'CHANGE_MODE', mode: 'find'})
                  props.dispatch({type: 'CLEAR_PLACES'})
                  props.dispatch({type: 'CLEAR_SEGMENTS'})
                  props.dispatch({type: 'SET_SINGLE_JOURNEY', journey: {}})
                  props.dispatch({type: 'DELETE_PREVIEW'})
                }}
                style={{height: '4.5vh'}}
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
