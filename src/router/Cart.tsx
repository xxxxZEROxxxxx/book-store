import { remove } from "../redux/BookSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Link } from "react-router-dom";
import { baseUrl } from "../services/ApiClient";


const Cart = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.books);

  const calculatedTotal = books.reduce((acc, book) => {
    return acc + book.price;
  }, 0);

  return (
    <>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#d2c9ff" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {books.length} items
                          </h6>
                        </div>
                        {books.map((book) => (
                          <div key={book.id}>
                            {" "}
                            <hr className="my-4" />
                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src={`${baseUrl}/images/thumbs/med/${book.image}`}
                                  className="img-fluid rounded-3"
                                
                                />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted">
                                  {book.author?.name}
                                </h6>
                                <h6 className="text-black mb-0">{book.name}</h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <h6 className="mb-0">$ {book.price}</h6>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <button
                                  onClick={() => {
                                    dispatch(remove(book.id));
                                  }}
                                  className="btn btn-outline-danger px-2"
                                >
                                  remove
                                </button>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a href="#!" className="text-muted">
                                  <i className="fas fa-times"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}

                    
                        <hr className="my-4" />
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link to={"/"} className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              Back to store
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            Items {books.length}
                          </h5>
                          <h5>$ {calculatedTotal}</h5>
                        </div>

                        <h5 className="text-uppercase mb-3">
                          Enter Promo Code
                        </h5>
                        <div className="mb-5">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="promoCodeInput"
                              className="form-control form-control-lg"
                            />
                            <label
                              className="form-label"
                              htmlFor="promoCodeInput"
                            >
                              Enter your code
                            </label>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>$ {calculatedTotal}</h5>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                        >
                          Check out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
