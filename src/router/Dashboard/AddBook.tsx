import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../services/ApiClient";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];
const schema = z.object({
  name: z.string().min(2, { message: " Name is required" }),
  price: z.number({ invalid_type_error: "Price is required" }).min(1, { message: "at least 1 dollar" }),

  imageFile: z
  .instanceof(FileList)
  .refine((files) => files?.length == 1, "Image is required.")
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), ".jpg, .jpeg, .png and .webp files are accepted."),
  about: z.string().min(30),
  publishYear: z.number().min(4, { message: "publishYear is required " }),
  pageCount:z.number().min(1),
  categoryId:z.number().min(1),

});
type FormData = z.infer<typeof schema>;

const AddBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleRegister = (data: FormData) => {
    // Axios Call

    setIsLoading(true);
    const bookData = new FormData();

    bookData.append("Name", data.name);
    bookData.append("Price", String(data.price));
    bookData.append("ImageFile", data.imageFile[0]);
    bookData.append("About", data.about);
    bookData.append("PublishYear", String(data.publishYear));
    bookData.append("PageCount", String(data.pageCount));
    bookData.append("AuthorId", "1");
    bookData.append("PublisherId", "1");
    bookData.append("CategoryId",  String(data.categoryId));
    ApiClient.post("/Book", bookData)
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
              Add Book
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
                <div className="form-floating mb-3">
                  <input
                    {...register("price",{valueAsNumber:true})}
                    className="form-control"
                    id="floatingInput"
                    placeholder="price"
                  />
                  <label htmlFor="floatingInput">price</label>
                  {errors.price && (
                    <span className="text-danger">{errors.price.message}</span>
                  )}
                </div>
                
               
                  <div className="input-group mb-3">
                    <input  {...register("imageFile")}
                      type="file"
                      className="form-control"
                      id="inputGroupFile01"
                    />
                
                 
                </div>
                {errors.imageFile && (
                    <p className="text-danger">
                      {errors.imageFile.message}
                    </p>
                  )}
                <div className="form-floating mb-3">
                  <input
                    {...register("about")}
                    type="text"
                    className="form-control"
                    id="about"
                    placeholder="about"
                  />
                  <label htmlFor="about">about</label>
                  {errors.about && (
                    <span className="text-danger">{errors.about.message}</span>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("publishYear",{valueAsNumber:true})}
                    type="text"
                    className="form-control"
                    id="publishYear"
                    placeholder="Example  1960"
                  />
                  <label htmlFor="publishYear">publishYear</label>
                  {errors.publishYear && (
                    <span className="text-danger">{errors.publishYear.message}</span>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("pageCount" ,{valueAsNumber:true})}
                    type="number"
                    className="form-control"
                    id="pageCount"
                    placeholder="pageCount "
                  />
                  <label htmlFor="publishYear">pageCount</label>
                  {errors.pageCount && (
                    <span className="text-danger">{errors.pageCount.message}</span>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("categoryId" ,{valueAsNumber:true})}
                    type="number"
                    className="form-control"
                    id="pageCount"
                    placeholder="pageCount "
                  />
                  <label htmlFor="publishYear">categoryId</label>
                  {errors.categoryId && (
                    <span className="text-danger">{errors.categoryId.message}</span>
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
                      "Add Book"
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

export default AddBook;
