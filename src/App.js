import "./App.css";

import _ from "lodash";

import {
  Navbar,
  Contacts,
  AddContact,
  ViewContact,
  EditContact,
} from "./components/Index";

import { createContact } from "./services/contactService";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./services/contactService";

import { Route, Routes, useNavigate } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";

import { CURRENTLINE, GREEN, RED } from "./helpers/Colors";

import { ContactContext } from "./context/contactContext";

import { useImmer } from "use-immer";

// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useImmer(false);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [contact, setContact] = useImmer({});
  const [contacts, setContacts] = useImmer([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);

        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const CreateContactForm = async (value) => {
    try {
      setLoading((prevLoading) => !prevLoading);

      const { status, data } = await createContact(value);

      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد ");
        const allContacts = [...contacts, data];

        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setContacts((draft) => {
          console.log(draft);
          console.log(data);
        });
        console.log(contact);
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log("err.message : ", err.message);
      console.log("err : ", err.inner);
      // setErrors(err.inner);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  /// Delete contact
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className="custom-ui p-5 rounded text-center"
            style={{ background: CURRENTLINE }}
          >
            <h3>پاک کردن مخاطب :</h3>
            <p>مطمئنی که میخوای {contactFullname} رو پاک کنی؟</p>
            <button
              style={{ background: RED }}
              className="btn"
              onClick={onClose}
            >
              خیر
            </button>
            <button
              style={{ background: GREEN }}
              className="btn mx-2"
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
            >
              بله
            </button>
          </div>
        );
      },
    });
  };
  // First Way for Delete Contact:

  // const removeContact = async (contactId) => {
  //   try {
  //     setLoading(true);
  //     const response = await deleteContact(contactId)
  //     if (response) {
  //       const { data: contactsData } = await getAllContacts();
  //       setContacts(contactsData);
  //       setLoading(false);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     setLoading(false);
  //   }
  // };

  //Second Way for Delete Contact: (is better than):
  const removeContact = async (contactId) => {
    let allContacts = [...contacts];
    try {
      let updateContacts = allContacts.filter(
        (contact) => contact.id !== contactId
      );

      setContacts(updateContacts);
      setFilteredContacts(updateContacts);

      const { status } = await deleteContact(contactId);
     toast.error("مخاطب با موفقیت حذف شد! 🔥 ", {
       position: "top-center",
       autoClose: 1000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "dark",
     });
    
      //if delete of contact was not success
      if (status !== 200) {
        setContact(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
      setContact(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  //////////////////

  // Search Input

  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);

    setFilteredContacts(
      contacts.filter((user) => {
        return user.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );
    //یعنی مخاطبینی که فول نیم شان حاوی کاراکتری باشد که در سرچ موجود است در یک آرایه جدید ریترن شوند
  }, 1000);

  /////////////////
  return (
    <ContactContext.Provider
      value={{
        loading: loading,
        //جایی که نام کلید و ولیو یکسان باشد میتوانیم یکی رو بنویسیم
        setLoading: setLoading,
        contact: contact,
        setContact: setContact,
        setContacts: setContacts,
        setFilteredContacts,
        contacts: contacts,
        filteredContacts: filteredContacts,
        // onContactChange: onContactChange,
        deleteContact: confirmDelete,
        createContact: CreateContactForm,
        contactSearch: contactSearch,
        groups: groups,
        // errors: errors,
        // setContactQuery,
      }}
    >
      <div>
        {/* <ToastContainer rtl={true} position="top-right" theme="dark" /> */}
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route
            path="/contacts/edit/:contactId"
            element={<EditContact groups={groups} contacts={contacts} />}
          ></Route>
          <Route
            path="/contacts/:contactId"
            element={<ViewContact contacts={contacts} />}
          ></Route>
          <Route path="/contacts/add" element={<AddContact />}></Route>
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
