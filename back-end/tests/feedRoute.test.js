const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const expect = chai.expect

// configure chai to use chai-http plugin
chai.use(chaiHttp)

describe("GET /feed", () => {
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
})
