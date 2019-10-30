//Object Property Shorthand

const name = 'Arlisha'

const userAge = 27

const user = {
    name,
    userAge,
    location: 'Houston, TX'
}

console.log(user)

//Object Destructuring

const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: null
}

// const { label, price, stock, salePrice } = product

console.log(product)


const transaction = (type, {label, stock, price}) => {
    console.log(type, label, stock, price)
}


transaction('order', product)