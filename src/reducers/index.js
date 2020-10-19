import { combineReducers } from 'redux';

// import all reducers
import authReduser from './auth-reducers';
import roleReducer from './role-reducers';
import resultsReducer from './results-reducers';
import votedReducer from './voted-reducers';
// import {plansReducer, planReducer} from './tracker/plansReducer';
// import {exercisesReducer, exerciseReducer} from './tracker/exercisesReducer';
// import selectExerciseReducer from './tracker/exercisesReducer';

// combine reducers
// export default
export default combineReducers({
    auth: authReduser,
    role: roleReducer,
    results: resultsReducer,
    voted: votedReducer
});