const input = document.getElementById("input");
const level = document.getElementsByName("level");
const genre = document.getElementsByName("genre");
const out1 = document.getElementById("out1");
const out2 = document.getElementById("out2");
const out3 = document.getElementById("out3");
let songdata = new Array();
let selectgenresongdata = new Array();
let songnames = new Array();

document.getElementById("test").onclick = async () => {
  songdata = [];
  selectgenresongdata = [];
  songnames = [];
  let genrecount = 0;
  let levelcount = 0;

  try {
    const response = await axios.get('https://reiwa.f5.si/chunirec_all.json');

    let tmp = JSON.stringify(response);
    songdata = JSON.parse(tmp)["data"];
  } catch (error) {
    console.error(error);
  }

  for(let j = 0; j < genre.length; j++) {
    if(genre[j].checked){
      for(let i = 0; i < songdata.length; i++) {
        if(songdata[i]["meta"]["genre"] == genre[j].id){
          selectgenresongdata.push(songdata[i]);
        }
      }
      genrecount = 1;
    }
  }

  if(genrecount == 0){
    for(let i = 0; i < songdata.length; i++){
      if(songdata[i]["meta"]["genre"] != "WORLD'S END"){
        selectgenresongdata.push(songdata[i]);
      }
    }
  }

  for(let j = 0; j < level.length; j++) {
    if(level[j].checked){
      for(let i = 0; i < selectgenresongdata.length; i++) {
        if(selectgenresongdata[i]["data"]["MAS"]["level"] == level[j].id){
          songnames.push(selectgenresongdata[i]["meta"]["title"]);
        }
      }
      levelcount = 1;
    }
  }

  if(levelcount == 0){
    for(let i = 0; i < selectgenresongdata.length; i++) {
      songnames.push(selectgenresongdata[i]["meta"]["title"]);
    }
  }

  out1.innerHTML = "";
  for(let i = 0; i < Math.min(parseInt(input.value), songnames.length); i++) {
    let randomnumber = Math.floor(Math.random()*songnames.length);
    out1.innerHTML += songnames[randomnumber];
    out1.innerHTML += "<br>"
    songnames.splice(randomnumber, 1);
  }
}