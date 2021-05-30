import React, { Component } from "react";
import { auth, db } from "../firebase/firebase";
import { Button, Form, InputGroup, Container } from "react-bootstrap";


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class ChangeDetailsForm extends Component {
  state = {
      location: this.props.location,
      blood: this.props.blood
  };
  
  componentWillMount() {
    this.setState({
        location: this.props.location,
        blood: this.props.blood
    });  
  }

  onSubmit = event => {
    db.ref('users/'+ auth.currentUser.uid).update({location: this.state.location, blood: this.state.blood})
    .then(()=>{
      alert("Your details are successfully updated.\nRefresh the page to see changes.");
    })
    .catch(err => {
      alert(err.message);
    });

    event.preventDefault();
  };

  render() {
    const {
      location,
      blood
    } = this.state;

    //a boolen to perform validation
    const isInvalid = 
      (location === this.props.location && blood === this.props.blood) || location === "";

    return (
      <div className="inputclass">
        <Container>
        <h5 id="mytextjambo">Change Your Details</h5>
          <Form onSubmit={this.onSubmit}>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Address</InputGroup.Prepend>
              <Form.Control
                type="text"
                name="location"
                id="inputtext"
                placeholder=" Current location"
                value={location}
                onChange={e => this.setState(byPropKey("location", e.target.value))}
              />
            </InputGroup>
            <br/>
            <InputGroup style={{width: "300px"}}>
                <InputGroup.Prepend className="inputlabel">Blood Group</InputGroup.Prepend>
                <Form.Control as="select" 
                  id="inputtext"
                  defaultValue={blood}
                  onChange={e => this.setState(byPropKey("blood", e.target.value))}
                >
                  <option value="Unavailable" >Unknown to me</option>
                  <option value="A+" >A+</option>
                  <option value="A-" >A-</option>
                  <option value="B+" >B+</option>
                  <option value="B-" >B-</option>
                  <option value="AB+" >AB+</option>
                  <option value="AB-" >AB-</option>
                  <option value="O+" >O+</option>
                  <option value="O-" >O-</option>
                </Form.Control>
            </InputGroup>
            <br/>
            <div className="text-center">
              <Button disabled={isInvalid} type="submit" id="mybutton">
                Save Changes
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default ChangeDetailsForm;

