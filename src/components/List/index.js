import React, { Component } from 'react';

class List extends Component {
  render() {
    const { marker } = this.props;
    return (
      <ul>
        {
          marker && marker.map(m => {
            return (
              <li key={m.id}>Marker <span>{m.id}</span></li>
            )
          })
        }
      </ul>
    )
  }
}

export default List;
