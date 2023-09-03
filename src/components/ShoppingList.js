import React, { useState ,useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
 function fetching(){
  fetch("http://localhost:4000/items")
    .then(resp=>resp.json())
    .then(data=>{console.log(data)
    setItems(data)
    })
  }
   useEffect(()=>{fetching()},[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  function addItem(itemObj){
    setItems(item=>[...item,itemObj])
    fetch("http://localhost:4000/items",{
      method:"POST",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify(itemObj)
    })

    .then(resp=>resp.json())
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
  }

  return (
    <div className="ShoppingList">
      <ItemForm addItem={addItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} updateList={fetching}/>
        ))}
      </ul>
    </div>
  )}
  export default ShoppingList;