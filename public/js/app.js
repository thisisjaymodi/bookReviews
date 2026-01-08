/* STAR rating */
const strBlock = document.querySelectorAll(".star-block");
strBlock.forEach((block) =>{
    const stars = block.querySelectorAll(".rating i");
    let output = block.querySelector(".rating-text");
    let outputEdit = block.querySelector(".rating-value");

    
   
 
    let currentRating = 0;
    function setRating(rating) {
      currentRating = Number(rating);
      window.location.pathname === "/edit" || window.location.pathname === "/create" ? outputEdit.value = rating : output.textContent = rating;
      
      stars.forEach((star) => {
        const value = Number(star.dataset.value);
        star.classList.toggle(
          "bi-star-fill",
          value <= rating
        ); /* Fill selected stars */
        star.classList.toggle(
          "bi-star",
          value > rating
        ); /* Rest others keep empty stars */
      });
    }

     if (window.location.pathname != "/edit" && window.location.pathname != "/create" ) setRating(output.textContent);
    
    
     if (window.location.pathname === "/edit" || window.location.pathname === "/create") {
      setRating(outputEdit.value);
      stars.forEach((star) => {
        star.addEventListener("click", () => {  
          setRating(Number(star.dataset.value));
          let x = block.querySelector(".dispVal");
          x.textContent = Number(star.dataset.value); 
        });
      });
    }

});

/* Edit effects */
const elements = document.querySelectorAll("#update-review .form-control, #create-review .form-control");
elements.forEach((ele) =>{  
  ele.addEventListener("keyup",(el) =>{
   ele.defaultValue != ele.value ? ele.classList.add("bg-secondary-subtle") : ele.classList.remove("bg-secondary-subtle");
  });
});

/* Facts API via axios */
async function getResponse() {
  let fact = document.getElementById("facts");
  try {
    const config = {
      headers: {
        "X-Api-Key": "FZYGi6wwWJ+LBRmsMkYeug==hygvyQCFzhPhxXcn",
      },
    };
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/factoftheday",
      config
    );
    fact.innerHTML = `<h4>Fact:</h4> ${response.data[0].fact}`;
  } catch (error) {
    fact.innerHTML = `An error occurred.`;
  }
}
getResponse();

/* redirect */
function confirmRedirect(){
 const ok = confirm("Would you like to navigate to main page?");
 if(ok){
   window.location.href = "/";
 }
}

/* Deletion */
function confirmDelete() {
 
  const ok = confirm("Would you like to Delete this book review? data will get deleted permanently!");
 if(!ok){
   return false;
 }
}


/* Read Effects */
/* If word count is more than 20 words then show read more a tag  */
// let reviewItems = document.querySelectorAll(".book-review");

// reviewItems.forEach((item) =>{
//   let newItem =  item.textContent.trim().split(/\s+/);
//   let newItemLen = newItem.textContent.length;
//   let dispItem = newItem.slice(0, 20).join(" ");  
//   if(newItemLen >= 20){
//     item.innerHTML = `${dispItem}`;
//       }
// })


