import React, { useState, useEffect } from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";
import ChangeAvatarProfile from "./ChangeAvatarProfile";


const Profile = () => {
 
  return (
    <div className="my-10 mx-10" style={{ backgroundColor: '#e89015', borderRadius: '20px' }}>
      {/* <Container className="justify-content-center align-items-center py-5 h-100" style={{display: 'unset'}}>
            <Row className="h-100">
              <img src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg" style={{width: '85px', height: '85px'}}/>
              <h3>Your name</h3>            
            </Row>
            <Row>
              
            </Row>


          </Container> */}


      <section className="mx-10">
        <Container>
          <Card className="card-profile shadow mt-300 "  style={{ borderRadius: '20px' }}>
            <div className="px-4">
              <Row className="justify-content-center" style={{ width: '100%' }}>
                <Col className="text-center order-lg-1" lg="3">
                  <div className="card-profile-image">             
                    <ChangeAvatarProfile/>                  
                  </div>
                </Col>
                <Col
                  className="text-center order-lg-1 mt-5" lg="4"
                >
                  <div style={{fontSize: '35px'}}>Võ Thanh Duy</div>
                  <div className="d-flex justify-content-center mt-10">
                    <div className="border border-4 border-warning px-7 py-3 mx-2" style={{ borderRadius: '60px' }}>
                      <span className="heading">22 </span>
                      <span className="description">Photos  </span>
                    </div>
                    <div className="border border-4 border-warning px-7 py-3 mx-2" style={{borderRadius: '60px' }}>
                      <span className="heading">100 </span>
                      <span className="description">Followers</span>
                    </div>
                    <div className="border border-4 border-warning px-7 py-3 mx-2" style={{borderRadius: '60px' }}>
                      <span className="heading">89 </span>
                      <span className="description">Favorites</span>
                    </div>
                  </div>
                </Col>
                <Col className="text-center order-lg-1 mt-20" lg="4" style={{fontSize: '20px'}}>
                  <div>Ngày sinh: 09/10/2001</div>
                  <div>Địa chỉ: Hihi hihi hihi</div>
                  <div>Email: duybpz@gmail.com</div>
                  <div>Số điện thoại: 0334416510</div>
                  <div>-------------------------</div>
                </Col>
              </Row>
              <div className="text-center mt-5">
                <h3>
                  Jessica Jones{" "}
                  <span className="font-weight-light">, 27</span>
                </h3>
                <div className="h1 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  Bucharest, Romania
                </div>
                <div className="h6 mt-4">
                  <i className="ni business_briefcase-24 mr-2" />
                  Solution Manager - Creative Tim Officer
                </div>
                <div>
                  <i className="ni education_hat mr-2" />
                  University of Computer Science
                </div>
              </div>

              <div className="mt-5 py-5 border-top">
                <Row className="justify-content-center" style={{ width: '100%' }}>
                  <Col className="text-center" lg="9">
                    <p>
                      An artist of considerable range, Ryan — the name taken
                      by Melbourne-raised, Brooklyn-based Nick Murphy —
                      writes, performs and records all of his own music,
                      giving it a warm, intimate feel with a solid groove
                      structure. An artist of considerable range.
                    </p>
                    <a href="#pablo">
                      Show more
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}
export default Profile;
