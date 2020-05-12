import GeneralInformationForm from './GeneralInformationForm';

export const modesId = 'createProfile';
export const modes = {
  id: modesId,
  type: 'stepper',
  modes: {
    cp_general: {
      id: 'cp_general',
      fields: GeneralInformationForm,
      heading: 'General information about you',
    },
    cp_jobs: {
      id: 'cp_jobs',
      fields: [],
      heading: 'Your job experiences',
      optional: true,
    },
    cp_education: {
      id: 'cp_education',
      fields: [],
      heading: 'Your education',
      optional: true,
    },
  },
  activeMode: 'cp_general',
};
