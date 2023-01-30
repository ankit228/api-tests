import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v2/')

const TOKEN = 'ab171bc6c317f8906bc17b9cac16c343db20117f7fd4ad877380a8a2cbe6d181'

const casual = require('casual')
export const createRandomUser = async() => {
    const userData = {
        email: casual.email,
        name: casual.name,
        gender: 'male',
        status: 'inactive'
    }

    const res = await request
    .post("users")
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(userData)
    return res.body.id
}
