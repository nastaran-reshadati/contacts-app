import { Link } from "react-router-dom";
import { ORANGE, CYAN, RED, CURRENTLINE, } from "../../helpers/Colors";

const Contact = ({ myContact, confirmDelete }) => {
  return (
    <div className="col-md-6">
      <div className="card my-2" style={{ background: CURRENTLINE }}>
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{
            height: "auto",
            margin: "0px 5px 2px 25px",
            padding: "20px 0",
          }}
        >
          <div className="col-sm-4 col-md-4 image-wrapper ">
            <img
              className="rounded"
              style={{minHeight : '230px', height: "auto", width: "230px" }}
              src={myContact.photo}
              alt={myContact.photo}
            />
          </div>

          <div className="col-md-7 col-sm-7 my-2">
            <ul
              className="list-group list-group-flush"
              style={{ borderRadius: "5px" }}
            >
              <li className="list-group-item list-group-item-dark p-1 py-3 h-100 ">
                نام و نام خانوادگی:{" "}
                <span className="fw-bold" style={{ fontSize: "15px" }}>
                  {" "}
                  {myContact.fullname}
                </span>
              </li>
              <li className="list-group-item list-group-item-dark py-3 ">
                شماره تماس :{" "}
                <span className="fw-bold"> {myContact.mobile}</span>
              </li>
              <li className="list-group-item list-group-item-dark py-3 text-center">
                آدرس ایمیل :{""}
                <span className="fw-bold"> {myContact.email}</span>
              </li>
            </ul>
          </div>

          <div className="col-md-1 col-sm-1 buttons">
            <Link
              to={`/contacts/${myContact.id}`}
              style={{ backgroundColor: ORANGE }}
              className="btn my-1"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/contacts/edit/${myContact.id}`}
              style={{ backgroundColor: CYAN }}
              className="btn my-1"
            >
              <i className="fa fa-pen"></i>
            </Link>
            <button
              onClick={confirmDelete}
              style={{ backgroundColor: RED }}
              className="btn my-1"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
