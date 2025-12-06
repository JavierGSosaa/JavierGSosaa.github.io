function starting_equipmentList(Elist){
  if (!Elist||Elist.length==0) { 
        return "No Starting Equipment List";
    } 
   const EQ=[];
   const EQC=Elist.length;
   for(let i=0;i<EQC;i++){
    EQ[i]=" "+Elist[i].equipment.name;
   }
   return EQ;
}
async function ClassesNab() {
   try {
    const r = await fetch(
    ("https://www.dnd5eapi.co/api/2014/classes")
    );
    const response = await r.json();
    const content=response.results;
    const fullClasses=[];
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
  
}
  function SortHit(){
    const row=[];let name;let weapon;let hitdie;
    for(let i=0;i<11;i++){
    name=document.getElementById("Name"+i).innerText;
    weapon=document.getElementById("Weapon"+i).innerText;
    hitdie=document.getElementById("Hitdie"+i).innerText;
    row[i]={name,weapon,hitdie};
    };          
   row.sort((a,b)=> b.hitdie-a.hitdie);
    for(let i=0;i<11;i++){
    document.getElementById("Name"+i).innerText=row[i].name;
    document.getElementById("Weapon"+i).innerText=row[i].weapon;
    document.getElementById("Hitdie"+i).innerText=row[i].hitdie;
    };  
     return row;
};
  function NameSort(){
    let S=[];
    S=SortHit(S);
    S.sort((a,b)=>{
      if(a.name<b.name)return -1;
      if(a.name>b.name)return 1;
      return 0;
    });
    for(let i=0;i<11;i++){
    document.getElementById("Name"+i).innerText=S[i].name;
    document.getElementById("Weapon"+i).innerText=S[i].weapon;
    document.getElementById("Hitdie"+i).innerText=S[i].hitdie;
    };
  };
ClassesNab();