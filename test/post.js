import supertest from "supertest";
import { expect } from "chai";

const request = supertest('https://gorest.co.in/public/v2/')

const TOKEN = 'ab171bc6c317f8906bc17b9cac16c343db20117f7fd4ad877380a8a2cbe6d181'

describe('POSTS', () => {
    let postId;
    it('/posts', async() => {
        const data = {
            user_id: 192196,
            title: 'My title',
            body: 'my blog posts'
        }

        const res = await request
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)

        // console.log(res.body)
        expect(res.body).to.deep.include(data)
        postId = res.body.id
        })

        it('/get', async()=> {
            const res = await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200)
            console.log(res.body)
            
        })
    })
