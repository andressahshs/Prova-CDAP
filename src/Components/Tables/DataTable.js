
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import axios from 'axios';

class DataTable extends Component {
  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data._id === item._id)
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }
  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?');
    if (confirmDelete) {
      axios.delete(`http://localhost:3000/crud/${id}`)
        .then(response => {
          this.props.deleteItemFromState(id);
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
    }
  }
  render() {
    const items = this.props.items.map(item => (
      <tr key={item._id}> {/* Adicione a propriedade "key" aqui */}
        <th scope="row">{item.id}</th>
        <td>{item.first}</td>
        <td>{item.last}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.location}</td>
        <td>{item.hobby}</td>
        <td>
          <div style={{ width: "110px" }}>
            <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
            {' '}
            <Button color="danger" onClick={() => this.deleteItem(item._id)}>Del</Button>
          </div>
        </td>
      </tr>
    ));
    
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Hobby</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>  
  );
}}
export default DataTable;
