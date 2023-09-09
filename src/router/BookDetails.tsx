import { useParams } from "react-router-dom";
import { dataBooks } from "../types/User"



const BookDetails = () => {
    const { BookId } = useParams();
    
        const selectedBook = dataBooks.find(e => e.id == Number(BookId));
    
    
  return selectedBook&&(
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
            <div className="card mb-3" style={{maxWidth:" 1000px", height:"300px"}}>
    <div className="row g-0">
      <div className="col-4 col-md-4">
        <img src={selectedBook.image} className="img-fluid rounded-start" alt="..."/>
      </div>
      <div className="col-8 col-md-8">
        <div className="card-body">
          <h5 className="card-title">{selectedBook.title}</h5>
          <h5 className="card-title">{selectedBook.author}</h5>

          <p className="card-text">{selectedBook.description}</p>
          <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
            </div>
        </div>
    </div>
   
  )
}

export default BookDetails