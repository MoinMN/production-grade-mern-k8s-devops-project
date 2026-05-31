import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalBox(props) {
  const {
    show,
    close,
    title,
    body,
    secondaryBtn = "Cancel",
    secondaryBtnVariant = "secondary",
    primaryBtn = "OK",
    primaryBtnVariant = "primary",
    confirmAction = () => { },
  } = props;

  return (
    <Modal
      show={show}
      onHide={close}
      backdrop="static"
      keyboard={false}
      className="text-black"
    >
      <Modal.Header className="border-gray-300">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body}</Modal.Body>

      <Modal.Footer className="border-gray-300">
        <Button variant={secondaryBtnVariant} onClick={close}>
          {secondaryBtn}
        </Button>
        <Button variant={primaryBtnVariant} onClick={confirmAction}>
          {primaryBtn}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// PropTypes validation
ModalBox.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  secondaryBtn: PropTypes.string,
  secondaryBtnVariant: PropTypes.string,
  primaryBtn: PropTypes.string,
  primaryBtnVariant: PropTypes.string,
  confirmAction: PropTypes.func,
};

export default ModalBox;
