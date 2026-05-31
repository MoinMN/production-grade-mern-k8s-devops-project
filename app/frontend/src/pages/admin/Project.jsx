import { useEffect, useState } from 'react';
import { GetProject, AddProject, UpdateProject, DeleteProject, ChangeSequence } from '../../api/project.api';
import useUnsavedChangesWarning from '../../utility/useUnsavedChangesWarning';
import Alert from '../../components/Alert';
import ModalBox from '../../components/admin/Modal';
import ModalForm from '../../components/admin/ModalForm';
import { Link } from 'react-router-dom';
import Loading from '@/components/admin/Loading';

const Project = () => {
  // project list
  const [projectsList, setProjectsList] = useState([]);
  // when clicked on edit data will store here
  const [projectDataToUpdate, setProjectDataToUpdate] = useState({});

  // submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // for check if reloading without saving data
  const [isDirty, setIsDirty] = useState(false);

  // three dot 
  const [isThreeDotOpen, setIsThreeDotOpen] = useState(false);
  // three dot index to note
  const [indexForThreeDot, setIndexForThreeDot] = useState(null);

  const [currentInputOfTechno, setCurrentInputOfTechno] = useState('');

  const toggleThreeDotDropDown = (index) => {
    setIndexForThreeDot(index);
    setIsThreeDotOpen(!isThreeDotOpen);
  }

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
    // set dirty false
    setIsDirty(false);
  }

  const handleChange = (e) => setProjectDataToUpdate({ ...projectDataToUpdate, [e.target.name]: e.target.value });

  // project to add
  const handleNewProjectAdd = () => {
    setProjectDataToUpdate({});
    setModalToPost(true);
  }

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // validate
    if (!projectDataToUpdate.title || !projectDataToUpdate.content || !projectDataToUpdate.technology || !projectDataToUpdate.githubLink || !projectDataToUpdate.image) {
      setShowAlert(true);
      setVariantAlert('danger');
      setMessageAlert('* Marked are Mandatory!');
      return;
    }

    // create new project
    if (!projectDataToUpdate._id) {
      AddProject(projectDataToUpdate)
        .then(res => {
          setMessageAlert(res.message);
          setVariantAlert('success');
        })
        .catch(err => {
          setMessageAlert(err.message);
          setVariantAlert('danger');
        })
        .finally(() => {
          setShowAlert(true);
          setModalToPost(false);
          setIsSubmitting(false);

          // fetch projects
          fetchProjects();
        })
    } else {
      // update project
      UpdateProject(projectDataToUpdate)
        .then(res => {
          setMessageAlert(res.message);
          setVariantAlert('success');
        })
        .catch(err => {
          setMessageAlert(err.message);
          setVariantAlert('danger');
        })
        .finally(() => {
          setShowAlert(true);
          setModalToPost(false);
          setIsSubmitting(false);

          // fetch projects
          fetchProjects();
        });
    }

    // set dirty false
    setIsDirty(false);
  }

  const handleDelete = (id, header) => {
    setModalInfo({
      ...modalInfo,
      body: `Do you really want to delete ${header} project?`,
      primaryBtn: "Delete",
      primaryBtnVariant: "danger",
      confirmAction: () => handleConfirmDelete(id)
    });
    setShowModal(true);
  }

  const handleConfirmDelete = (id) => {
    DeleteProject(id)
      .then(res => {
        setVariantAlert('warning');
        setMessageAlert(res.message);
      })
      .catch(err => {
        setVariantAlert('danger');
        setMessageAlert(err.message);
      })
      .finally(() => {
        closeModal(); // ensure modal closes
        setShowAlert(true);

        // fetch projects
        fetchProjects();
      })
  }

  const handleEdit = (index) => {
    setProjectDataToUpdate(() => {
      return projectsList[index];
    })
    setModalToPost(true);
  }

  // detect enter key to add technology in list
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInputOfTechno.trim() !== '') {
      e.preventDefault();
      setProjectDataToUpdate({
        ...projectDataToUpdate,
        technology: [
          ...(projectDataToUpdate?.technology || []),
          currentInputOfTechno
        ]
      });
      setCurrentInputOfTechno('');
    }
  }

  // remove tectnology used in project
  const handleRemoveTechno = (index) => {
    setProjectDataToUpdate({
      ...projectDataToUpdate,
      technology: projectDataToUpdate.technology.filter((_, i) => i !== index)
    })
  }

  const handleImgChange = (e) => {
    setProjectDataToUpdate({ ...projectDataToUpdate, image: e.target.files[0] });
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

    // Clean up the event listener when the component unmounts or dropdown closes
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

  const fetchProjects = () => {
    GetProject()
      .then(res => {
        setProjectsList(res);
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // shift forward
  const next = async (currentIndex) => {
    await ChangeSequence(currentIndex, "next");
    fetchProjects();
  }

  // shift backward
  const previous = async (currentIndex) => {
    await ChangeSequence(currentIndex, "previous");
    fetchProjects();
  }

  if (isLoading) return <Loading />

  return (
    <>
      <div className="flex flex-wrap justify-around items-stretch gap-4 p-4 text-sm sm:text-base md:text-lg max-sm:p-3 max-sm:gap-3 poppins bg-light-1 text-black">
        {projectsList?.map((project, index) => (
          <div
            className='bg-light-2 border-2 border-light-primary px-3 py-1 min-w-[300px] max-w-[400px] md:min-w-[400px] md:max-w-[550px] min-h-72 flex flex-col justify-start gap-3 shadow-md max-sm:w-64 max-sm:min-h-64 max-sm:gap-2'
            key={project._id}
          >
            <div className="flex flex-col items-end">
              <div className="flex-shrink-0 px-2 cursor-pointer relative inline-block">
                {/* three dot */}
                <div>
                  <button
                    onClick={() => toggleThreeDotDropDown(index)}
                    className="bg-transparent items-center focus:outline-none three-dot-dropdown"
                  >
                    <i className="fa-solid fa-ellipsis text-xl md:text-2xl" />
                  </button>
                </div>

                {(isThreeDotOpen && indexForThreeDot === index) && (
                  <div className="absolute right-0 z-10 w-28 md:w-32 bg-white border border-gray-300 rounded-md shadow-md">
                    <div className="text-sm md:text-base">
                      {/* edit  */}
                      <div
                        className={`px-3 md:px-4 py-2 text-gray-800 cursor-pointer transition-colors duration-300 ease-in-out hover:text-green-500 hover:bg-gray-100`}
                        onClick={() => handleEdit(index)}
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
                      onClick={() => handleDelete(project._id, project.header)}
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
                    {index !== projectsList.length - 1 && (
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

              {/* img if any */}
              <img
                src={project.image}
                loading='lazy'
                alt="Project Image Here"
                className='rounded-lg border-2 border-light-primary w-full max-h-52 object-cover'
              />
            </div>

            <div className="flex flex-col justify-center gap-2 max-sm:gap-1">
              {/* title */}
              <h1 className='text-xl md:text-2xl text-center'>
                {project.title}
              </h1>
              {/* info of project */}
              <div className='text-sm md:text-base text-center leading-6 max-sm:leading-4'>
                {project.content}
              </div>
              {/* techno used */}
              <div className="flex flex-wrap gap-1 max-sm:gap-0.5 text-xs md:text-sm text-white">
                {project.technology.map((tech, techIndex) => (
                  <span
                    className='bg-light-primary px-2 py-0.5 rounded-lg'
                    key={techIndex}
                  >
                    {tech}
                  </span>
                ))
                }
              </div>
            </div>
            <div className="flex justify-around gap-2 text-xs sm:text-sm md:text-base pb-2 mt-auto">
              {project.githubLink &&
                <>
                  {/* github repo */}
                  <div className="cursor-pointer px-2 py-0.5 rounded-md shadow-md text-white bg-light-primary2 hover:bg-light-primary3">
                    <Link
                      to={project.githubLink}
                      target='_blank'
                    >
                      GitHub Repo
                    </Link>
                  </div>
                </>
              }
              {project.websiteLink &&
                <>
                  {/* deployed link if any */}
                  <div className="cursor-pointer px-2 py-0.5 rounded-md shadow-md text-white bg-light-primary2 hover:bg-light-primary3">
                    <Link
                      to={project.websiteLink}
                      target='_blank'
                    >
                      Webiste Link
                    </Link>
                  </div>
                </>
              }
              {project.appLink &&
                <>
                  {/* deployed link if any */}
                  <div className="cursor-pointer px-2 py-0.5 rounded-md shadow-md text-white bg-light-primary2 hover:bg-light-primary3">
                    <Link
                      to={project.appLink}
                      target='_blank'
                    >
                      App Link
                    </Link>
                  </div>
                </>
              }
            </div>
          </div>
        ))}

        {/* add new project box  */}
        <div className="bg-light-2 hover:bg-light-3 shadow-md border-2 border-dashed border-light-primary max-sm:w-64 h-fit">
          <div
            className="py-2 px-2 w-96 min-h-96 max-sm:w-full max-sm:min-h-64 text-center cursor-pointer flex flex-col justify-center items-center gap-3 md:gap-4"
            onClick={handleNewProjectAdd}
          >
            <div className="text-[80px] sm:text-[90px] md:text-[110px]">
              <i className="fa-solid fa-plus" />
            </div>
            <div className="text-lg ms:text-xl md:text-2xl text-center">
              Add New Project
            </div>
          </div>
        </div>
      </div>



      {/* Modal from for edit data  */}
      <ModalForm
        showModalToPost={showModalToPost}
        closeModalToPost={closeModalToPost}
        handleConfirmSubmit={handleConfirmSubmit}
        dataToUpdate={projectDataToUpdate}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        formType='project'

        currentInputOfTechno={currentInputOfTechno}
        setCurrentInputOfTechno={setCurrentInputOfTechno}
        handleKeyPress={handleKeyPress}
        handleRemoveTechno={handleRemoveTechno}
        handleImgChange={handleImgChange}
      />

      {/* alert  */}
      <Alert
        variant={variantAlert}
        showAlert={showAlert}
        message={messageAlert}
        setShowAlert={setShowAlert}
      />

      {/* Modal Box  */}
      <ModalBox
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

export default Project
