import { combineReducers } from 'redux';

import alerts from './alert';
import auth from './auth';
import profile from './profile';
import backdropLoader from './loaders/backdropLoaders';
import mode from './mode';

export default combineReducers({ alerts, auth, profile, backdropLoader, mode });
