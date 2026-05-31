import { useEffect, useState } from 'react'
import { Get, Delete } from '../../api/contact.api'
import ModalBox from '../../components/admin/Modal';
import Alert from '../../components/Alert';
import { Link } from 'react-router-dom';
import Loading from '@/components/admin/Loading';

const Contact = () => {
  const [contacts, setContacts] = useState([]);

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

  // alert 
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (_id) => {
    setModalInfo({
      ...modalInfo,
      body: "Do you really want to delete this contact data?",
      primaryBtn: "Confirm",
      primaryBtnVariant: "danger",
      confirmAction: () => handleConfirmDelete(_id)
    });
    setShowModal(true);
  }

  const handleConfirmDelete = (_id) => {
    Delete(_id)
      .then(res => {
        setMessageAlert(res?.message);
        setVariantAlert("warning")
        // Remove the deleted contact from the state
        setContacts(prev => prev.filter(contact => contact._id !== _id));
      })
      .catch(err => {
        setMessageAlert(err?.message);
        setVariantAlert("danger")
      })
      .finally(() => {
        setShowModal(false);
        setShowAlert(true);
      })
  }

  useEffect(() => {
    setIsLoading(true);

    Get()
      .then(res => {
        setContacts(res);
      })
      .catch(err => {
        setMessageAlert(err?.message);
        setVariantAlert("danger")
        setShowAlert(true);
      })
      .finally(() => setIsLoading(false))
  }, []);

  function formatDate(isoString) {
    if (!isoString) return "";

    const date = new Date(isoString);
    if (isNaN(date)) return "";

    const pad = (num) => String(num).padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  if (isLoading) return <Loading />

  return (
    <>
      {contacts?.length !== 0 ?
        <>
          <div className="overflow-x-auto">
            <table className="text-sm sm:text-base poppins min-w-full table-auto border-collapse text-left">
              <thead>
                <tr>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "2%" }}>
                    #
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "7%" }}>
                    Name
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "6%" }}>
                    Email
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "6%" }}>
                    Number
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "9%" }}>
                    Subject
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "11%" }}>
                    Content
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "7%" }}>
                    Date
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2 border-b font-semibold" style={{ width: "3%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((cont, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-light-1' : 'bg-light-2'} hover:bg-slate-100`}>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">{index + 1 + '.'}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">{cont?.name}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      <Link to={"mailto:" + cont?.email} className="text-light-primary hover:text-light-primary2">
                        {cont?.email}
                      </Link>
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 overflow-hidden text-ellipsis">
                      {cont?.number
                        ?
                        <Link to={"tel:+91" + cont?.number}>
                          {cont?.number}
                        </Link>
                        : "-"
                      }
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 overflow-hidden text-ellipsis">{cont?.subject}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 overflow-hidden text-ellipsis">{cont?.message}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 overflow-hidden text-ellipsis">{formatDate(cont?.createdAt)}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      <i
                        className='fa-solid fa-trash-can cursor-pointer text-xl md:text-2xl hover:text-red-500 transition-all duration-200 ease-in-out'
                        onClick={() => handleDelete(cont?._id)}
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
            </table>
          </div>
        </>
        :
        <>
          <h3 className='px-4 py-3 text-sm sm:text-base md:text-lg max-sm:p-3 max-sm:gap-3 poppins'>
            No contact data is currently available!
          </h3>
        </>
      }



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

export default Contact
