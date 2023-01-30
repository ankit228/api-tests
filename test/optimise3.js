import supertest from "supertest";
import { expect } from "chai";
import { createRandomUser } from "../helper/helper";

const request = supertest('https://gorest.co.in/public/v2/')

const TOKEN = 'ab171bc6c317f8906bc17b9cac16c343db20117f7fd4ad877380a8a2cbe6d181'

describe('POSTS', () => {
    let postId, userId;

    before(async () => {
        userId = await createRandomUser()
    })       

    it('/posts', async() => {

            const data = {
                user_id: userId,
                title: 'My title',
                body: 'my blog posts'
            } 
            const postres = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            
            console.log(postres.body)
            expect(postres.body).to.deep.include(data)
            postId = postres.body.id
            
        })       

        it('/get', async()=> {
            const newres = await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200)
            console.log(newres.body)
            
        })
    })
