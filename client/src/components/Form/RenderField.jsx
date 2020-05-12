import React from 'react';

import { Field, FieldArray } from 'formik';
import {
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import useStyle from './RenderFieldStyle';
import { SimpleTextField } from './FieldWrappers/SimpleTextField';
import { ChipMultiSelect } from './FieldWrappers/ChipMultiSelect';
import { SocialIcon } from '../SocialIcon/SocialIcon';

const MenuProps = {};

const RenderField = ({ field, values }) => {
  const classes = useStyle();

  switch (field.type) {
    case 'SimpleMultilineField':
    case 'SimpleTextField':
      return (
        <Field
          component={SimpleTextField}
          name={field.name}
          fieldData={field}
        />
      );
    case 'ChipMultiSelect':
      return (
        <Field
          component={ChipMultiSelect}
          name={field.name}
          fieldData={field}
        />
      );

    case 'SimpleCheckbox':
      return (
        <FormControlLabel
          control={
            <Field component={Checkbox} name={field.name} {...field.options} />
          }
          label={field.options.label}
        />
      );
    case 'FieldArray':
      const valueOfField = values[field.name];
      console.log(valueOfField, values);
      return (
        <Box bgcolor="background.paper" p={2} my={2}>
          <Typography variant="subtitle1">Social Media</Typography>
          <FieldArray
            name={field.name}
            render={({ remove, insert, push, form, unshift }) => (
              <div>
                {valueOfField && valueOfField.length > 0 ? (
                  valueOfField.map((item, index) => {
                    return (
                      <div>
                        <Box justifyContent="flex-start" mt={1}>
                          <SocialIcon
                            click={() =>
                              form.setFieldValue(
                                `${field.name}.${index}`,
                                'https://www.facebook.com/'
                              )
                            }
                            type="Facebook"
                          />
                          <SocialIcon
                            click={() =>
                              form.setFieldValue(
                                `${field.name}.${index}`,
                                'https://www.twitter.com/'
                              )
                            }
                            type="Twitter"
                          />
                          <SocialIcon
                            click={() =>
                              form.setFieldValue(
                                `${field.name}.${index}`,
                                'https://www.linkedin.com/'
                              )
                            }
                            type="LinkedIn" //github.com/
                          />
                          <SocialIcon
                            click={() =>
                              form.setFieldValue(
                                `${field.name}.${index}`,
                                'https://www.github.com/'
                              )
                            }
                            type="Github"
                          />
                          <SocialIcon
                            click={() =>
                              form.setFieldValue(
                                `${field.name}.${index}`,
                                'https://www.yoursite.com/'
                              )
                            }
                            type="Web"
                          />
                        </Box>

                        <Box component="div" display="flex" alignItems="center">
                          <Field
                            component={SimpleTextField}
                            name={`${field.name}.${index}`}
                            fieldData={field.field}
                          />

                          <Box m={1}>
                            <IconButton
                              size="small"
                              aria-label="delete"
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Box>
                        </Box>

                        {index === valueOfField.length - 1 && (
                          <Box display="flex" flexDirection="row-reverse" p={1}>
                            <Button
                              variant="outlined"
                              onClick={() => insert(index, '')}
                              startIcon={<AddIcon />}
                            >
                              Add New
                            </Button>
                          </Box>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <Box display="flex" justifyContent="flex-start" my={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={() => unshift('')}
                    >
                      Add Social Link
                    </Button>
                  </Box>
                )}
              </div>
            )}
          />
        </Box>
      );
    default:
      return <React.Fragment></React.Fragment>;
  }
};

export default RenderField;
