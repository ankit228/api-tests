import supertest from "supertest";
import { expect } from "chai";

const request = supertest('https://gorest.co.in/public/v2/')

const TOKEN = 'ab171bc6c317f8906bc17b9cac16c343db20117f7fd4ad877380a8a2cbe6d181'

describe('POSTS', () => {
    let postId, userId

    it('/posts', () => {
        const userData = {
            email: `test-${Math.floor(Math.random() * 9999)}@gmail.com`,
            name: "test",
            gender: "male",
            status: "active"
        }
        return request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userData)
        .then(async (res) => {
            userId = res.body.id
            // console.log(userId)

            const data = {
                user_id: userId,
                title: 'My title',
                body: 'my blog posts'
            }
            const postres = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            // console.log(postres.body)
            postId = postres.body.id
        })
    })

    // it('/get', async()=> {
    //     const newres = await request
    //     .get(`posts/${postId}`)
    //     .set('Authorization', `Bearer ${TOKEN}`)
    //     .expect(200)
    //     // console.log(newres.status)
        
    // })

    describe('NEGATIVE', () => {
        it('401', async() => {
            const data = {
                user_id: userId,
                title: 'My title',
                body: 'my blog posts'
            }
            const navres = await request
            .post('posts')
            .send(data)
            // console.log(navres.status)
            expect(navres.status).to.eq(401)
        })

        it('422', async() => {
            const data = {
                user_id: userId,
                title: 'My title'
            }
            const nores = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            // console.log(navres.status)
            console.log(nores.text[0].message)
            expect(nores.status).to.eq(422)
            // expect(nores.text.message).to.eq('must exist')
        })
    })
})