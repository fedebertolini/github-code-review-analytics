export const getLoggedInUser = state => state.getIn(['user', 'loggedInUser']);
export const getLoggedInUserError = state => state.getIn(['user', 'loggedInUserError']);
export const getUsers = state => state.getIn(['user', 'users']);
export const getSelectedUsers = state => state.getIn(['user', 'selectedUsers']);

export const getSelectedUsersData = state => {
    const users = getUsers(state);
    return getSelectedUsers(state).map(login => users.find(user => user.get('login') === login));
};
