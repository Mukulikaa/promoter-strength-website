function showEPD(x){
  if (x.checked){
    document.getElementById("epd").style.display = "block";
    document.getElementById("nucleo").style.display = "none";
  }
}

function showNucleo(x){
  if (x.checked){
    document.getElementById("epd").style.display = "none";
    document.getElementById("nucleo").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", (event)=>{
  document.getElementById("decision-1").click();
})




