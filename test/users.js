import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v2/')
import { expect } from "chai";

const TOKEN = 'ab171bc6c317f8906bc17b9cac16c343db20117f7fd4ad877380a8a2cbe6d181'

describe('Users', () => {
    /*it('GET /users', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err,res) => {
            // console.log(err)
            // console.log(res.body) 
            // expect(res.body).to.not.be.empty // using asseration
            expect(res.body).to.be.empty // checking for fail condition but in result it will not fail because it is synchrous
            // ther is no callback to check api is taking sometime to throw the response
            done() //callback - > no it an asynchrouns call

            // Another way to work with asynchrouns is just call return then no need to all done() callback



        })
    })*/

    it('GET /users', () => {
       return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body).to.not.be.empty // return is a promise here 
       })
    })

    it('GET /users/id',() => {
        return request.get(`users/187869?access-token=${TOKEN}`).then((res) => {
            expect(res.body.id).to.be.eq(187869) // return is a promise here 
           })
    })

    it('GET /users using params',() => {
        const url = `users?access-token=${TOKEN}&gender=male&status=active`
        return request.get(url).then((res) => {
            // expect(res.body).to.not.be.empty // return is a promise here 
            res.body.forEach(data => {
                expect(data.gender).to.be.eq("male")                
            })
           })
    })

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
            console.log(res.body)
            expect(res.body.email).to.be.eq(data.email)
            expect(res.body.gender).to.be.eq(data.gender) 
        })
    })

    it('PUT /users', () => {
        const data = {
            status: "inactive",
            name: `luffy-${Math.floor(Math.random() * 999)}`
        }
        return request.put('users/191596')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            // console.log(res.body)
            //data.status = 'active'
            expect(res.body.name).to.be.eq(data.name)
            // expect(res.body.status).to.be.eq(data.status)
            expect(res.body).to.deep.include(data) // deep is used to verify all the data basically all the fields
        })
    })

    it('DELETE /users', () => {
        return request.delete('users/191521')
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {
            // console.log(res.body)
            expect(res.body).to.be.eq()
        })
    })
})