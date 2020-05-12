import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotForm from './ForgotForm';

export const modesId = 'authenticate';
export const modes = {
  id: modesId,
  modes: {
    auth_login: {
      id: 'auth_login',
      fields: LoginForm,
      heading: 'Sign In',
      submit: 'Sign In',
      link: "Don't have an account? Sign Up",
    },
    auth_register: {
      id: 'auth_register',
      fields: RegisterForm,
      heading: 'Register',
      submit: 'Register',
      link: 'Already have an account? Sign in!',
    },
    auth_forgot: {
      id: 'auth_forgot',
      fields: ForgotForm,
      heading: 'Recovering Password',
      submit: 'Recover',
      link: 'Forgot your password?',
    },
  },
  activeMode: 'auth_login',
};
