import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  ListItemIcon,
  Icon,
  ListItemText,
  FormHelperText,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const useStyle = makeStyles((theme) => ({
  container: {
    maxWidth: '100%',
  },
  select: {
    minHeight: '40px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  selectedOption: {
    backgroudColor: theme.palette.primary.main,
  },
}));

export const ChipMultiSelect = ({ form, field, fieldData }) => {
  const { errors, isSubmitting, touched } = form;
  const { name, options, id, selectOptions } = fieldData;

  const classes = useStyle();
  const labelId = `${id}-label`;

  return (
    <div className={classes.container}>
      <FormControl
        fullWidth
        variant={options.variant}
        margin={options.margin}
        error={!!errors[name]}
      >
        <InputLabel id={labelId}>{options.label}</InputLabel>
        <Select
          {...field}
          {...options}
          className={classes.select}
          color={touched[name] && !errors[name] ? 'secondary' : 'primary'}
          labelId={labelId}
          id={id}
          multiple
          disabled={isSubmitting}
          input={<Input variant="outlined" id={`${id}-chips`} />}
          MenuProps={{}}
          renderValue={(selected) => {
            return (
              <div className={classes.chips}>
                {selected.map((value, k) => (
                  <Chip
                    className={classes.chip}
                    color="primary"
                    key={k}
                    label={value}
                    deleteIcon={<DoneIcon />}
                    onDelete={(optionToDelete) => console.log(optionToDelete)}
                  />
                ))}
              </div>
            );
          }}
        >
          {selectOptions.map((option, k) => {
            return (
              <MenuItem
                key={option.id}
                value={option.value}
                selected={classes.selectedOption}
                className="fullwidth"
              >
                {option.devIcon && (
                  <ListItemIcon>
                    <Icon fontSize="small">
                      <i
                        className={`devicon-${option.devIcon}-plain colored`}
                      ></i>
                    </Icon>
                  </ListItemIcon>
                )}

                <ListItemText primary={option.value} />
              </MenuItem>
            );
          })}
        </Select>

        {errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}
      </FormControl>
    </div>
  );
};
