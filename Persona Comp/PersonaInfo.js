

async function PersonaNab() {
  try {
    const r = await fetch(
      "https://api.allorigins.win/get?url=" +
      encodeURIComponent("https://persona-compendium.onrender.com/personas/")
    );

    const response = await r.json();             
    const content = JSON.parse(response.contents); 
    document.getElementById("JumboImage").src=content[0].image;
    for(let i=0;i<16;i++){
    //document.getElementById("Detailed"+i).innerText=content[i].description;
    document.getElementById("Level"+i).innerText=content[i].level;
    document.getElementById("PName"+i).innerText=content[i].name;
    document.getElementById("Arcana"+i).innerText=content[i].arcana;
    document.getElementById("BlobofWords"+i).innerText=content[i].description;
    };
    console.log("Personas:", content);          
  } catch (error) {
    console.error("Something went wrong", error);
  }
  
}

PersonaNab();

function SortLevel(){
content.sort(function(a, b){return a - b});
};

