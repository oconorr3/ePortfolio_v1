import React from 'react';
import { Modal } from 'react-bootstrap';

import '../styles/Modal.css';

export default class AboutModal extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
        <Modal
          {...this.props}
          aria-labelledby='contained-modal-title'
          >
          <Modal.Header>
            <Modal.Title id='contained-modal-title'>About Me</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            empty body
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
    );
  }
}
