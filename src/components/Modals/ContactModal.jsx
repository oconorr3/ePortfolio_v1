import React from 'react';
import { Modal } from 'react-bootstrap';

import '../../styles/Modal.css';

export default class ContactModal extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    //only show the modal if the show prop is true
    if (!this.props.show) {
      return null;
    }

    return (
      <Modal
        {...this.props}
        dialogClassName='custom-modal'
        >
        <Modal.Body>
          <h4 className='modal-title'>Contact</h4>
           <p>
             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
             ac consectetur ac, vestibulum at eros.
           </p>
           <p>
             yolooooo
           </p>
        </Modal.Body>
      </Modal>
    );
  }
}
