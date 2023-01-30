import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v2/')
import { expect } from "chai";

const TOKEN = 'ab171bc6c317f8906bc17b9cac16c343db20117f7fd4ad877380a8a2cbe6d181'

describe('Users', () => {
    let userId

    describe('POST', () => {

        it('POST /users', () => {
            const data = {
                //email: "tao6ost@gmail.com",
                email: `test-${Math.floor(Math.random() * 9999)}@gmail.com`,
                name: "test",
                gender: "male",
                status: "active"
            }
            return request.post("users")
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                userId = res.body.id
                console.log(userId)
            })
        })
    })

    describe('GET', () => {
        it('/users', () => {
            return request.get(`users?access-token=${TOKEN}`).then((res) => {
             expect(res.body).to.not.be.empty // return is a promise here 
            })
         })

         it('/users/id',() => {
            return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
                expect(res.body.id).to.be.eq(userId) // return is a promise here 
               })
        })

        it('/users using params',() => {
            const url = `users?access-token=${TOKEN}&gender=male&status=active`
            return request.get(url).then((res) => {
                // expect(res.body).to.not.be.empty // return is a promise here 
                res.body.forEach(data => {
                    expect(data.gender).to.be.eq("male")                
                })
               })
        })

    })

    describe('PUT', () => {
        it('/users', () => {
            const data = {
                status: "inactive",
                name: `luffy-${Math.floor(Math.random() * 999)}`
            }
            return request.put(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                expect(res.body).to.deep.include(data) // deep is used to verify all the data basically all the fields
            })
        })
    })
    
    describe('DELETE', ()=> {
        it('/users', () => {
            return request.delete(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) => {
                console.log(userId)
                expect(res.body).to.be.not.eq(null)
            })
        })
    })
})