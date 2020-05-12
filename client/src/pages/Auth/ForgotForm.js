export default [
  {
    type: 'SimpleTextField',
    id: 'ForgotEmail',
    name: 'forgot_email',
    value: '',
    options: {
      type: 'email',
      variant: 'outlined',
      margin: 'normal',
      fullWidth: true,
      id: 'forgotEmail',
      label: 'Email Adress',
      autoComplete: 'email',
    },
    validation: {
      required: true,
      email: true,
    },
  },
];
