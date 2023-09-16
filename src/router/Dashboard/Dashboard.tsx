import ApiClient, { baseUrl } from "../../services/ApiClient";
import { useEffect, useState } from "react";
import { Book } from "../../types/Books";
import Modal from "../../components/Models/Modal";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const fetchBooks = () => {
    ApiClient.get<Book[]>("/Book")
      .then((response) => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const [BookId, setBookId] = useState(-1);
  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    ApiClient.delete(`/Book/${BookId}`)
      .then(() => {
        fetchBooks();
        setIsLoadingDelete(false);
        setShowModal(false);

        toast.success("Book deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Book:", error);
        toast.error("Error deleting Book. Please try again later.");
      });
  };
  return (
    <>
      <hr />
      <div className="container mt-5 mb-3">
        <div className="row">
          {books.map((book) => (
            <div className="card" style={{ width: "300px" }}>
              <img
                src={`${baseUrl}/images/thumbs/med/${book.image}`}
                alt=""
                className=""
                style={{ width: "200px", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                {book.author && <p className="">{book.author.name}</p>}
                {book.category && (
                  <span className="">{book.category.name}</span>
                )}
                <p className="card-text">${book.price}</p>
                <button
                  onClick={() => {
                    setBookId(book.id);
                    setShowModal(!showModal);
                  }}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
                <button onClick={() => {}} className="btn btn-outline-success">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Book</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleModalClose}
          ></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to Delete?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleModalClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleModalSubmit}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
