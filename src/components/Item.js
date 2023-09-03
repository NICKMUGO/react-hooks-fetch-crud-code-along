import React from "react";
function Item({ item, updateList}) {
  console.log(item.isInCart)
function handleAddToCartClick(){
   fetch(`http://localhost:4000/items/${item.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"Application/json"
    },
    body:JSON.stringify({
      isInCart:!item.isInCart,
    })
   })
   .then(resp=>resp.json())
   .then(data=>console.log(data))
   updateList()
}
function handleClick(){
  console.log("clicked" ,item)
  fetch(`http://localhost:4000/items/${item.id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"Aplication/json"
    }
  })
  .then(resp=>resp.json())
  .then(data=>console.log(data))
   updateList()
}
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
       className={item.isInCart ? "remove" : "add"} 
       onClick={handleAddToCartClick} >
        {item.isInCart ? "Remove From" : "Add to"} Cart 
      </button>
      <button className="remove" onClick={handleClick}>Delete</button>
    </li>
  );
}
export default Item;