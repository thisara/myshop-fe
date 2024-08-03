function getPayloadToUpdateCart(product, productID, quantity, orderItems){

    //for product search page
    let orderItem = {
        productID : productID,
        productWhenAddToCart : product,
        quantity : quantity
    }

    let currentCompositeOrderItems = orderItems;

    let currentCartItems = (currentCompositeOrderItems && currentCompositeOrderItems.cartItems) ? currentCompositeOrderItems.cartItems : [];

    let isFoundProductId = false;

    //new immutable array
    let updatedOrderItems = [];

    //new immutable wrapper
    let orderItemsWrapper = {};

    let updatedCartItemTotal = [];

    let cartItemTotalWrapper = {
        itemTotal : 0,
        delivery : 0,
        grandItemTotal : 0
    };

    //if cart is not empty, update if existing, else copy all items
    if(currentCartItems){
        currentCartItems.map(function (object, i){
            if(object.productID === productID){ //This is not working cart update have productID, product update have _id
                object.quantity = quantity;
                if(object.productWhenViewCart){
                    cartItemTotalWrapper.itemTotal += object.lineTotal = object.productWhenViewCart.productUnitPrice * quantity;
                }
                currentCartItems[i] = object;
                isFoundProductId = true;
                //Need to break the loop here ??
            }else{
                if(object.productWhenViewCart){
                    cartItemTotalWrapper.itemTotal += object.productWhenViewCart.productUnitPrice * object.quantity;
                }
            }
            updatedOrderItems.push(object);
            return 0; //TODO: Just to avoid linters
        });

        cartItemTotalWrapper.grandItemTotal = cartItemTotalWrapper.itemTotal + cartItemTotalWrapper.delivery;
        updatedCartItemTotal.push(cartItemTotalWrapper);

    //if cart is empty, add new item
    }else{
        updatedOrderItems.push(orderItem);
    }

    //if productID not matched, add new item not in the cart
    if(!isFoundProductId){
        updatedOrderItems.push(orderItem);
    }

    //cart object on 0th index
    orderItemsWrapper.cartItems = updatedOrderItems;
    orderItemsWrapper.cartItemTotal = updatedCartItemTotal;

    return orderItemsWrapper;
}

export {
    getPayloadToUpdateCart
}