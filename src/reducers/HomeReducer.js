import { 
    SEARCH_CHANGED,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    SEARCH_LOADMORE,
    SEARCH,
    SEARCH_REQUIRED
 } from '../values/types';


 const INITIAL_STATE = { 
    search: '',
    listSearch: [],
    error: '',
    loading: false,
    loadingLoadmore: false
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_CHANGED:
            return { ...state, search: action.payload };
        case SEARCH_SUCCESS:
            return { ...state, error: '', listSearch: action.payload, loading: false, loadingLoadmore: false };
        case SEARCH_FAIL:
            return { ...state, error: action.payload, password: '', loading: false, loadingLoadmore: false };
        case SEARCH_LOADMORE:
                return { ...state, loading: false, loadingLoadmore: true,  error: ''  };
        case SEARCH:
            return { ...state, loading: true, loadingLoadmore: false, error: '', listSearch: []  };
        case SEARCH_REQUIRED:
            return { ...state, error: 'Search is required!', loading: false, loadingLoadmore: false,  listSearch: []  };
        default:
            return state;
    }
};