import { useEffect, useState } from 'react';
// about me api
import { GetAboutMe, UpdateAboutMe } from '../../api/aboutme.api';
import useUnsavedChangesWarning from '../../utility/useUnsavedChangesWarning';
import Alert from '../../components/Alert';
import ModalBox from '@/components/admin/Modal';
import Loading from '@/components/admin/Loading';

const Dashboard = () => {
  const [tagLineSkills, setTagLineSkills] = useState([]);
  const [currentInputOfTagLineSkill, setCurrentInputOfTagLineSkill] = useState('');

  const [aboutMeContent, setAboutMeContent] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  // for check if reloading without saving data
  const [isDirty, setIsDirty] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

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

  // Handle 'Enter' key press to add input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInputOfTagLineSkill.trim() !== '') {
      e.preventDefault();
      setTagLineSkills(prevSkills => {
        const updatedSkills = [...prevSkills, currentInputOfTagLineSkill.trim()];
        setCurrentInputOfTagLineSkill(''); // Clear input field after adding
        return updatedSkills; // Set the new skills
      });
    }

    // set dirty true
    setIsDirty(true);
  };

  // Handle submit input
  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!aboutMeContent || tagLineSkills.length === 0) {
      setMessageAlert("All Fields Required!");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }

    setModalInfo((prev) => ({
      ...prev,
      body: "Chief you are updating about me data! Do you really want to update?",
      primaryBtn: "Update",
      primaryBtnVariant: "success",
      confirmAction: () => confirmHandleSubmit()
    }));
    setShowModal(true);
  };

  const confirmHandleSubmit = () => {
    UpdateAboutMe({ tagLineSkills, aboutMeContent })
      .then(res => {
        setMessageAlert(res.message);
        setVariantAlert("success");
      }).catch((err) => {
        setMessageAlert(err.message);
        setVariantAlert("danger");
      })
      .finally(() => {
        setShowAlert(true);
        setShowModal(false);
      });

    // set dirty false
    setIsDirty(false);
  }

  // Handle delete input
  const handleDelete = (indexToDelete) => {
    setTagLineSkills(prev => {
      const updatedSkills = prev.filter((_, index) => index !== indexToDelete);
      return updatedSkills; // Update state with the new array
    });

    // set dirty true
    setIsDirty(true);
  };

  // Fetch data on component mount
  useEffect(() => {
    GetAboutMe()
      .then((res) => {
        if (res?.tagLineSkills) setTagLineSkills(res?.tagLineSkills);
        if (res?.aboutMeContent) setAboutMeContent(res?.aboutMeContent);
      })
      .catch((err) => {
        console.log("Error while getting aboutme info\nError:", err);
      })
      .finally(() => setIsLoading(false))
  }, []);

  // Warn user if they try to navigate away
  useUnsavedChangesWarning(isDirty);

  if (isLoading) return <Loading />

  return (
    <>
      <Alert
        variant={variantAlert}
        showAlert={showAlert}
        message={messageAlert}
        setShowAlert={setShowAlert}
      />

      <div className='w-full h-fit p-4 transition-colors duration-300 ease-in-out text-sm sm:text-base lg:text-lg max-sm:p-3 poppins'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:gap-4'>
          {/* Hii, I am Moin MN...  */}
          <div className="shadow-md">
            {/* Render tagLineSkills as tags */}
            <div className='flex flex-wrap gap-2 p-2 rounded bg-light-2 border-2 border-light-primary'>
              {tagLineSkills.map((input, index) => (
                <div key={index} className="bg-blue-200 hover:bg-blue-300 rounded px-1 py-0.5 md:px-2 md:py-1">
                  <span>{input}</span>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fa-solid fa-xmark mx-1" />
                  </button>
                </div>
              ))}

              {/* Input field */}
              <textarea
                value={currentInputOfTagLineSkill}
                onChange={(e) => {
                  setCurrentInputOfTagLineSkill(e.target.value);

                  // set dirty true
                  setIsDirty(true);
                }}
                onKeyDown={handleKeyPress}
                placeholder="Hii, I am Moin MN..."
                className='border-none p-1 md:p-2 rounded w-full max-sm:min-h-20 focus:outline-none bg-transparent flex-grow caret-light-primary'
                style={{ resize: 'none', }}
                rows={1} // One-line by default, expands automatically
              />
            </div>
          </div>

          <div className="">
            <textarea
              placeholder='About me content...'
              value={aboutMeContent}
              onChange={(e) => {
                setAboutMeContent(e.target.value);

                // set dirty true
                setIsDirty(true);
              }}
              className='bg-light-2 border-2 border-light-primary p-2 md:p-2 rounded w-full min-h-52 focus:outline-none flex-grow caret-light-primary shadow-md'
              style={{ resize: 'vertical', }}
            />
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className='bg-light-primary hover:bg-light-primary2 hover: px-3 md:px-4 py-1 text-light-1 rounded outline-black outline-2 border-none shadow-2xl hover:scale-110 transition-all duration-300 ease-in-out'
            >
              <i className="fa-regular fa-floppy-disk mr-1 md:mr-2" /> Save
            </button>
          </div>
        </form>
      </div>

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
  );
};

export default Dashboard;
