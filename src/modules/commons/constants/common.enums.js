const orderStatus = {
    INIT : 'INIT',
    PARTIAL : 'PARTIAL',
    PENDING : 'PENDING',
    ACCEPTED : 'ACCEPTED',
    DISPATCHED : 'DISPATCHED',
    DELIVERED : 'DELIVERED',
    CANCELLED : 'CANCELLED'
};

const getOrderStatus = () => {
    return orderStatus;
}

export {
    getOrderStatus
}