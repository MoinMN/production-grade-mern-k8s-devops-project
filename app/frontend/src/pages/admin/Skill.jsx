import { useEffect, useState } from 'react';
import { GetSkill, UpdateSkill, DeleteSkill, AddSkill, ChangeSequence } from '../../api/skill.api.js';
import useUnsavedChangesWarning from '../../utility/useUnsavedChangesWarning.js';
import Alert from '../../components/Alert.jsx';
import ModalBox from '../../components/admin/Modal.jsx';
import ModalForm from '../../components/admin/ModalForm.jsx';
import * as IconsIO5 from "react-icons/io5";
import * as IconsFA6 from "react-icons/fa6";
import * as IconsFA from "react-icons/fa"
import * as IconsRI from "react-icons/ri";
import * as IconsDI from "react-icons/di";
import * as IconsSI from "react-icons/si";
import * as IconsGr from "react-icons/gr";
import Loading from '@/components/admin/Loading.jsx';

// fa, fa6, ri, di, si, io5, gr icons imported
const iconLibraries = {
  Fa: IconsFA,
  Fa6: IconsFA6,
  Ri: IconsRI,
  Di: IconsDI,
  Si: IconsSI,
  Io5: IconsIO5,
  Gr: IconsGr
};

const Skill = () => {
  // all skill list store here
  const [skillsList, setSkillsList] = useState([]);

  // skill data to update or create new skill
  const [skillData, setSkillData] = useState({});
  const [indexForEdit, setIndexForEdit] = useState(null);

  // submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // three dot 
  const [isThreeDotOpen, setIsThreeDotOpen] = useState(false);
  // three dot index to note
  const [indexForThreeDot, setIndexForThreeDot] = useState(null);

  const toggleThreeDotDropDown = (index) => {
    setIndexForThreeDot(index);
    setIsThreeDotOpen(!isThreeDotOpen);
  }

  // for check if reloading without saving data
  const [isDirty, setIsDirty] = useState(false);

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

  const [showModalToPost, setModalToPost] = useState(false);

  const closeModal = () => setShowModal(false);

  const closeModalToPost = () => {
    setModalToPost(false);
    // ensure after closing modal no data remain 
    setSkillData({});

    // set dirty false
    setIsDirty(false);
  }

  const handleEdit = (index) => {
    setIndexForEdit(index);
    setSkillData(() => {
      return skillsList[index];
    });
    setModalToPost(true);
  }

  const handleChange = (e) => setSkillData({ ...skillData, [e.target.name]: e.target.value })

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    if (!skillData?.name || !skillData?.icon) {
      setVariantAlert("danger");
      setMessageAlert("All Fields Required!");
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);

    // if _id exist then "update" else add "skill"
    if (skillData._id) {
      UpdateSkill(skillData)
        .then(res => {
          setVariantAlert("success")
          setMessageAlert(res.message);
        })
        .catch(err => {
          setVariantAlert("danger")
          setMessageAlert(err.message);
        })
        .finally(() => {
          setShowAlert(true);
          // update to empty object as its job is over
          setSkillData({});
          setIsSubmitting(false);

          // fetch skills
          fetchSkills();
        })
    } else {
      AddSkill(skillData)
        .then(res => {
          setVariantAlert("success")
          setMessageAlert(res.message);
        })
        .catch(err => {
          setVariantAlert("danger")
          setMessageAlert(err.message);
        })
        .finally(() => {
          setShowAlert(true);
          // update to empty object as its job is over
          setSkillData({});
          setIsSubmitting(false);

          // fetch skills
          fetchSkills();
        })
    }
    setIndexForEdit(null);
    setModalToPost(false);
    // ensure three dot close on click of submit
    setIsThreeDotOpen(false);

    // set dirty false
    setIsDirty(false);
  }

  const handleDelete = (id, skill) => {
    setModalInfo({
      ...modalInfo,
      body: `Do you really want to remove ${skill} skill from list?`,
      primaryBtn: "Delete",
      primaryBtnVariant: "danger",
      confirmAction: () => handleConfirmDelete(id)
    });
    setShowModal(true);
  }

  const handleConfirmDelete = (id) => {
    DeleteSkill(id)
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
        closeModal();

        // fetch skills
        fetchSkills();
      })
  }

  const handleNewSkillAdd = () => setModalToPost(true);

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

  const fetchSkills = () => {
    GetSkill()
      .then(res => {
        setSkillsList(res);
      })
      .catch(err => {
        setMessageAlert(err);
        setVariantAlert("danger");
        setShowAlert(true);
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchSkills();
  }, [indexForEdit]);

  // shift forward
  const next = async (currentIndex) => {
    await ChangeSequence(currentIndex, "next");
    fetchSkills();
  }

  // shift backward
  const previous = async (currentIndex) => {
    await ChangeSequence(currentIndex, "previous");
    fetchSkills();
  }

  if (isLoading) return <Loading />

  return (
    <>
      <div className="flex flex-wrap justify-around gap-4 items-center p-4 text-sm sm:text-base md:text-lg max-sm:p-3 max-sm:gap-3 poppins">
        {skillsList?.map((skill, index) => {
          // retrive icon
          // extact library & iconname
          const [lib, iconName] = skill.icon.split("."); // Eg => Fa6.FaReact
          const IconComponent = iconLibraries[lib]?.[iconName];  // fetch icon

          return (
            <div
              className="bg-light-2 w-44 min-h-48 rounded-lg flex flex-col flex-wrap justify-between items-end shadow-md border-2 border-light-primary max-sm:w-36 max-sm:min-h-36"
              key={skill._id}
            >
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
                      onClick={() => handleDelete(skill._id, skill.name)}
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
                    {index !== skillsList.length - 1 && (
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
              <div className="py-2 w-full text-center flex flex-col gap-3 md:gap-4 justify-center items-center">
                {IconComponent
                  ? <IconComponent className="text-[70px] sm:text-[80px] md:text-[100px] text-blue-500" />
                  : <span className="text-gray-400">Icon not found</span>
                }
                <div className="text-base sm:text-lg md:text-2xl text-center px-1 md:px-2">
                  {skill?.name}
                </div>
              </div>
            </div>
          )
        })}


        {/* add skill box  */}
        <div className="bg-light-2 hover:bg-light-3 w-44 min-h-48 rounded-lg shadow-md border-2 border-dashed border-light-primary max-sm:w-36 max-sm:min-h-36 flex">
          <div
            className="py-2 px-2 w-full text-center cursor-pointer flex flex-col justify-center items-center gap-3 md:gap-4"
            onClick={handleNewSkillAdd}
          >
            <div className="text-[70px] sm:text-[80px] md:text-[100px]">
              <i className="fa-solid fa-plus" />
            </div>
            <div className="text-lg ms:text-xl md:text-2xl text-center">
              Add New Skill
            </div>
          </div>
        </div>
      </div>

      {/* Modal from for edit and update data  */}
      <ModalForm
        showModalToPost={showModalToPost}
        closeModalToPost={closeModalToPost}
        handleConfirmSubmit={handleConfirmSubmit}
        dataToUpdate={skillData}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        formType='skill'
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

export default Skill
