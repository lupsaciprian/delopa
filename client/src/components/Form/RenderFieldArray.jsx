import React from 'react';
import { FieldArray, Field } from 'formik';
import { Box, Typography, IconButton, Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { SocialIcon } from '../SocialIcon/SocialIcon';
import { SimpleTextField } from './FieldWrappers/SimpleTextField';

export const RenderFieldArray = ({ field, values }) => {
  const valueOfField = values[field.name];

  return (
    <Box bgcolor="background.paper" p={2} my={2}>
      <Typography variant="subtitle1">{field.mainLabel}</Typography>
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
                          <DeleteIcon />
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
};
