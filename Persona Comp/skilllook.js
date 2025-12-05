async function ClassesNab() {
   try {
    const r = await fetch(
    ("https://www.dnd5eapi.co/api/2014/skills")
    );
    const response = await r.json();
    const content=response.results;
    const skills=[];
    for(let i=0;i<content.length;i++){
    const url="https://www.dnd5eapi.co"+content[i].url;
    const detailsF=await fetch(url);
    const details = await detailsF.json();
    fullClasses[i]=details;
    const list=starting_equipmentList (details.starting_equipment);
    document.getElementById("Name"+i).innerText=content[i].name;
    document.getElementById("Weapon"+i).innerText=list;
    document.getElementById("Hitdie"+i).innerText=details.hit_die;
    }
    console.log("Classes", content);          
  } catch (error) {
    console.error("Something went wrong", error);
  }
};