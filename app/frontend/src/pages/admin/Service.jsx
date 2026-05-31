import { useEffect, useState } from 'react';
import { GetServices, AddService, UpdateService, DeleteService, ChangeSequence } from '../../api/service.api';
import useUnsavedChangesWarning from '../../utility/useUnsavedChangesWarning';
import Alert from '../../components/Alert';
import ModalBox from '../../components/admin/Modal';
import ModalForm from '../../components/admin/ModalForm';
import Loading from '@/components/admin/Loading';


const Service = () => {
  // services list
  const [servicesList, setSericesList] = useState([]);
  // when clicked on edit data will store here
  const [serviceDataToUpdate, setServiceDataToUpdate] = useState({});

  // index of array to edit
  const [indexForEdit, setIndexForEdit] = useState(null);
  // saving
  const [isSubmitting, setIsSubmitting] = useState(false);

  // three dot 
  const [isThreeDotOpen, setIsThreeDotOpen] = useState(false);
  // three dot index to note
  const [indexForThreeDot, setIndexForThreeDot] = useState(null);

  const toggleThreeDotDropDown = (index) => {
    setIndexForThreeDot(index);
    setIsThreeDotOpen(!isThreeDotOpen);
  }

  const [isLoading, setIsLoading] = useState(true);

  // alert 
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  // for check if reloading without saving data
  const [isDirty, setIsDirty] = useState(false);

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

    // set dirty false
    setIsDirty(false);
  }

  const handleShowModalToPost = (index) => {
    // setting index
    setIndexForEdit(index);
    setServiceDataToUpdate(() => {
      return servicesList[index];
    });
    setModalToPost(true);
  }

  const handleChange = (e) => {
    setServiceDataToUpdate({ ...serviceDataToUpdate, [e.target.name]: e.target.value });
  }

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    if (!serviceDataToUpdate.title || !serviceDataToUpdate.content) {
      setMessageAlert("All Fields Required!");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }
    setIsSubmitting(true);

    if (serviceDataToUpdate?._id) {
      UpdateService(serviceDataToUpdate)
        .then(res => {
          setVariantAlert("success");
          setMessageAlert(res.message);
        })
        .catch(err => {
          setVariantAlert("danger");
          setMessageAlert(err.message);
        })
        .finally(() => {
          setShowAlert(true);
          setServiceDataToUpdate({});
          setIsSubmitting(false);

          // fetch skills
          fetchServices();
        })
    } else {
      AddService(serviceDataToUpdate)
        .then(res => {
          setVariantAlert("success");
          setMessageAlert(res.message);
        })
        .catch(err => {
          setVariantAlert("danger");
          setMessageAlert(err.message);
        })
        .finally(() => {
          setShowAlert(true);
          setServiceDataToUpdate({});
          setIsSubmitting(false);

          // fetch skills
          fetchServices();
        })
    }
    setIndexForEdit(null);
    setModalToPost(false);
    // ensure three dot close on click of submit
    setIsThreeDotOpen(false);

    // set dirty false
    setIsDirty(false);
  }

  const handleNewServiceAdd = () => {
    setServiceDataToUpdate({})
    setModalToPost(true);
  }

  const handleDelete = (id, header) => {
    setModalInfo({
      ...modalInfo,
      body: `Do you really want to delete ${header}?`,
      primaryBtn: "Delete",
      primaryBtnVariant: "danger",
      confirmAction: () => handleConfirmDelete(id)
    });
    setShowModal(true);
  }

  const handleConfirmDelete = (id) => {
    DeleteService(id)
      .then(res => {
        setVariantAlert("warning");
        setMessageAlert(res.message);
      })
      .catch(err => {
        setVariantAlert("danger");
        setMessageAlert(err.message);
      })
      .finally(() => {
        setShowAlert(true);
        setServiceDataToUpdate({});
        closeModal();
        // ensure three dot close on click of edit
        setIsThreeDotOpen(false);

        // fetch services
        fetchServices();
      })
  }

  const handleClickOutside = (e) => {
    // Check if the click is outside the dropdown area
    if (!e.target.closest('.three-dot-dropdown')) setIsThreeDotOpen(false);
    if (e.key === 'Escape') setIsThreeDotOpen(false);
  };

  useEffect(() => {
    if (isThreeDotOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or dropdown close
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    };
  }, [isThreeDotOpen]);


  useEffect(() => {
    if (showModalToPost) {
      // set dirty true
      setIsDirty(true);
    }
  }, [showModalToPost]);

  // Warn user if they try to navigate away
  useUnsavedChangesWarning(isDirty);

  const fetchServices = () => {
    GetServices()
      .then(res => {
        setSericesList((prev) => res);
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => setIsLoading(false))
  }

  // shift forward
  const next = async (currentIndex) => {
    await ChangeSequence(currentIndex, "next");
    fetchServices();
  }

  // shift backward
  const previous = async (currentIndex) => {
    await ChangeSequence(currentIndex, "previous");
    fetchServices();
  }

  useEffect(() => {
    fetchServices();
  }, [indexForEdit]);

  if (isLoading) return <Loading />

  return (
    <>
      <div className="flex flex-wrap justify-around items-center gap-4 p-4 text-sm sm:text-base md:text-lg max-sm:p-3 max-sm:gap-3 poppins">
        {servicesList?.map((service, index) => (
          <div
            className='bg-light-2 rounded border-2 border-light-primary px-4 py-6 w-96 min-h-56 flex flex-col justify-start items-center gap-4 shadow-md transition-all duration-300 ease-in-out max-sm:px-3 max-sm:py-4 max-sm:w-64 max-sm:min-h-64 max-sm:gap-3'
            key={service?._id}
          >
            {/* main content */}
            <div className='flex justify-between items-start gap-2 border-b-2 border-light-primary pb-3 w-full'>
              {/* title  */}
              <h3 className='text-xl md:text-2xl'>
                {service.title}
              </h3>

              {/* action buttons  */}
              <div className="flex gap-2">
                {/* three dot */}
                <div className="relative inline-block text-left">
                  <div className=''>
                    <button
                      onClick={() => toggleThreeDotDropDown(index)}
                      className="bg-transparent items-center focus:outline-none three-dot-dropdown"
                    >
                      <i className="fa-solid fa-ellipsis-vertical text-xl md:text-2xl" />
                    </button>
                  </div>

                  {(isThreeDotOpen && indexForThreeDot === index) && (
                    <div className="absolute right-0 z-10 mt-2 w-28 md:w-32 bg-white border border-gray-300 rounded-md shadow-md">
                      <div className="text-sm md:text-base">
                        {/* edit  */}
                        <div
                          className='px-3 md:px-4 py-2 text-gray-800 cursor-pointer transition-colors duration-300 ease-in-out hover:text-green-500 hover:bg-gray-100'
                          onClick={() => handleShowModalToPost(index)}
                          onMouseEnter={(e) => {
                            e.currentTarget.querySelector('i').classList.add("fa-regular")
                            e.currentTarget.querySelector('i').classList.remove("fa-solid")
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.querySelector('i').classList.remove("fa-regular")
                            e.currentTarget.querySelector('i').classList.add("fa-solid")
                          }}
                        >
                          <i className={`fa-solid fa-pen-to-square`} />
                          <span className='ml-2'>Edit</span>
                        </div>
                      </div>
                      {/* delete  */}
                      <div
                        className="px-3 md:px-4 py-2 text-gray-800 cursor-pointer transition-colors duration-300 ease-in-out hover:text-red-500 hover:bg-gray-100"
                        onClick={() => handleDelete(service?._id, service?.header)}
                        onMouseEnter={(e) => {
                          e.currentTarget.querySelector('i').classList.add("fa-regular")
                          e.currentTarget.querySelector('i').classList.remove("fa-solid")
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.querySelector('i').classList.remove("fa-regular")
                          e.currentTarget.querySelector('i').classList.add("fa-solid")
                        }}
                      >
                        <i className="fa-solid fa-trash-can" />
                        <span className='ml-2'>Delete</span>
                      </div>

                      {/* next  */}
                      {index !== servicesList.length - 1 && (
                        <div onClick={() => next(index)} className="px-3 md:px-4 py-2 text-gray-800 cursor-pointer transition-colors duration-300 ease-in-out hover:text-light-primary">
                          <i className="fa-solid fa-caret-right" />
                          <span className='ml-2'>Next</span>
                        </div>
                      )}

                      {/* previous  */}
                      {index !== 0 && (
                        <div onClick={() => previous(index)} className="px-3 md:px-4 py-2 text-gray-800 cursor-pointer transition-colors duration-300 ease-in-out hover:text-light-primary">
                          <i className="fa-solid fa-caret-left" />
                          <span className='ml-2'>Previous</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* service content  */}
            <div className="w-full">
              <div className='text-sm md:text-base px-2 text-justify leading-5 md:leading-6'>
                {service?.content}
              </div>
            </div>
          </div>
        ))}

        {/* add new service box */}
        <div
          className='bg-light-2 hover:bg-light-3 w-96 max-sm:w-64 h-56 max-sm:h-64 transition-all duration-300 ease-in-out rounded border-2 border-dashed border-light-primary p-2'
        >
          {/* add button */}
          <div
            className={`flex flex-col justify-center items-center h-full w-full cursor-pointer px-2 py-2 sm:py-10`}
            onClick={handleNewServiceAdd}
          >
            <i className="fa-solid fa-plus text-[100px] sm:text-[150px]" />
            <span className='text-lg text-center'>
              Add New Service
            </span>
          </div>
        </div>
      </div>


      {/* Modal from for edit and update data  */}
      <ModalForm
        showModalToPost={showModalToPost}
        closeModalToPost={closeModalToPost}
        handleConfirmSubmit={handleConfirmSubmit}
        dataToUpdate={serviceDataToUpdate}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        formType='service'
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

export default Service
