// // Star Rating 
 const stars = document.querySelectorAll("#rating i");
 const output = document.getElementById("rating-value");
 let currentRating = 0;
 function setRating(rating) {
    
   currentRating = rating;
   output.textContent = rating;
   stars.forEach((star) => {
     const value = Number(star.dataset.value);
     star.classList.toggle("bi-star-fill", value <= rating); /* Fill selected stars */
     star.classList.toggle("bi-star", value > rating); /* Rest others keep empty stars */
   });
 }

setRating(3);

//  stars.forEach((star) => {
//    star.addEventListener("mouseenter", () =>
//      setRating(Number(star.dataset.value))
//    );
//    star.addEventListener("click", () => setRating(Number(star.dataset.value)));
//  });

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








