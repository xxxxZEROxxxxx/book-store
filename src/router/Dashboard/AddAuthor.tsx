import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../services/ApiClient";

const schema = z.object({
    
  name: z.string().min(2, { message: " Name is required" }),
 


});
type FormData = z.infer<typeof schema>;

const AddAuthor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleRegister = (data: FormData) => {
    // Axios Call

    setIsLoading(true);

    ApiClient.post("/Author", {
        id: 0,
        name: data.name
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Added completed");

        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.errors);
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">
          <div className="card border-0 shadow rounded-3 my-3 mt-">
            <div className="card-body p-4 p-sm-5 ">
              <h2 className="card-title text-center mb-5 fw-light  fs-2">
              Add Author
              </h2>
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
                    {isLoading ? (
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
      </div>
    </div>
  );
};

export default AddAuthor;