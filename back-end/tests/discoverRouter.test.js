const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const expect = chai.expect

// configure chai to use chai-http plugin
chai.use(chaiHttp)

describe("Backend API - GET /discover/:id", () => {
  describe("Succesful GET Request", () => {
    // test case to check if the endpoint returns markers based on user_id
    it("it should return markers based on id", (done) => {
      chai
        .request(app)
        .get("/discover/1")
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200) // check that the status code is 200
          expect(res.body).to.be.an("array") // check if the response body is an array
          done()
        })
    })
    // test case to check that the markers have the expected properties
    it("it should return markers with the correct properties", (done) => {
      chai
        .request(app)
        .get("/discover/1")
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200); // check that the status code is 200
          expect(res.body).to.be.an("array"); // check if the response body is an array
          res.body.forEach((marker) => {
            expect(marker).to.have.property("geocode") // check if each marker has the 'geocode' property
            expect(marker.geocode).to.be.an("array") // check if the 'geocode' property is an array
            expect(marker).to.have.property("popUp") // check if each marker has the 'popUp' property
          })
          done()
        })
    })
    // test case for handling invalid user_id
    it("it should return an empty array for non-existent id", (done) => {
      chai
        .request(app)
        .get("/discover/999")
        .end((err, res) => {
          expect(err).to.be.null // check that there is no error
          expect(res).to.have.status(200) // check that the status code is 200
          expect(res.body).to.be.an("array").that.is.empty // check if the response body is an empty array
          done()
        })
    })
  })
})
