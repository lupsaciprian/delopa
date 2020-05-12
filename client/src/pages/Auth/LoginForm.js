export default [
  {
    type: 'SimpleTextField',
    id: 'LoginEmail',
    name: 'login_email',
    value: '',
    options: {
      type: 'email',
      variant: 'outlined',
      margin: 'normal',
      fullWidth: true,
      id: 'email',
      label: 'Email Adress *',
      autoComplete: 'email',
    },
    validation: {
      required: true,
      email: true,
    },
  },
  {
    type: 'SimpleTextField',
    id: 'LoginPassword',
    name: 'login_password',
    value: '',
    options: {
      type: 'password',
      variant: 'outlined',
      margin: 'normal',
      fullWidth: true,
      id: 'password',
      label: 'Password',
      autoComplete: 'current-password',
    },
    validation: {
      required: true,
    },
    extra: {
      showPassword: false,
      toggleShowPassword: function () {
        this.showPassword = !this.showPassword;
      },
    },
  },

  {
    type: 'SimpleCheckbox',
    id: 'LoginRememberMe',
    name: 'login_rememberMe',
    value: false,
    options: {
      // type: 'email',
      // variant: 'outlined',
      // margin: 'normal',
      // fullWidth: true,
      // id: 'email',
      label: 'Remember Me',
      // autoComplete: 'email',
    },
  },
];
