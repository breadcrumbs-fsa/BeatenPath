import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

export const Login = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <nav> */}
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
        <Link to="/auth/google">Login</Link>
      </div>
    )}
    {/* </nav> */}
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Login)

// /**
//  * PROP TYPES
//  */
// Login.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
