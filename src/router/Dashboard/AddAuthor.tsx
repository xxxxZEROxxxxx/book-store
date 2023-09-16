import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../services/ApiClient";
import { Author } from "../../types/Books";
import Modal from "../../components/Models/Modal";

const schema = z.object({
  name: z.string().min(2, { message: " Name is required" }),
});
type FormData = z.infer<typeof schema>;

const AddAuthor = () => {
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const [authors, setAuthors] = useState<Author[]>();
  const fetchAuthors = () => {
    ApiClient.get("/Author")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };
  useEffect(() => {
    fetchAuthors();
  }, []);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleOnSubmit = (data: FormData) => {
    // Axios Call

    setIsLoadingAdd(true);

    ApiClient.post("/Author", {
      id: 0,
      name: data.name,
    })
      .then((response) => {
        fetchAuthors();
        console.log(response.data);
        toast.success("Added completed");

        setIsLoadingAdd(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.errors);
        }
        setIsLoadingAdd(false);
      });
  };
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const [AuthorId, setAuthorId] = useState(-1);
  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    ApiClient.delete(`/Author/${AuthorId}`)
      .then(() => {
        fetchAuthors();
        setIsLoadingDelete(false);
        setShowModal(false);

        toast.success("Author deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Author:", error);
        toast.error("Error deleting Author. Please try again later.");
      });
  };
  const [editingAuthor, setEditingAuthor] = useState("");

  const [editingId, setEditingId] = useState(-1);
  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingAuthor(event.target.value);
  };
  const handleSaveEdit = (NameAuthor: string) => {
    const data = authors;
    setAuthors(
      authors!.map((el) => {
        if (editingId === el.id) return { ...el, name: editingAuthor };
        else return el;
      })
    );
    if (NameAuthor === editingAuthor) {
      setEditingId(-1);
      console.log("nothing change");
    } else {
      setIsLoadingEdit(true);
      ApiClient.put(`/Author/${editingId}`, {
        name: editingAuthor,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("Author edited successfully");
          fetchAuthors();
          setIsLoadingEdit(false);
        })
        .catch((error) => {
          setAuthors(data);
          setIsLoadingEdit(false);
          console.error("Error editing Author:", error);
          toast.error("Error editing Author. Please try again later.");
        });
      setEditingId(-1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">
            <div className="card border-0 shadow rounded-3 my-3 mt-">
              <div className="card-body p-4 p-sm-5 ">
                <h2 className="card-title text-center mb-5 fw-light  fs-2">
                  Add Author
                </h2>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                  <div className="form-floating mb-3">
                    <input
                      {...register("name")}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Name"
                    />
                    <label htmlFor="floatingInput"> Name</label>
                    {errors.name && (
                      <span className="text-danger">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-primary btn-login fw-bold">
                      {isLoadingAdd ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                          <span className="ms-2" role="status">
                            Adding ...
                          </span>
                        </>
                      ) : (
                        "Add Author"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">authors</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {authors?.map((author) => (
                <tr key={author.id}>
                  <th scope="col">{author.id}</th>
                  
                    {author.id === editingId ? (
                      <>
                      <td> <input
                          value={editingAuthor}
                          onChange={handleChangeEdit}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        /></td>
                       
                         <td>
                        <button
                          onClick={() => {
                            handleSaveEdit(author.name);
                          }}
                          style={{ display: "initial" }}
                          className="btn btn-outline-success"
                        >
                          {isLoadingEdit ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              ></span>
                              <span role="status">Loading...</span>
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                        </td>
                      </>
                    ) : (
                      <>
                      <td>{author.name}</td>
                        
                        <td>
                          <button
                            onClick={() => {
                              setAuthorId(author.id);
                              setShowModal(!showModal);
                            }}
                            className="  btn btn-outline-danger"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(author.id);
                              setEditingAuthor(author.name);
                            }}
                            className="btn btn-outline-success"
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ---------------------------------------------------------------*/}
      <Modal show={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Author</h5>
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

export default AddAuthor;
