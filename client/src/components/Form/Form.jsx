import * as React from 'react';
import { Formik, Form } from 'formik';
import { LinearProgress, Button } from '@material-ui/core';

import { YupSchema } from './YupSchemaBuilder';
import useStyles from './FormStyle';
import RenderField from './RenderField';
import { RenderFieldArray } from './RenderFieldArray';

const createInitialValues = (fields) => {
  const initialValues = {};
  fields.forEach((field) => {
    initialValues[field.name] = field.value;
  });

  return initialValues;
};

const renderFormik = ({ fields, submit }, classes) => {
  return (
    <Formik
      initialValues={createInitialValues(fields)}
      validationSchema={YupSchema(fields)}
      enableReinitialize
      validateOnBlur={false}
      onSubmit={submit.submitFunction}
    >
      {({ submitForm, isSubmitting, isValid, errors, values }) => {
        return (
          <Form className="fullwidth">
            {fields.map((field, k) => {
              if (field.type === 'FieldArray')
                return (
                  <RenderFieldArray
                    key={field.id}
                    field={field}
                    values={values}
                  />
                );

              return (
                <RenderField key={field.id} field={field} values={values} />
              );
            })}

            <div className={classes.submitSpacer}></div>

            {isSubmitting && <LinearProgress />}
            <Button
              onClick={submitForm}
              disabled={isSubmitting}
              type="submit"
              validate
              className={classes.submit}
              {...submit.button.options}
            >
              {isSubmitting ? 'Please wait...' : submit.button.text}
            </Button>

            {submit.render}
          </Form>
        );
      }}
    </Formik>
  );
};

const GeneralForm = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {renderFormik(props, classes)}
      {props.children}
    </React.Fragment>
  );
};

export default GeneralForm;
