export const getLoggedInUser = state => state.getIn(['user', 'loggedInUser']);
export const getLoggedInUserError = state => state.getIn(['user', 'loggedInUserError']);
export const getUsers = state => state.getIn(['user', 'users']);
export const getSelectedUsers = state => state.getIn(['user', 'selectedUsers']);
