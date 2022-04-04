import { reducer_types } from './reducer-types';

const reducer =  (state, action) => {
    switch (action.type) {
        case reducer_types.SET_URLS:
            return {
                ...state,
                urls: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
