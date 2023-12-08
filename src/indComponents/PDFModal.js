import React from 'react'
import Modal from 'react-bootstrap/Modal'

const PDFModal = ({pdfURL,showLink,setShowLink}) => {
  return (
    <div>
        <Modal className="modal-pdf-viewer" show={showLink} onHide={() => setShowLink(false)}>
          <Modal.Header closeButton>
              <Modal.Title>PDF Viewer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <object className="pdf-viewer" data={pdfURL} width="100%" height="100%"/>
          </Modal.Body>
      </Modal>
    </div>
  )
}

export default PDFModal