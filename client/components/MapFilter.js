import {DirectionsRenderer, GoogleMap, Marker} from 'react-google-maps'
import React, {Component, createContext, useContext} from 'react'
import {StoreContext} from '../app'
import Button from '@material-ui/core/Button'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import CheckBox from '@material-ui/core/CheckBox'
import {makeStyles} from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing(2)
  }
}))

const MapFilter = props => {
  const [state, dispatch] = useContext(StoreContext)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  function handleToggle() {
    setOpen(prevOpen => !prevOpen)
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          onClick={handleToggle}
        >
          T
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          keepMounted
          transition
          disablePortal
        >
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem onClick={() => null}>
                      All<CheckBox
                        onChange={() => dispatch({type: 'TOGGLE_ALL'})}
                      />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}
export default MapFilter
