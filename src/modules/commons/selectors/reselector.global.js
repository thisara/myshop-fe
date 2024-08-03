import { createSelector } from 'reselect';

const loadingSelector = state => state.loading;
const messageSelector = state => state.message;
const resultSlector = state => state.result;

const formWaiting = createSelector ([loadingSelector], loading => {
    return loading;
});

const formWaitingMessage = createSelector ([messageSelector], message => {
    return message;
});

const formResultMessage = createSelector ([resultSlector], result => {
    return result;
});

export {
    formWaiting,
    formWaitingMessage,
    formResultMessage,
}