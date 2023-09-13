import { NavLink } from "react-router-dom";
import { Rating } from "@mantine/core";
import { Book } from "../../types/Books";
import { baseUrl } from "../../services/ApiClient";

type CardBookProp = {
  book: Book;
};

const CardBook = ({ book }: CardBookProp) => {
  return (
    <div className="col-12 col-md-6">
      <div className="p-1">
        <div className="card-book mt-4">
          <div className="mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-4 col-md-4" style={{ marginTop: "-20px" }}>
              <NavLink style={{ textDecoration: "none", color: "black" }} to={`/Books/${book.id}`}> <img
                  src={`${baseUrl}/images/thumbs/med/${book.image}`}
                  alt=""
                  className=""
                  style={{ width: "100%", height: "auto" }}
                /></NavLink>
               
              </div>
              <div className="col-8 col-md-8">
                <div className="card-body ">
                  <h5 className="card-title">
                  <NavLink style={{ textDecoration: "none", color: "black" }} to={`/Books/${book.id}`}>
                      {book.name}
                    </NavLink>
                  </h5>
                  <h6 className="card-title"> by {book.author.name}</h6> 
                  <Rating value={4.5} fractions={2} readOnly /><span>1,987,667 voters</span>
                  <p className="card-text">
                    <small>lorem ipum dolor sit amet , conset tur adipiscing elit sed do eiusmo tempor inclididunt ut lebore et.</small>
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBook;

