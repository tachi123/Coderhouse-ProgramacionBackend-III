import { faker } from '@faker-js/faker';

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.number.int({min: 0, max:100}),
        imagen: faker.image.urlLoremFlickr(),
        code: faker.string.alphanumeric(10), //Código alfanumérico de 10 chars
        description: faker.lorem.sentence(5)
    }
}

export const generateUser = () => {
    let numberOfProducts = faker.number.int({min:1, max:7});
    let products = [];
    for(let i = 0; i < numberOfProducts; i++)
        products.push(generateProduct());
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birhDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        products,
        role: faker.helpers.arrayElement(['cliente','vendedor']), //Rol aleatorio
        isPremium: faker.datatype.boolean(),
        job: faker.person.jobTitle()
    }
}