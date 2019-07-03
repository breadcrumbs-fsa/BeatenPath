/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
// export {default as Navbar} from './navbar'
export {default as AppBar} from './NavBar/AppBar'
export {default as UserHome} from '../../old/components/user-home'
// export {Login} from './auth-form'
export {default as Login} from '../components/NavBar/Login'
// export {default as SignIn} from './NavBar/SignIn'
// export {default as SignUp} from './NavBar/SignUp'
