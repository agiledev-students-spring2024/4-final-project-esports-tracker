const chai = require("chai")
const chaiHttp = require("chai-http")
const sinon = require("sinon")
const axios = require("axios")
const app = require("../app")
const expect = chai.expect

// configure chai to use chai-http plugin
chai.use(chaiHttp)

describe("Backend API - GET /swipe/card", () => {
  describe("Succesful GET Request", () => {
    // test case to check if the endpoint returns all posts
    it("it should return a set of photos", (done) => {
      chai
        .request(app)
        .get("/swipe/card")
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200) // check that the status code is 200
          expect(res.body).to.be.an("array") // check if the response body is an array
          done()
        })
    })    
  })
})

describe("Backend API - POST /swipe/postSwipe", () => {
  describe("Succesful POST Request", () => {
    // test case to check if the endpoint returns all posts
    it("it should return a success message", (done) => {
      chai
        .request(app)
        .post("/swipe/postSwipe")
        .send({ dir: "left" })
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200) // check that the status code is 200
          expect(res.body).to.have.property("message").to.equal("Data received successfully") // check if the response body has the correct message
          done()
        })
    })

    describe("Error Handling", () => {
      // set up stubs for axios.get to simulate network error
      let axiosPostStub
      beforeEach(() => {
        // stub axios.get for the error handling case
        axiosPostStub = sinon.stub(axios, "post").rejects(new Error("Network Error"))
      })
      // restore axios.get to its original function
      afterEach(() => {
        axiosPostStub.restore()
      })
      // test case to check error handling when fetching posts
      it("it should handle errors when posting swipe", (done) => {
        chai
          .request(app)
          .post("/swipe/postSwipe")
          .send({direction : "left"})
          .end((err, res) => {
            expect(res).to.have.status(500) // check that the status code is 500
            done()
          })
      })
    })
  })
})