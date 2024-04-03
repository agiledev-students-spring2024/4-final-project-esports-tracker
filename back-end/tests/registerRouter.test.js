const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const expect = chai.expect

chai.use(chaiHttp) 

describe("Backend API - POST /auth/login", () => {
    describe("Successful Login", () => {
      it("it should successfully log in an existing user", (done) => {
        const existing_user = {
            email: "test@test",
            password: "test",
        };
        chai 
            .request(app)
            .post("/auth/login")
            .send(existing_user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("message", "Login successful")
                done();
            })
        })
    })

    describe("Cannot Login Because User Has Invalid Email", () => {
      it("it should not log in the user", (done) => {
        const invalid_user = {
            email: "wrongEmailt@test",
            password: "test",
        };

        chai 
            .request(app)
            .post("/auth/login")
            .send(invalid_user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.have.property("message", "Invalid email.")
                done();
            });
      })
    })

    describe("Cannot Login Because User Has Invalid Password", () => {
      it("it should not log in the user", (done) => {
        const invalid_user = {
            email: "test@test",
            password: "wrongpassword",
        };
        chai 
            .request(app)
            .post("/auth/login")
            .send(invalid_user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.have.property("message", "Invalid password.")
                done();
            });
      })
    })
})


describe("Backend API - POST /auth/register", () => {
  describe("Successful Registration", () => {
    it("it should successfully register a new user", (done) => {
      const new_user = {
            email: "test@test",
            password: "test",
        };
        chai 
            .request(app)
            .post("/auth/register")
            .send(new_user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("message", "Registration successful")
                done();
            });
      })
  })

    describe("Failed Registration Because Missing Email", () => {
        it("it should give an error if the email is missing", (done) => {
            const invalid_user = {
                password: "test",
            };
            chai 
                .request(app)
                .post("/auth/register")
                .send(invalid_user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property("message", "Cannot register user. Missing email.")
                    done();
                });
        });
    });


    describe("Failed Registration Because Missing Password", () => {
        it("it should give an error if the email is missing", (done) => {
            const invalid_user = {
                email: "test@test",
            };
            chai 
                .request(app)
                .post("/auth/register")
                .send(invalid_user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property("message", "Cannot register user. Missing password.")
                    done();
                });
        });
    });
})
