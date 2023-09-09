import { Link } from "react-router-dom";
import { book } from "../../types/User";
import { Rating } from "@mantine/core";
type CardBookProp ={
index:number
  genre:string|null,
  book:book
}


const CardBook = ({genre,index,book}:CardBookProp) => {
  return (
    <div className="col-12  col-md-6">
    <div className="p-1">
  
    <div className="card-book mt-4">
      <div className=" mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-4 col-md-4" style={{marginTop:"-20px"}}>
            <img src="src/assets/ee.jpg" alt="" className="" />
          </div>
          <div className="col-8 col-md-8 " >
            <div className="card-body mr-3">
            <h5 className="card-title">{book.title}</h5>
              <h5 className="card-title">{book.author}</h5>
              <Rating value={book.rating} fractions={2} readOnly />
              <p className="card-text">
               <h4> {genre}</h4>
                <small>
                  {book.description}
                </small>
                .
              </p>
              <h5 className="card-title"><Link  to={`/Books/${index}`} >more details</Link></h5>
            </div>
          </div>
          
          <small>
          
          </small>
          
        </div>
       
      </div>
    </div>
    </div>
  </div>
  );
};

export default CardBook;
