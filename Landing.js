import React , { Component } from 'react';
import Navigation from "./Navigation";
import Jumbo from "./Jumbo";
import Footer from "./Footer";
import Cards from "./Cards";
import Loading from './Loading';
import { db, auth } from '../firebase/firebase';

const INITIAL_STATE = {
  name: "",
  email: "",
  location: "",
  blood: "",
  dob: "",
  hist: "",
  Didload: true,
  error: null
};

class Landing extends Component {
  state = { ...INITIAL_STATE }

  componentDidMount() {
    setTimeout(() => this.setState({Didload: false}), 2800);
  }

  componentWillMount() {
    if (auth.currentUser !== null) {
      db.ref('users/' + auth.currentUser.uid).once('value').then((snapshot) => {
        if (snapshot) {
          this.setState(snapshot.val());
        }
      }).catch( e => {
        alert(e.message);
      })
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.Didload ?(
          <Loading />
        )
        :
        (<div>
            <Navigation />
            <div className="container"> 
                <Jumbo name={this.state.name} hist={this.state.hist}/>
            </div>
            <div className="cards_together">
                <Cards/>
            </div>
            <Footer/>
          </div>
          )
        }      
      </div>
    );
  }
}
  
export default Landing;
