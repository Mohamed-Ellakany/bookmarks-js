var webNameInput = document.getElementById("websiteName");
var webURLInput = document.getElementById("websiteURL");
var hintp = document.getElementById("hint");
var websitesList = [];

if (!localStorage.getItem("website")) {
  websitesList = [];
} else {
  websitesList = JSON.parse(localStorage.getItem("website"));
  console.log(websitesList);
  display(websitesList);
}

function addWebsite() {
  var webSite = {
    webName: webNameInput.value,
    webURL: webURLInput.value,
  };

  if (validation()) {
    var websiteExists = false;
    for (var i = 0; i < websitesList.length; i++) {
      if (websitesList[i].webName == webSite.webName) {
        websiteExists = true;
        break;
      }
    }
    if (websiteExists) {
      swal(`failed
website already exists`);
    } else {
      websitesList.push(webSite);
      localStorage.setItem("website", JSON.stringify(websitesList));
      display(websitesList);
      reset();
      swal(`success
you added URL to list`);
    }
  } else {
    swal(`failed
enter a valid URL`);
  }
}

function reset() {
  webNameInput.value = "";
  webURLInput.value = "";
}

function display(arr) {
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    container += `<tr><td>${i}</td>
    <td>${arr[i].webName}</td>
    <td>
      <button onclick="visit(${i})" id="visit" class="btn btn-primary text-white"><a id="anchorVisit" >
        <i class="fa-solid fa-eye me-2"></i>Visit
      </a></button>
    </td>
    <td>
      <button onclick="deleteWebsite(${i})" class="btn btn-danger text-white">
        <i  class="fa-solid fa-trash me-2"></i>Delete
      </button>
    </td></tr>`;
  }
  document.getElementById("tableBody").innerHTML = container;
}

function deleteWebsite(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("website", JSON.stringify(websitesList));
  display(websitesList);
}

function visit(index) {
  open(websitesList[index].webURL);
}

function validation() {
  var regix = /^(https:\/\/www.)[a-z]{2,50}(.com|.org)$/;

  if (regix.test(webURLInput.value.trim())) {
    webURLInput.classList.add("valid");
    webURLInput.classList.remove("invalid");
    hintp.classList.add("d-none");
    hintp.classList.remove("d-block");

    return true;
  } else {
    webURLInput.classList.add("invalid");
    webURLInput.classList.remove("valid");
    hintp.classList.remove("d-none");
    hintp.classList.add("d-block");

    return false;
  }
}
