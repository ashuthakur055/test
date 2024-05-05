
const Types = {
    STATUS: 'STATUS'
}

const initialState = {
    status: { type: 'idle', message: '' }
}

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.STATUS:
            return { ...state, status: action.payload };
        default:
            return state;
    }
}

export default statusReducer;