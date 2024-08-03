const productCategories = [
    {GROCERIES : 'Grocery Items'},
    {MEAT : 'Fresh Meat'},
    {HOUSEHOLD : 'Household'},
    {PHAMARCUTICALS : 'Pharmasuiticals'},
    {VEGITABLES : 'Fresh Vegitables'},
    {FRUITS : 'Fresh Fruits'},
    {OTHER : 'Other'}
];

const currencies = [
    {LKR : 'LKR'},
    {USD : '$'},
]

const unitOfMeasure = [
    {EA : 'Each'},
    {KG : 'Kilo'},
    {L : 'Litre'},
    {ML : 'Mililitre'}
]

const getProductCategories = () => {
    return productCategories;
}

const getCurrencies = () => {
    return currencies;
}

const getUnitOfMeasure = () => {
    return unitOfMeasure;
}

export {
    getProductCategories,
    getCurrencies,
    getUnitOfMeasure
}