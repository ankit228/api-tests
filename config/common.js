import qa from "./qa";
import supertest from "supertest";
const request = supertest(qa.baseUrl)

export default request