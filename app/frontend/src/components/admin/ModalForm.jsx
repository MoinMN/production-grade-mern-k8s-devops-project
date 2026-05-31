import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';

const ModalForm = ({
  showModalToPost,
  closeModalToPost,
  handleConfirmSubmit,
  formType,
  dataToUpdate,
  handleChange,
  handleImgChange = () => { },
  handleRemoveTechno = () => { },
  currentInputOfTechno = '',
  setCurrentInputOfTechno = () => { },
  handleKeyPress = () => { },
  isSubmitting = false,
}) => {
  const formatDate = (date) => {
    if (!date) return ''; // Handle empty case
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
  }

  return (
    <>
      {/* modal to edit data or post new  */}
      <Modal
        show={showModalToPost}
        onHide={closeModalToPost}
        backdrop="static"
        keyboard={false}
        className='z-[1050] text-black'
      >
        <Form onSubmit={handleConfirmSubmit}>


          {/* for service form */}
          {formType === 'service' && (
            <>
              <Modal.Header closeButton className=' border-gray-300'>
                <Modal.Title>
                  {dataToUpdate._id
                    ? "Update Service Detail"
                    : "Add New Service"
                  }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className=' border-gray-300 flex flex-col gap-2'>
                <FloatingLabel label="Title for Service">
                  <Form.Control
                    className='focus:ring-0'
                    placeholder="Title for Service"
                    name="title"
                    value={dataToUpdate.title || ''}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel label="Content for Service">
                  <Form.Control
                    className='text-base focus:ring-0'
                    as="textarea"
                    placeholder="Content for Service"
                    name="content"
                    value={dataToUpdate.content || ''}
                    onChange={handleChange}
                    style={{ minHeight: "100px", maxHeight: "300px" }}
                  />
                </FloatingLabel>
              </Modal.Body>
            </>
          )}


          {/* for skill form */}
          {formType === 'skill' && (
            <>
              <Modal.Header closeButton className=' border-gray-300'>
                <Modal.Title>
                  {dataToUpdate._id
                    ? "Update Skill"
                    : "Add New Skill"
                  }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className=' border-gray-300 flex flex-col gap-2'>
                <FloatingLabel label="Enter Skill Name">
                  <Form.Control
                    className='focus:ring-0'
                    placeholder="Enter Skill Name"
                    name="name"
                    value={dataToUpdate.name || ''}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <div className="grid sm:grid-cols-3 gap-2">
                  <div className="border-2 border-light-3 rounded flex flex-col justify-center px-1 text-sm text-gray-600 text-center">
                    <span className='flex-shrink-0'>
                      Eg.: Fa.FaReact
                    </span>
                    <span className="font-semibold">
                      Fa, Fa6, Ri, Di, Si, Io5, Gr
                    </span>
                  </div>
                  <FloatingLabel label="Icon ClassName Only" className='sm:col-span-2'>
                    <Form.Control
                      className='focus:ring-0'
                      type="text"
                      placeholder="Icon ClassName Only"
                      name="icon"
                      value={dataToUpdate.icon || ''}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
              </Modal.Body>
            </>
          )}


          {/* for project form */}
          {formType === 'project' && (
            <>
              <Modal.Header closeButton className=' border-gray-300'>
                <Modal.Title>
                  {dataToUpdate._id
                    ? "Update Project Detail"
                    : "Add New Project"
                  }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className=' border-gray-300 flex flex-col gap-2'>
                <FloatingLabel label={<p>Project Title<span className='text-red-500 ml-1'>*</span></p>}>
                  <Form.Control
                    className='focus:ring-0'
                    placeholder="Project Title"
                    name="title"
                    value={dataToUpdate.title || ''}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel label={<p>Project Description<span className='text-red-500 ml-1'>*</span></p>}>
                  <Form.Control
                    className='text-base focus:ring-0'
                    as="textarea"
                    placeholder="Project Description"
                    name="content"
                    value={dataToUpdate.content || ''}
                    onChange={handleChange}
                    style={{ minHeight: "100px", maxHeight: "300px" }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label={
                    dataToUpdate._id
                      ? "Upload Image"
                      : <p>Upload Image<span className='text-red-500 ml-1'>*</span></p>
                  }
                >
                  <Form.Control
                    className='focus:ring-0'
                    name='image'
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
                  />
                </FloatingLabel>
                <div className="flex flex-col border-2 rounded-lg py-2 px-2">
                  {/* technology list here */}
                  <div className="flex flex-wrap gap-2">
                    {dataToUpdate?.technology?.map((techno, index) => (
                      <div key={index} className="bg-blue-200 hover:bg-blue-300 rounded px-1 py-0.5 md:px-2 md:py-1">
                        <span>{techno}</span>
                        <span
                          // update technology list by filtering except current index
                          onClick={() => handleRemoveTechno(index)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <i className="fa-solid fa-xmark mx-1" />
                        </span>
                      </div>
                    ))
                    }
                  </div>
                  {/* Input field */}
                  <FloatingLabel
                    label={<p>Technologies Used Type...<span className='text-red-500 ml-1'>*</span></p>}
                  >
                    <Form.Control
                      value={currentInputOfTechno || ''}
                      onChange={(e) => setCurrentInputOfTechno(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className='text-base focus:ring-0 bg-transparent border-none'
                      as="textarea"
                      placeholder="Technologies Used Type..."
                      style={{ resize: 'none', }}
                      rows={1} // One-line by default, expands automatically
                    />
                  </FloatingLabel>
                </div>
                <FloatingLabel
                  label={<p>GitHub Repo Link<span className='text-red-500 ml-1'>*</span></p>}
                >
                  <Form.Control
                    className="focus:ring-0"
                    type="url"
                    name='githubLink'
                    placeholder="GitHub Repo Link"
                    value={dataToUpdate.githubLink || ''}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="Website Link"
                >
                  <Form.Control
                    className="focus:ring-0"
                    type="url"
                    name='websiteLink'
                    placeholder="Website Link"
                    value={dataToUpdate.websiteLink || ''}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="App Link"
                >
                  <Form.Control
                    className="focus:ring-0"
                    type="url"
                    name='appLink'
                    placeholder="App Link"
                    value={dataToUpdate.appLink || ''}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <div className="grid md:grid-flow-col gap-2">
                  <FloatingLabel
                    label="Start Date"
                  >
                    <Form.Control
                      className="focus:ring-0"
                      type="date"
                      name='startDate'
                      placeholder="Start Date"
                      value={formatDate(dataToUpdate.startDate) || ''}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="End Date"
                  >
                    <Form.Control
                      className="focus:ring-0"
                      type="date"
                      name='endDate'
                      placeholder="End Date"
                      value={formatDate(dataToUpdate.endDate) || ''}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
              </Modal.Body>
            </>
          )}

          {/* for testimonial form */}
          {formType === 'testimonial' && (
            <>
              <Modal.Header closeButton className=' border-gray-300'>
                <Modal.Title>
                  Allow a User to Give Testimonial
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className=' border-gray-300 flex flex-col gap-2'>
                <FloatingLabel label={<p>Enter Client Email<span className='text-red-500 ml-1'>*</span></p>}>
                  <Form.Control
                    className='focus:ring-0'
                    placeholder="Enter Client Email"
                    name="email"
                    type='email'
                  />
                </FloatingLabel>
                <Form.Check
                  label="Notify By Sending Mail?"
                  name="sendMail"
                  type='checkbox'
                  defaultChecked
                />
              </Modal.Body>
            </>
          )}

          <Modal.Footer className=' border-gray-300'>
            <Button
              variant="secondary"
              onClick={closeModalToPost}
              disabled={isSubmitting}
            >
              Close
            </Button>
            <Button
              variant={isSubmitting ? "secondary" : "success"}
              type='submit'
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

// PropTypes validation
ModalForm.propTypes = {
  showModalToPost: PropTypes.bool.isRequired,
  closeModalToPost: PropTypes.func.isRequired,
  handleConfirmSubmit: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  dataToUpdate: PropTypes.object,
  handleImgChange: PropTypes.func,
  handleRemoveTechno: PropTypes.func,
  currentInputOfTechno: PropTypes.string,
  setCurrentInputOfTechno: PropTypes.func,
  handleKeyPress: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default ModalForm
