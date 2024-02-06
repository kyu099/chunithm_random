const token = "9db684d5a3fcdae0a5c642ed869b749d94a8704b6f1ec44985052fcae76a26cce34da49d068c554d7fda188bb949d5d427fa6ae46fa4aeda896f9965b9292062"
const username = document.getElementById("username");
const targetscore = document.getElementById("target_score");
const target = document.getElementsByName("target");
const level = document.getElementsByName("level");
const genre = document.getElementsByName("genre");
const out1 = document.getElementById("out1");
let songdata = new Array();
let masterdata = new Array();
let selectgenresongdata = new Array();
let selectlevelsongdata = new Array();
let selecttargetsongdata = new Array();

document.getElementById("test").onclick = async () => {
  selectgenresongdata = [];
  selectlevelsongdata = [];
  selecttargetsongdata = [];
  let genrecount = 0;
  let levelcount = 0;
  let distance = 0;

  if(masterdata.length === 0) {
    console.log("SongDataDownload");

    try {
      const response = await axios.get('https://api.chunirec.net/2.0/records/showall.json?region=jp2&user_name=' + username.value + '&token=' + token);
      songdata = response.data.records;
    } catch (error) {
      console.error(error);
      alert("スコアデータを取得できませんでした")
    }

    masterdata = [];
    for(i = 0; i < songdata.length; i++) {
      if(songdata[i].diff == "MAS"){
        masterdata.push(songdata[i]);
      }
    }
  }

  //ジャンル絞り込み
  for(let j = 0; j < genre.length; j++) {
    if(genre[j].checked){
      for(let i = 0; i < masterdata.length; i++) {
        if(masterdata[i]["genre"] == genre[j].id){
          selectgenresongdata.push(masterdata[i]);
        }
      }
      genrecount++;
    }
  }

  if(genrecount == 0){
    for(let i = 0; i < masterdata.length; i++){
      selectgenresongdata.push(masterdata[i]);
    }
  }

  //レベル絞り込み
  for(let j = 0; j < level.length; j++) {
    if(level[j].checked){
      for(let i = 0; i < selectgenresongdata.length; i++) {
        if(selectgenresongdata[i]["level"] == level[j].id){
          selectlevelsongdata.push(selectgenresongdata[i]);
        }
      }
      levelcount = 1;
    }
  }

  if(levelcount == 0){
    for(let i = 0; i < selectgenresongdata.length; i++) {
      selectlevelsongdata.push(selectgenresongdata[i]);
    }
  }

  //目標絞り込み
  if(target[0].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["score"] < 1010000){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else if(target[1].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["is_alljustice"] == false){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else if(target[2].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["is_fullcombo"] == false){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else if(target[3].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["score"] < 1009000){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else if(target[4].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["score"] < 1007500){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else if(target[5].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["score"] < 1005000){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else if(target[6].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["score"] < 1000000){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else if(target[7].checked){
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      if(selectlevelsongdata[i]["score"] < parseInt(targetscore.value)){
        selecttargetsongdata.push(selectlevelsongdata[i]);
      }
    }
  } else {
    for(let i = 0; i < selectlevelsongdata.length; i++) {
      selecttargetsongdata.push(selectlevelsongdata[i]);
    }
  }

  //抽選
  let random =  Math.floor( Math.random() * selecttargetsongdata.length);
  let result = selecttargetsongdata[random];
  console.log(result);

  //結果出力
  out1.innerHTML = "";
  out1.innerHTML += "<b>" + result["title"] + "　" + result["score"] + "</b>";

  if(target[0].checked){
    distance = 1010000 - result["score"];
  } else if(target[3].checked){
    distance = 1009000 - result["score"];
  } else if(target[4].checked){
    distance = 1007500 - result["score"];
  } else if(target[5].checked){
    distance = 1005000 - result["score"];
  } else if(target[6].checked){
    distance = 1000000 - result["score"];
  } else if(target[7].checked){
    distance = parseInt(targetscore.value) - result["score"];
  }

  if(distance > 0){
    out1.innerHTML += "　目標まであと <b>" + distance + "</b><br>";
  } else {
    out1.innerHTML += "<br>";
  }

  if(result == null){
    out1.innerHTML = "条件に該当する楽曲がありません。";
  }
}