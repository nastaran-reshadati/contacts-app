import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import Spinner from "../Spinner";

import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/Colors";

import { ContactContext } from "../../context/contactContext";

import { getContact, getGroup } from "../../services/contactService";

////////////////////////////////////////////////////////////////////////////

const ViewContact = () => {
  const { contactId } = useParams();

  const [state, setState] = useState({
    contact: {},
    group: {},
  });

  const { loading, setLoading } = useContext(ContactContext);

  useEffect(() => {
    const fethData = async () => {
      try {
        setLoading(true);

        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);

        setLoading(false);
        setState({
          contact: contactData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fethData();
  }, []);
  const { contact, group } = state;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12 col-l-12 col-xl-12">
            <h3 style={{ color: CYAN }} className="text-center">
              اطلاعات مخاطب{" "}
            </h3>
          </div>
        </div>
      </div>

      <hr style={{ backgroundColor: CYAN }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={contact.photo}
                      alt=""
                      className="img-fluid rounded w-100"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span
                          className="fw-bold"
                          style={{ color: CURRENTLINE }}
                        >
                          {contact.fullname}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span
                          className="fw-bold"
                          style={{ color: CURRENTLINE }}
                        >
                          {contact.mobile}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل :{" "}
                        <span
                          className="fw-bold"
                          style={{ color: CURRENTLINE }}
                        >
                          {contact.email}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل :{" "}
                        <span
                          className="fw-bold"
                          style={{ color: CURRENTLINE }}
                        >
                          {contact.job}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه :{" "}
                        <span
                          className="fw-bold"
                          style={{ color: CURRENTLINE }}
                        >
                          {group.name}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
