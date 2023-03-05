//Before Use Formik//
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import { useState, useContext } from "react";
import { RED, COMMENT, PURPLE, GREEN } from "../../helpers/Colors";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import {
  getContact,
  updateContact,
  getAllContacts,
} from "../../services/contactService";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";

import { ContactContext } from "../../context/contactContext";

import { useImmer } from "use-immer";

// import { ToastContainer, toast } from "react-toastify";
import toast from "react-hot-toast";

const EditContact = () => {
  const {
    loading,
    setLoading,
    setFilteredContacts,
    groups,
    contacts,
    setContacts,
  } = useContext(ContactContext);
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [editContact, setEditContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setEditContact(contactData);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitData = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);

      if (status === 200) {
        // toast.info('مخاطب با موفقیت ویرایش شد :)')
        // toast("مخاطب ویرایش شد !", {
        //   icon: "👏",
        // });
        toast.success("مخاطب ویرایش شد 👏");
        setLoading(false);

        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
      }
      setFilteredContacts((draft) => {
        const contactIndex = draft.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        draft[contactIndex] = { ...data };
      });

      navigate("/contacts");
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="text-danger">
          <div className="container mt-3">
            <h3 style={{ color: PURPLE }} className="my-4 text-center">
              ویرایش مخاطب
            </h3>
            <div className="row">
              <div className="col-s-12 col-md-6 mt-2">
                <Formik
                  initialValues={editContact}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    submitData(values);
                  }}
                >
                  <Form>
                    <div>
                      <Field
                        name="fullname"
                        className="form-control my-3 p-2"
                        type="text"
                        placeholder="نام و نام خانوادگی..."
                        style={{ border: `2px solid ${COMMENT}` }}
                      />
                      <ErrorMessage
                        name="fullname"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div>
                      <Field
                        name="photo"
                        className="form-control my-3"
                        type="text"
                        placeholder="آدرس تصویر..."
                        style={{ border: `2px solid ${COMMENT}` }}
                      />
                      <ErrorMessage
                        name="photo"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div>
                      <Field
                        name="mobile"
                        className="form-control my-3"
                        type="text"
                        placeholder="شماره تماس..."
                        style={{ border: `2px solid ${COMMENT}` }}
                      />
                      <ErrorMessage
                        name="mobile"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div>
                      <Field
                        name="email"
                        className="form-control my-3"
                        type="text"
                        placeholder=" آدرس ایمیل ..."
                        style={{ border: `2px solid ${COMMENT}` }}
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div>
                      <Field
                        className="form-control my-3"
                        type="text"
                        placeholder="شغل..."
                        style={{ border: `2px solid ${COMMENT}` }}
                        name="job"
                      />
                      <ErrorMessage
                        name="job"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <Field
                      as="select"
                      name="group"
                      style={{
                        color: "gray",
                        width: "100%",
                        background: "none",
                        border: `2px solid ${COMMENT}`,
                        borderRadius: "3px",
                        padding: "4px 12px",
                      }}
                    >
                      <option value="">انتخاب گروه</option>

                      {groups.length > 0 &&
                        groups.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </Field>
                    <ErrorMessage
                      name="group"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                    <div className="d-flex justify-content-center">
                      <input
                        className="p-2 btn"
                        style={{ margin: "15px 5px", background: GREEN }}
                        type="submit"
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="px-4 btn"
                        style={{ margin: "15px 5px", background: RED }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="col-s-12 col-md-6 mt-4">
                <img
                  className="w-100"
                  src={require("../../assets/man-taking-note.png")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditContact;
