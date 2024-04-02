const chai = require("chai")
const chaiHttp = require("chai-http")
const sinon = require("sinon")
const axios = require("axios")
const app = require("../app")
const expect = chai.expect

chai.use(chaiHttp);

describe('User Profile', () => {
  describe('/GET profile', () => {
    it('it should GET the user profile', (done) => {
      chai.request(app)
          .get('/profile/profile')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('username');
            expect(res.body).to.have.property('bio');
            expect(res.body).to.have.property('pfp');
            expect(res.body).to.have.property('email');
            expect(res.body).to.have.property('preferences');
            done();
          });
    });
  });

  describe('/POST editProfile', () => {
    it('it should POST and update the user profile', (done) => {
      let updatedProfile = {
        username: 'New_Tony_Gunk',
        bio: 'Updated bio',
        pfp: 'https://picsum.photos/id/238/200/300',
        email: 'newtemp@email',
        preferences: {
          breed: 'cat'
        }
      };

      chai.request(app)
          .post('/profile/editProfile')
          .send(updatedProfile)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').eql('Profile updated');
            expect(res.body.profile).to.have.property('username').eql(updatedProfile.username);
            expect(res.body.profile).to.have.property('bio').eql(updatedProfile.bio);
            expect(res.body.profile).to.have.property('pfp').eql(updatedProfile.pfp);
            expect(res.body.profile).to.have.property('email').eql(updatedProfile.email);
            expect(res.body.profile.preferences).to.deep.equal(updatedProfile.preferences);
            done();
          });
    });
  });
});
