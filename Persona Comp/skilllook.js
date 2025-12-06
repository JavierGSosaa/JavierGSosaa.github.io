let allSkills = {};
const skillData = {};
const skillDescriptions = {};
// List Data
const list = document.getElementById("skillList");
// Rearrange list according to filter
function rearrangeList(data)
{
    data.forEach(details => 
    {
        const description = details.desc[0];
        const skillInfo = document.createElement("li");
        skillInfo.innerHTML = `
            <h3>${details.name}</h3>
            <p>${description}</p>
        `;

        list.appendChild(skillInfo);
    });
}
async function SkillsNab() {
  try 
  {
    const r = await fetch("https://www.dnd5eapi.co/api/2014/skills");
    const response = await r.json();
    allSkills = response;
    for( let i = 0; i < allSkills.count; i++)
    {
      const detailsF = await fetch(`https://www.dnd5eapi.co${allSkills.results[i].url}`);
      const details = await detailsF.json();
      skillData[i] = details;
      const description = details.desc[0];
      skillDescriptions[i] = description;
      const skillInfo = document.createElement("li")
      skillInfo.innerHTML = 
      `       <h3>${skillData[i].name}</h3>
              <p>${description}</p> `;
      list.appendChild(skillInfo);

      console.log(skillData[i]);   
    }
  } 
  catch (error) 
  {
    console.error("Something went wrong", error);
  }
};
function SkillSortAZ()
{
    list.innerHTML = '';   
    const sortedSkills = Object.values(skillData).sort((a, b) => 
    { return a.name.localeCompare(b.name); });
    rearrangeList(sortedSkills);
    document.getElementById("dropDown").textContent = "Skills: A-Z";
}
function SkillSortZA()
{
    list.innerHTML = '';
    const sortedSkills = Object.values(skillData).sort((a, b) => 
    { return b.name.localeCompare(a.name); });
    rearrangeList(sortedSkills);
    document.getElementById("dropDown").textContent = "Skills: Z-A";
}
function search(input)
{
    list.innerHTML = '';
    const q = input.trim().toLowerCase();
    if (q === "")
        return rearrangeList(Object.values(skillData));
    const results = Object.values(skillData).filter(s =>
        s.name.toLowerCase().includes(q)
    );
    rearrangeList(results);
}
SkillsNab();