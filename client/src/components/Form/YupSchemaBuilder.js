import * as Yup from 'yup';

export const YupSchema = (fields) => {
  const shape = {};
  fields.forEach(({ name, validation }) => {
    if (validation) {
      // Strings
      shape[name] = Yup.string();
      if (validation.required)
        shape[name] = shape[name].required('This field is required.');
      if (validation.email)
        shape[name] = shape[name].email(
          'The provided email adress is not valid.'
        );
      if (validation.match)
        shape[name] = shape[name].oneOf(
          [Yup.ref(validation.match), null],
          'Passwords must match'
        );
      if (validation.min)
        shape[name] = shape[name].min(
          validation.min.value,
          validation.min.message
        );
      if (validation.max)
        shape[name] = shape[name].max(
          validation.max.value,
          validation.max.message
        );

      // Arrays
      if (validation.type === 'array') {
        shape[name] = Yup.array();
        if (validation.minArray) {
          shape[name] = shape[name].min(
            validation.minArray.value,
            validation.minArray.message
          );
        }
        if (validation.maxArray) {
          shape[name] = shape[name].max(
            validation.maxArray.value,
            validation.maxArray.message
          );
        }
      }
    }
  });

  return Yup.object().shape(shape);
  // return Yup.object().shape({
  //   email: Yup.string().email('Invalid email').required('Required'),
  //   password: Yup.string()
  //     .min(2, 'The password is too short!')
  //     .max(50, 'Too Long!')
  //     .required('Required'),
  // });
};
