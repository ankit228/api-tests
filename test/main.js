require('dotenv').config();
import request from '../config/common'
import { expect } from "chai";
import { createRandomUser } from "../helper/helper";

const casual = require('casual')
const TOKEN = process.env.user_TOKEN

describe.only('POSTS', () => {
    let postId, userId;

    before(async () => {
        userId = await createRandomUser()
    })       

    it('/posts', async() => {

            const data = {
                user_id: userId,
                title: casual.sentence,
                body: casual.title
            } 
            const postres = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            
            // console.log(postres.body)
            expect(postres.body).to.deep.include(data)
            postId = postres.body.id
            
        })       

        // it('/get', async()=> {
        //     const newres = await request
        //     .get(`posts/${postId}`)
        //     .set('Authorization', `Bearer ${TOKEN}`)
        //     .expect(200)
        //     // console.log(newres.body)
            
        // })

        it('/get', async() =>{
            try {
                    const newres = await request
                    .get(`posts/${postId}`)
                    .set('Authorization', `Bearer ${TOKEN}`)
                    .expect(200)
                    console.log(newres.body)
                    
            } catch (error) {
                console.log(`print ${error}`)
            }
        })
    })
