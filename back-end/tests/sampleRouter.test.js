const chai = require("chai")
const chaiHttp = require("chai-http")
const sinon = require("sinon")
const axios = require("axios")
const app = require("../app")
const expect = chai.expect

// configure chai to use chai-http plugin
chai.use(chaiHttp)

describe("Backend API - GET /sample", () => {
  describe("Succesful GET Request", () => {
    // test case to check if the endpoint returns all posts
    it("it should return a set of photos", (done) => {
      chai
        .request(app)
        .get("/sample")
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200) // check that the status code is 200
          expect(res.body).to.be.an("array") // check if the response body is an array
          done()
        })
    })

    describe("Error Handling", () => {
      // set up stubs for axios.get to simulate network error
      let axiosGetStub
      beforeEach(() => {
        // stub axios.get for the error handling case
        axiosGetStub = sinon.stub(axios, "get").rejects(new Error("Network Error"))
      })
      // restore axios.get to its original function
      afterEach(() => {
        axiosGetStub.restore()
      })
      // test case to check error handling when fetching posts
      it("it should handle errors when fetching photos", (done) => {
        chai
          .request(app)
          .get("/sample")
          .end((err, res) => {
            expect(res).to.have.status(500) // check that the status code is 500
            expect(res.text).to.equal("An error occurred while fetching photos.") // check the error message
            done()
          })
      })
    })
  })
})
