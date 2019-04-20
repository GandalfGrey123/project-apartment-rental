import React, { Component } from 'react';
import "./styles/styles.css"
import "./styles/bootstrap.css"
import logo from './img/logo.jpg';
import logo1 from './img/favicon1.png';
import picture from './img/picture.png';


class DashBoard extends Component {



  createTable = () => {
let table = []

    for (let i = 0; i < 3; i++) {
      table.push(
        <div className="ml-5">
        <div className="col text-center">
        <button type="button" className="btn btn-primary mrg20" >Active</button>
        <button type="button" className="btn btn-warning mrg20" >Message</button>
        <button type="button" className="btn btn-danger mrg20" >Remove</button>
        </div>

        <span className="pl-2">22 Dave James</span>
        

        <div className="mt-2 mxw25">
            <img className="wd100" alt="post" src="https://via.placeholder.com/500/f5f5f5" />
        </div>
        <hr />
        </div>

      )
    }
    return table
  }


  render() {
    return (
      <div >
        
        <header className="j2t3bix j1axqjmf j1auq9sh jkgbs4i j17dd4mj">
            <div className="jte21hw j1i3ghpr ju2y67y toolbar__root toolbar--narrow">
                <div className="j1njibue jqqz69l">
                    <div className="jmra8tp jyzjcyu">
                        <div className="j1njibue jqqz69l">
                            <img alt="logo" src={logo1} />

                            <hr className="jaewh4y divider__root divider--vertical" />
          <img alt="label" className="image__instagram-label" src={logo} /></div>
                    </div>
                   
                </div>
            </div>


        </header>

        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-default">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                     <form className="form-inline my-2 my-lg-0">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form>

                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item active">
                        <a className="nav-link btn btn-primary" >Home </a>
                    </li>

                    <li className="nav-item active ml-2">
                        <a className="nav-link btn btn-primary" >New Listing </a>
                    </li>
                    

                    </ul>
                   
                </div>
          </nav>

        </div>


        <div className="container mt-5">
            <div className="jh17x6u j2">

            <span className="font-weight-bolder">Welcome to your Hub</span>


                 <div className="j1njibue mt-5">
                    <div className="jr7no7f avatar__root avatar--ultra-large">
                      <img src={picture} />
                  </div>

                 

            

              <div className="jmra8tp j19rc5s">
                <div className="float-right">
                  <div >
                    <h1 className="j129u29 j10yh1l1 text__root text--light-weight">About</h1>
                    <p>About me, Lorem Ipsum is simply<br/>
                    dummy text of the printing <br/>
                    and typesetting </p>
                  </div>

              </div>
              <div >
              <h1 className="j129u29 j10yh1l1 text__root text--light-weight">Your Properties</h1>


              </div>

              <div className="jh17x6u j4">
                  <ul>
                  <li>22 James Smith</li>
                  </ul>
              </div>

              <div >
                    <h1 className="j129u29 j10yh1l1 text__root text--light-weight">Messages</h1>

                </div>

                <div className="jh17x6u j4">
                    <ul>
                    <li>2 Unread Messages</li>
                    </ul>
                </div>

                </div>
              </div>
              </div>
        </div>

        <hr />

        {this.createTable()}


      </div>
    );
  }
}


export default DashBoard;