const nameForm = document.querySelector(".nameForm");
const emailForm = document.querySelector(".emailForm");
const passwordForm = document.querySelector(".passwordForm");
const userDatas = document.querySelector(".userDatas");
const postdata = document.querySelector(".postdata");
const submitBtn = document.querySelector(".submitBtn");

//update
const updateContainer = document.querySelector(".updateContainer");
const nameUpdate = document.querySelector(".nameUpdate");
const emailUpdate = document.querySelector(".emailUpdate");
const updateBtn = document.querySelector(".updateBtn");
//update

//delete
const delContainer = document.querySelector(".delContainer");
const cancelBtn = document.querySelector(".cancelBtn");
const deleteBtn = document.querySelector(".deleteBtn");
//delete

//function start

const postNewUser = () => {
  const data = {
    id: `${jsonDatas.length + 1}`,
    name: `${nameForm.value}`,
    email: `${emailForm.value}`,
    pwd: `${passwordForm.value}`,
  };

  return data;
};

const clearFun = () => {
  nameForm.value = "";
  emailForm.value = "";
  passwordForm.value = "";
};

const updateFun = (data) => {
  // updateContainer.style.opacity = "1";
  delContainer.style.display = "none";
  updateContainer.style.display = "block";
  nameUpdate.value = data.name;
  emailUpdate.value = data.email;
};

const putUserData = () => {
  const data = {
    name: nameUpdate.value,
    email: emailUpdate.value,
  };
  return data;
};

let delData = {};
const delFun = (data) => {
  delContainer.style.display = "block";
  delData = {
    name: data.name,
    email: data.email,
    pwd: data.pwd,
  };
  return delData;
};

//function end

let jsonDatas;
const fetchInfo = async () => {
  const url = "http://localhost:3000/users";
  const fetchDatas = await fetch(url);
  jsonDatas = await fetchDatas.json();

  for (let i = 0; i < jsonDatas.length; i++) {
    const obj = jsonDatas[i];
    const fromServerUsers = `
    <div class="serverUser bg-secondary rounded p-2 px-3 m-1 col-5 mx-2">
      <div>
        <div class="m-1 fw-bold text-white">id: ${i + 1}</div>
        <div class="m-1 fw-bold text-white">name: ${jsonDatas[i].name}</div>
        <div class="m-1 fw-bold text-white">email: ${jsonDatas[i].email}</div>
        <div class="m-1 fw-bold text-white">pwd: ${jsonDatas[i].pwd}</div>
      </div>

      <div class="mt-2">
        <button type="button"  onclick='updateFun(${JSON.stringify(
          jsonDatas[i]
        )})' class="btn btn-light editBtn">
           edit
        </button>
        <button type="button" onclick = delFun(${JSON.stringify(
          jsonDatas[i]
        )}) class="btn btn-danger delBtn">
           delete
        </button>        

      </div>

    </div>
    `;
    userDatas.innerHTML += fromServerUsers;
  }
};

fetchInfo();

submitBtn.addEventListener("click", async () => {
  const checkCon = nameForm.value.length > 0;
  if (checkCon) {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(postNewUser()),
    });
    userDatas.innerHTML = "";
    fetchInfo();
    clearFun();
  } else {
    console.log("register error");
  }
});

updateBtn.addEventListener("click", async () => {
  updateContainer.style.display = "none";
  const response = await fetch("http://localhost:3000/users", {
    method: "PUT",
    body: JSON.stringify(putUserData()),
  });
  userDatas.innerHTML = "";
  fetchInfo();
});

cancelBtn.addEventListener("click", () => {
  updateContainer.style.display = "none";
  delContainer.style.display = "none";
});

deleteBtn.addEventListener("click", async () => {
  updateContainer.style.display = "none";
  delContainer.style.display = "none";
  const response = await fetch("http://localhost:3000/users", {
    method: "DELETE",
    body: JSON.stringify(delData),
  });
  userDatas.innerHTML = "";
  fetchInfo();
});
