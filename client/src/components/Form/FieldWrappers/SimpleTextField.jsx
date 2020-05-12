import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

export const SimpleTextField = ({ form, field, fieldData }) => {
  const { errors, isSubmitting, touched } = form;
  const { name, options } = fieldData;

  return (
    <TextField
      {...field}
      {...options}
      error={!!errors[name]}
      disabled={isSubmitting}
      color={touched[name] && !errors[name] ? 'secondary' : 'primary'}
      helperText={errors[name]}
      InputProps={{
        endAdornment: touched[name] && !errors[name] && (
          <InputAdornment position="end">
            <CheckIcon color="secondary" />
          </InputAdornment>
        ),
      }}
    />
  );
};
