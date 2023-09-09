import { Tabs } from "@mantine/core";
import CardBook from "./CardBook";
import { dataBooks } from "../../types/User";

const BooksTab = () => {
  const genres = ["Business", "Science", "Fiction", "Philosophy", "Biography"];
  const itemElements = [];


  for (let i = 0; i < 6; i++) {
    itemElements.push(<CardBook key={i} genre="" index={i+1} book={dataBooks[i]} />);
  }
  return (
    <div className="">
      <Tabs defaultValue="ALL Genres">
        <h4 className="mt-">Popular by Genre</h4>
        <Tabs.List position="right">
          <Tabs.Tab  value="ALL Genres">ALL Genres</Tabs.Tab>
          {genres?.map((genre, index) => (
            <Tabs.Tab key={index} value={genre}>
              {genre}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel  value="ALL Genres" pb="xs">
          <div className="container ">
            <div className="row g-2">          
                {itemElements}   
            </div>
          </div>
        </Tabs.Panel>
        {genres?.map((genre, index) => (
          <Tabs.Panel key={index} value={genre}>
            <div className="container ">
              <div className="row g-2">
              {dataBooks.map((book)=>(
               book.value===genre&&(<CardBook genre={genre} index={index} book={book}/>)
  ))}
                  
               
              </div>
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

export default BooksTab;
