const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const expect = chai.expect

// configure chai to use chai-http plugin
chai.use(chaiHttp)

describe("Backend API - GET /feed", () => {
  describe("Succesful GET Request", () => {
    // test case to check if the endpoint returns all posts
    it("it should return all posts", (done) => {
      chai
        .request(app)
        .get("/feed")
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200) // check that the status code is 200
          expect(res.body).to.be.an("array") // check if the response body is an array
          done()
        })
    })
    // test case to check that each post has expected properties
    it("it should return posts with the correct properties", (done) => {
      chai
        .request(app)
        .get("/feed")
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200); // check that the status code is 200
          expect(res.body).to.be.an("array"); // check if the response body is an array
          // check properties
          res.body.forEach((post) => {
            expect(post).to.have.property("username")
            expect(post).to.have.property("image")
            expect(post).to.have.property("caption")
          })
          done()
        })
    })
  })
})
