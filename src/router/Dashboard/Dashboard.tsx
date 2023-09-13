import { NavLink } from "react-router-dom";
import { useAppDispatch,  } from "../../redux/store";
import ApiClient, { baseUrl } from "../../services/ApiClient";
import { remove } from "../../redux/BookSlice";
import { useEffect, useState } from "react";
import { Book } from "../../types/Books";

const Dashboard = () => {
 
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    ApiClient.get<Book[]>("/Book").then((response) => {
      console.log(response.data);
      setBooks(response.data);
    });
  }, []);
  const dispatch = useAppDispatch();
  return (
    <>
      <ul>
        <li>
          <NavLink to="/Add"> Add Book</NavLink>
        </li>
        <li><NavLink to="/AddCategory"> Add Category</NavLink> </li>
        <li><NavLink to="/AddAuthor">Add Author</NavLink> </li>
      </ul>
      <hr />
      <div className="container mt-5 mb-3"  >
        <div className="row">
          {books.map((book)=>   <div className="card" style={{ width: "300px" }}>
          <img
                  src={`${baseUrl}/images/thumbs/med/${book.image}`}
                  alt=""
                  className=""
                  style={{ width: "100%", height: "300px" }}
                />
            <div className="card-body">
              <h5 className="card-title">{book.name}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button onClick={()=>{dispatch((remove(book.id)))}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>)}

          
         
        </div></div>
      
    </>
  );
};

export default Dashboard;
