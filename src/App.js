
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalForm from './Components/Modals/Modal';
import DataTable from './Components/Tables/DataTable';
import { CSVLink } from 'react-csv';
import axios from 'axios';

class App extends Component {
  state = {
    items: []
  }


  getItems = () => {
    axios.get('http://localhost:3000/crud')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.error('Erro na requisição GET:', error);
      });
  }
  


  addItemToState = (item) => {
    axios.post('http://localhost:3000/crud', item)
      .then(response => {
        this.setState(prevState => ({
          items: [...prevState.items, response.data]
        }));
      })
      .catch(error => {
        console.error('Erro na requisição POST:', error);
      });
  }



  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
   
      ...this.state.items.slice(0, itemIndex),
  
      item,
    
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }


deleteItemFromState = (id) => {
  const updatedItems = this.state.items.filter(item => item._id !== id)
  this.setState({ items: updatedItems })
}


  componentDidMount(){
    this.getItems()
  }



  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>CRUD Database</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;