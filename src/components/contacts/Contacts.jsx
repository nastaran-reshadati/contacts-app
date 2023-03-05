import { useContext } from "react";

import "./Contacts.css";
import { ORANGE } from "../../helpers/Colors";

import { Contact, Spinner } from "../Index";
import NotFound from "../../assets/no-found.gif";
import { Link } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
  const { filteredContacts, loading, deleteContact } =
    useContext(ContactContext);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link
              to={"/contacts/add"}
              className="btn my-4 mx-3"
              style={{ backgroundColor: ORANGE }}
            >
              ساخت مخاطب جدید
              <i
                className="fa fa-plus-circle addtn"
                style={{ verticalAlign: "middle" }}
              ></i>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((C) => (
                <Contact
                  key={C.id}
                  myContact={C}
                  confirmDelete={() => deleteContact(C.id, C.fullname)}
                />
              ))
            ) : (
              <div className="text-center my-5">
                <p className="text-danger h4 mb-5">
                  مخاطب موردنظر شما پیدا نشد :|
                </p>
                <img className="w-25" src={NotFound} alt="" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
