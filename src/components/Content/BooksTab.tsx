import { Tabs } from "@mantine/core";
import CardBook from "./CardBook";

import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import { Book, Category } from "../../types/Books";


const BooksTab = () => {

  const itemElements = [];
  const [categories, setCategories] = useState<Category[]>();
  
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    ApiClient.get<Book[]>("/Book").then((response) => {
      console.log(response.data);
      setBooks(response.data);
    });
    ApiClient.get("/Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);


  
  for (let i = 0; i < books.length; i++) {
    itemElements.push(<CardBook key={i}   book={books[i]} />);
  }
  return (
    <div className="">
      <Tabs defaultValue="ALL Genres">
        <h4 className="mt-">Popular by Genre</h4>
        <Tabs.List position="right">
          <Tabs.Tab  value="ALL Genres">ALL Genres</Tabs.Tab>
          {categories?.map((category, index) => (
            <Tabs.Tab key={index} value={category.name}>
              {category.name}
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
        {categories?.map((category, index) => (
          <Tabs.Panel key={index} value={category.name}>
            <div className="container ">
              <div className="row g-2">
              {books.map((book)=>(
               book.category.name===category.name&&(<CardBook   key={book.id} book={book}/>)
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
