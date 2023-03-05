import { RED, PINK, PURPLE, GREEN } from "../../helpers/Colors";
import { Link } from "react-router-dom";

import Spinner from "../Spinner";

import { useContext } from "react";

import { ContactContext } from "../../context/contactContext";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { contactSchema } from "../../validations/contactValidation";

const Addcontact = () => {
  const { groups, createContact, loading } = useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="container mt-3">
            <h3 style={{ color: PINK }} className="my-4 text-center">
              ساخت مخاطب جدید
            </h3>
            <div className="row">
              <div className="col-s-12 col-md-4 mt-2">
                <Formik
                  initialValues={{
                    fullname: "",
                    photo:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMTmCUPJ4KbWdTGmJd0UYUaNL-44_KXV3iWA&usqp=CAU",
                    mobile: "",
                    email: "",
                    job: "",
                    group: "",
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    createContact(values);
                  }}
                >
                  {/* {formik => ( */}
                  <Form>
                    <div className="my-3">
                      <Field
                        // {...formik.getFieldProps("name")}
                        name="fullname"
                        placeholder="نام و نام خانوادگی..."
                        className="form-control my-1"
                        type="text"
                        style={{ border: `2px solid ${PURPLE}` }}
                      />
                      {/* {formik.touched.fullname && formik.errors.fullname ? (
                      <div className="text-danger text-center">
                        {formik.errors.fullname}
                      </div>
                    ) : null} */}
                      <ErrorMessage
                        name="fullname"
                        render={(msg) => (
                          <div className="text-center text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="my-3">
                      <Field
                        // {...formik.getFieldProps("photo")}
                        name="photo"
                        placeholder="آدرس تصویر..."
                        className="form-control my-1"
                        type="text"
                        style={{ border: `2px solid ${PURPLE}` }}
                      />
                      {/* {formik.touched.photo && formik.errors.photo ? (
                        <div className="text-danger text-center">
                          {formik.errors.photo}
                        </div>
                      ) : null} */}
                      <ErrorMessage
                        name="photo"
                        render={(msg) => (
                          <div className="text-center text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="my-3">
                      <Field
                        // {...formik.getFieldProps("mobile")}
                        name="mobile"
                        placeholder=" شماره تماس..."
                        className="form-control my-1"
                        type="number"
                        style={{ border: `2px solid ${PURPLE}` }}
                      />
                      {/* {formik.touched.mobile && formik.errors.mobile ? (
                        <div className="text-danger text-center">
                          {formik.errors.mobile}
                        </div>
                      ) : null} */}
                      <ErrorMessage
                        name="mobile"
                        render={(msg) => (
                          <div className="text-center text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="my-3">
                      <Field
                        // {...formik.getFieldProps("email")}
                        name="email"
                        placeholder=" آدرس ایمیل ..."
                        className="form-control my-1"
                        type="email"
                        style={{ border: `2px solid ${PURPLE}` }}
                      />
                      {/* {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger text-center">
                          {formik.errors.email}
                        </div>
                      ) : null} */}
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <div className="text-center text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="my-3">
                      <Field
                        // {...formik.getFieldProps("job")}
                        name="job"
                        placeholder="شغل..."
                        className="form-control my-1"
                        type="text"
                        style={{ border: `2px solid ${PURPLE}` }}
                      />
                      {/* {formik.touched.job && formik.errors.job ? (
                        <div className="text-danger text-center">
                          {formik.errors.job}
                        </div>
                      ) : null} */}
                      <ErrorMessage
                        render={(msg) => (
                          <div className="text-center text-danger">{msg}</div>
                        )}
                        name="job"
                      />
                    </div>
                    <Field
                      as="select"
                      className="my-1"
                      name="group"
                      style={{
                        color: "gray",
                        width: "100%",
                        background: "none",
                        border: `2px solid ${PURPLE}`,
                        borderRadius: "3px",
                        padding: "4px 12px",
                      }}
                      // {...formik.getFieldProps("group")}
                    >
                      <option value="">انتخاب گروه</option>

                      {groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </Field>
                    {/* {formik.touched.group && formik.errors.group ? (
                      <div className="text-danger text-center">
                        {formik.errors.group}
                      </div>
                    ) : null} */}
                    <ErrorMessage
                      render={(msg) => (
                        <div className="text-center text-danger">{msg}</div>
                      )}
                      name="group"
                    />

                    <div className="d-flex justify-content-center my-3">
                      <input
                        className="p-2 btn"
                        style={{ margin: "15px 5px", background: GREEN }}
                        type="submit"
                        value="ساخت مخاطب"
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
                  {/* )
                  } */}
                </Formik>
              </div>
              <div className="col-s-12 col-md-8 d-flex align-items-center justify-content-center">
                <img
                  style={{ width: "700px", opacity: "80%" }}
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

export default Addcontact;
