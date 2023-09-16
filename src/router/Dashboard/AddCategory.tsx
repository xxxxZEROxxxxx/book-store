import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../services/ApiClient";
import { Category } from "../../types/Books";
import Modal from "../../components/Models/Modal";

const schema = z.object({
  name: z.string().min(2, { message: " Name is required" }),
});
type FormData = z.infer<typeof schema>;

const AddCategory = () => {
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);


  const [categories, setCategories] = useState<Category[]>();
  const fetchCategories = () => {
    ApiClient.get("/Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleRegister = (data: FormData) => {
    setIsLoadingAdd(true);

    ApiClient.post("/Category", {
      id: 0,
      name: data.name,
    })
      .then((response) => {
        fetchCategories();
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
  const [categoryId, setCategoryId] = useState(-1);
  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    ApiClient.delete(`/Category/${categoryId}`)
      .then(() => {
        fetchCategories();
        setIsLoadingDelete(false);
        setShowModal(false);

        toast.success("Category deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category. Please try again later.");
      });
  };
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const [editingCategory, setEditingCategory] = useState("");

  const [editingId, setEditingId] = useState(-1);
  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingCategory(event.target.value);
  };
  const handleSaveEdit = (NameCategory: string) => {
    const data = categories;
    setCategories(
      categories!.map((el) => {
        if (editingId === el.id) return { ...el, name: editingCategory };
        else return el;
      })
    );
    if (NameCategory === editingCategory) {
      setEditingId(-1);
      console.log("nothing change");
    } else {
      setIsLoadingEdit(true);
      ApiClient.put(`/Category/${editingId}`, {
        name: editingCategory,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("Author edited successfully");
          fetchCategories();
          setIsLoadingEdit(false);
        })
        .catch((error) => {
          setCategories(data);
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
                <form onSubmit={handleSubmit(handleRegister)}>
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
                        "Add Category"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Category</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(categories) &&
                  categories?.map((category) => (
                    <tr key={category.id}>
                      <th scope="col">{category.id}</th>
                      {category.id === editingId ? (
                      <>
                      <td> <input
                          value={editingCategory}
                          onChange={handleChangeEdit}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        /></td>
                       
                         <td>
                        <button
                          onClick={() => {
                            handleSaveEdit(category.name);
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
                      <td>{category.name}</td>
                        
                        <td>
                          <button
                            onClick={() => {
                              setCategoryId(category.id);
                              setShowModal(!showModal);
                            }}
                            className="  btn btn-outline-danger"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(category.id);
                              setEditingCategory(category.name);
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
      </div>
      <Modal show={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Category</h5>
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

export default AddCategory;
