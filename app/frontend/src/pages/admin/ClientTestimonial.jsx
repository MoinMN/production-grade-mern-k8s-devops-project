import { useState, useEffect } from 'react';
import Check from 'react-bootstrap/FormCheck';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { GetTestimonial, AddTestimonial, DeleteTestimonial, ToggleApprovedTestimonial } from '../../api/clienttestimonial.api';
import Alert from '../../components/Alert';
import ModalBox from '../../components/admin/Modal';
import ModalForm from '../../components/admin/ModalForm';
import Loading from '@/components/admin/Loading';

const ClientTestimonial = () => {
  // testimonial list store here
  const [testimonialList, setTestimonialList] = useState([]);
  // testimonial pending list store here
  const [testimonialPendingList, setTestimonialPendingList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // alert 
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  // modal 
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Confirmation',
    body: '',
    secondaryBtn: "Cancel",
    secondaryBtnVariant: "secondary",
    primaryBtn: "",
    primaryBtnVariant: "",
    confirmAction: null
  });
  const closeModal = () => setShowModal(false);

  const [showModalToPost, setModalToPost] = useState(false);

  const closeModalToPost = () => {
    setModalToPost(false);
  }

  const [refreshData, setRefreshData] = useState(false);

  // calculate date of client testimonial
  const calculateElapsedTime = (dateOfPost) => {
    if (!dateOfPost) return 'Time Not Available!'
    const now = new Date();
    const postedDate = new Date(dateOfPost);
    const elapsedSeconds = Math.floor((now - postedDate) / 1000); // Convert milliseconds to seconds

    if (elapsedSeconds < 60) {
      return `${elapsedSeconds} seconds ago`;
    } else if (elapsedSeconds < 3600) {
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      if (elapsedMinutes == 1) return `${elapsedMinutes} minute ago`;
      else return `${elapsedMinutes} minutes ago`;
    } else if (elapsedSeconds < 86400) {
      const elapsedHours = Math.floor(elapsedSeconds / 3600);
      if (elapsedHours == 1) return `${elapsedHours} hour ago`;
      return `${elapsedHours} hours ago`;
    } else {
      const elapsedDays = Math.floor(elapsedSeconds / 86400);
      if (elapsedDays == 1) return `${elapsedDays} day ago`;
      return `${elapsedDays} days ago`;
    }
  };

  const handleSwitchChange = (isChecked, email) => {
    setTestimonialList((prev) =>
      prev.map((testimonial) =>
        testimonial?.email === email
          ? { ...testimonial, isApproved: isChecked }
          : testimonial
      )
    );
    ToggleApprovedTestimonial(email, isChecked)
      .then(res => {
        setMessageAlert(res.message);
        setVariantAlert(res.message === 'Client Testimonial Successfully Approved!' ? 'success' : 'warning');
      })
      .catch(err => {
        setMessageAlert(err);
        setVariantAlert('danger');
      })
      .finally(() => {
        setRefreshData((prev) => !prev);
        setShowAlert(true);
      })
  }

  const handleDelete = (_id, name) => {
    setModalInfo({
      ...modalInfo,
      body: `Do you really want to delete ${name} his/her testimonial?`,
      primaryBtn: "Delete",
      primaryBtnVariant: "danger",
      confirmAction: () => handleConfirmDelete(_id)
    })
    setShowModal(true);
  }

  const handleConfirmDelete = (_id) => {
    DeleteTestimonial(_id)
      .then(res => {
        setMessageAlert(res.message);
        setVariantAlert('warning');
        setRefreshData((prev) => !prev);
      })
      .catch(err => {
        setMessageAlert(err);
        setVariantAlert('danger');
      })
      .finally(() => {
        setShowAlert(true);
        // ensure modal is close
        closeModal();
      });
  }

  const handleNewClientTestimonial = () => {
    setModalToPost(true);
  }

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const sendMail = e.target.sendMail.checked;

    if (!email) {
      setMessageAlert('Client Email Required!');
      setVariantAlert('danger');
      setShowAlert(true);
      return;
    }

    AddTestimonial(email, sendMail)
      .then(res => {
        setMessageAlert(res.message);
        setVariantAlert('success');
        if (res.message === 'Email Required!') setVariantAlert('danger');
        if (res.message === 'Client Email Already Exist!') setVariantAlert('warning');
      })
      .catch(err => {
        setMessageAlert(err);
        setVariantAlert('danger');
      })
      .finally(() => {
        setShowAlert(true);
        setRefreshData((prev) => !prev);
        //ensure modal to close
        closeModalToPost();
      })
  }

  useEffect(() => {
    GetTestimonial()
      .then(res => {
        if (res?.message) return;
        console.log(res)
        // filter completed testimonial
        const filterCompleted = res.filter(testimonial => testimonial?.name && testimonial?.comment)
        // filter pending testimonial
        const filterPending = res.filter(testimonial => !testimonial?.name && !testimonial?.comment)
        setTestimonialList(filterCompleted);
        setTestimonialPendingList(filterPending);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }, [refreshData, setRefreshData]);

  if (isLoading) return <Loading />

  return (
    <>
      <div className="flex flex-col justify-around lg:flex-row items-start gap-4 p-4 text-sm sm:text-base md:text-lg max-sm:p-3 max-sm:gap-3 poppins">
        <div className="flex flex-wrap justify-around items-stretch gap-4">
          {testimonialList?.map((testimonial, index) => (
            <Card className="text-center max-w-[550px] shadow-md border-2 border-light-primary rounded-md" key={index}>
              <Card.Header className='flex justify-around items-center gap-6 max-sm:gap-2'>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial?.profile}
                    alt={`${testimonial?.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <Check
                    type="switch"
                    label="Want to Display?"
                    checked={testimonial?.isApproved}
                    className='mx-2'
                    onChange={(e) => handleSwitchChange(e.target.checked, testimonial?.email)}
                  />
                </div>
                <i
                  className='fa-solid fa-trash-can cursor-pointer mx-2 text-xl md:text-2xl hover:text-red-500 transition-all duration-200 ease-in-out'
                  onClick={() => handleDelete(testimonial?._id, testimonial?.name)}
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add("fa-regular");
                    e.currentTarget.classList.remove("fa-solid");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.classList.remove("fa-regular");
                    e.currentTarget.classList.add("fa-solid");
                  }}
                />
              </Card.Header>
              <Card.Body className='flex flex-col gap-1'>
                <Card.Title className='text-xl sm:text-2xl md:text-3xl text-light-primary'>
                  {testimonial?.name}
                </Card.Title>
                <Card.Subtitle>
                  <b>
                    {testimonial?.email}
                  </b>
                </Card.Subtitle>
                <Card.Text>
                  {testimonial?.comment}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="sm:text-sm md:text-base text-light-text2 ">
                {calculateElapsedTime(testimonial?.createdAt)}
              </Card.Footer>
            </Card>
          ))}

          <div className="flex bg-light-2 hover:bg-light-3 rounded-lg shadow-md border-2 border-dashed border-light-primary max-sm:w-64 cursor-pointer transition-all duration-300 ease-in-out">
            <div
              className="flex flex-col justify-center items-center gap-4 text-center min-w-64 max-w-[550px]  rounded-md py-4"
              onClick={handleNewClientTestimonial}
            >
              <div className="text-[80px] sm:text-[90px] md:text-[110px]">
                <i className="fa-solid fa-plus" />
              </div>
              <div className="text-lg ms:text-xl md:text-2xl text-center px-4">
                Add New Testimonial Client
              </div>
            </div>
          </div>
        </div>


        {testimonialPendingList.length !== 0 && (
          <div className="w-[300px] h-auto sticky top-28 self-start">
            <h3 className='text-2xl my-2'>
              Pending Testimonial
            </h3>
            <Table striped borderless hover responsive='sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {testimonialPendingList?.map((testimonial, index) => (
                  <tr key={index}>
                    <td className='text-center'>
                      {index + 1}.
                    </td>
                    <td>
                      {testimonial?.email}
                    </td>
                    <td className='text-center'>
                      <i
                        className='fa-solid fa-trash-can cursor-pointer text-xl md:text-2xl hover:text-red-500 transition-all duration-200 ease-in-out'
                        onClick={() => handleDelete(testimonial?._id, testimonial?.email)}
                        onMouseEnter={(e) => {
                          e.currentTarget.classList.add("fa-regular");
                          e.currentTarget.classList.remove("fa-solid");
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.classList.remove("fa-regular");
                          e.currentTarget.classList.add("fa-solid");
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>




      {/* Modal from for edit and update data  */}
      <ModalForm
        showModalToPost={showModalToPost}
        closeModalToPost={closeModalToPost}
        handleConfirmSubmit={handleConfirmSubmit}
        formType='testimonial'
      />

      {/* alert  */}
      < Alert
        variant={variantAlert}
        showAlert={showAlert}
        message={messageAlert}
        setShowAlert={setShowAlert}
      />

      {/* Modal Box  */}
      < ModalBox
        show={showModal}
        close={closeModal}
        title={modalInfo.title}
        body={modalInfo.body}
        secondaryBtn={modalInfo.secondaryBtn}
        secondaryBtnVariant={modalInfo.secondaryBtnVariant}
        primaryBtn={modalInfo.primaryBtn}
        primaryBtnVariant={modalInfo.primaryBtnVariant}
        confirmAction={modalInfo.confirmAction}
      />
    </>
  )
}

export default ClientTestimonial
