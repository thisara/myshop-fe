import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';

const orderListSelector = state => state.listOrders;
const orderSearchSelector = state => state.searchOrders;
const orderEditSelector = state => state.order;
const orderDeleteSelector = state => state.deleteOrder;

const formListOrders = createSelector ([orderListSelector], orders => {

    let formatedOrders = [];

    orders.map(function (object, i){

        const immutableOrder = fromJS(object);

        const defaultDate = new Date(immutableOrder.getIn(['orderDateCreated']));
        let date = ((defaultDate.getDate() < 10) ? '0'+defaultDate.getDate() : defaultDate.getDate() )+'/'+(defaultDate.getMonth()+1)+'/'+defaultDate.getFullYear()
        const updatedOrder = List.of(immutableOrder.setIn(['orderDateCreated'], date));

        const updatedJSOrder = updatedOrder.toJS();

        formatedOrders.push(updatedJSOrder[0]);

        return 0; //TODO: Just to avoid linters
    });
    
    return formatedOrders;
});

const formSearchOrders = createSelector ([orderSearchSelector], orders => {
    return orders;
});

const formEditOrder = createSelector ([orderEditSelector], order => {
    return order;
});

const formDeleteOrder = createSelector ([orderDeleteSelector], order => {
    return order;
})

export {
    formListOrders,
    formSearchOrders,
    formEditOrder,
    formDeleteOrder
}