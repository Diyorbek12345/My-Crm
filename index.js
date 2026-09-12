const City = [
  "Toshkent",
  "Jizzah",
  "Samarqand",
  "Navoiy",
  "Buxoro",
  "Qashqadaryo",
  "Surxandaryo",
  "Namangan",
  "Farg'ona",
  "Andijon",
  "Xorazm",
  "Qoraqalpog'iston",
];
const Position = [
  "React",
  "Javascript",
  "Java",
  "C++",
  "Puthon",
  "django",
  "Node js",
];
const TypePosition = ["Junior", "Middle", "Senior"];
const filterPosition = document.querySelector("#filterPosition");
const filterCity = document.querySelector(".btn_filter_city");
const filterTechnology = document.querySelector("#filterTechnology");
const filterPositionAdd = document.querySelector("#filterPositionAdd");
const filtereHometownAdd = document.querySelector("#filterHometown");
const workerForm = document.querySelector("#workerForm");
const workersTable = document.querySelector("#workersTable");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const birthday = document.querySelector("#workerBirthday");
const salary = document.querySelector("#salaryWoker");
const IsMarried = document.querySelector("#isMarried");
const search = document.querySelector("#search");
const formModal = document.querySelector(".modal");
const sendBtn = document.querySelector("#sendBtn");
const searchBtn = document.querySelector(".search");


let workerList = JSON.parse(localStorage.getItem("workers"))
  ? JSON.parse(localStorage.getItem("workers"))
  : [];

["Hometown", ...City].forEach((city) => {
  filterCity.innerHTML += `<option value="${city}">${city}</option>`;
});
["Level", ...TypePosition].forEach((level) => {
  filterPosition.innerHTML += `<option value="${level}">${level}</option>`;
});

Position.forEach((tech) => {
  filterTechnology.innerHTML += `<option value="${tech}">${tech}</option>`;
});

TypePosition.forEach((pos) => {
  filterPositionAdd.innerHTML += `<option value="${pos}">${pos}</option>`;
});

City.forEach((item) => {
  filtereHometownAdd.innerHTML += `<option value="${item}">${item}</option>`;
});
let selected = null;

searchBtn.addEventListener("click", () => {
  search.classList.add("block");
});

function getWorkersTable(
  id,
  firstname,
  lastname,
  city,
  birtday,
  position,
  technology,
  salary,
  isMarried,
) {
  return `
          <tr>
              <th scope="row">${id}</th>
              <td>${firstname}</td>
              <td>${lastname}</td>
              <td>${city}</td>
              <td>${birtday}</td>
              <td>${technology}</td>
              <td>${position}</td>
              <td>${salary}</td>
              <td>${isMarried}</td>
              <td>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "editWorker(${id})" class="edit_btn">Edit</button>
              </td>
              <td>
                <button onclick = "deleteWorker(${id})" class="delete_btn">Delete</button>
              </td>
            </tr>
    `;
}

function getWorkers(newWorkers) {
  workersTable.innerHTML = "";
  let count = 0;
  (newWorkers || workerList).forEach((worker) => {
    count++;
    worker.id = count;
    workersTable.innerHTML += getWorkersTable(
      worker.id,
      worker.firstname,
      worker.lastname,
      worker.city,
      worker.birthday,
      worker.position,
      worker.technology,
      worker.salary,
      worker.isMarried,
    );
  });
}

getWorkers();

workerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let check = this.checkValidity();
  this.classList.add("was-validated");
  if (check) {
    // bootstrap.Modal.getInstance(formModal).hide();
    let newWorker = {
      firstname: firstName.value,
      lastname: lastName.value,
      city: filtereHometownAdd.value,
      birthday: birthday.value,
      technology: filterTechnology.value,
      position: filterPositionAdd.value,
      salary: salary.value,
      isMarried: IsMarried.checked,
    };
    // workerList.push(newWorker);

    if (selected) {
      workerList = workerList.map((worker) => {
        if (worker.id === selected.id) {
          return {
            id: selected.id,
            ...newWorker,
          };
        } else {
          return worker;
        }
      });
    } else {
      newWorker.id = workerList.length;
      workerList.push(newWorker);
    }
    window.location.reload();
    localStorage.setItem("workers", JSON.stringify(workerList));

    getWorkers();
  }
});

// function deleteWorker(id) {
//   const deletedWorkers = workerList.filter((worker) => {
//     return worker.id != id;
//   });

//   localStorage.setItem("workers", JSON.stringify(deletedWorkers));
//   window.location.reload();
//   getWorkers();
// }
function deleteWorker(id) {
  workerList = workerList.filter((worker) => worker.id !== id);
  localStorage.setItem("workers", JSON.stringify(workerList));
  getWorkers();
}

function editWorker(id) {
  let worker = workerList.find((worker) => {
    return worker.id === id;
  });
  selected = worker;
  sendBtn.textContent = "Save";
  firstName.value = worker.firstname;
  lastName.value = worker.lastname;
  filtereHometownAdd.value = worker.city;
  filterPositionAdd.value = worker.position;
  birthday.value = worker.birthday;
  filterTechnology.value = worker.technology;
  salary.value = worker.salary;
  IsMarried.checked = worker.isMarried;
}

search.addEventListener("input", (e) => {
  let search = e.target.value.toLowerCase();

  const searchWorkers = workerList.filter((work) => {
    return (
      work.firstname.toLowerCase().includes(search) ||
      work.lastname.toLowerCase().includes(search)
    );
  });

  getWorkers(searchWorkers);
});

filterCity.addEventListener("change", (e) => {
  if (e.target.value == "Hometown") {
    getWorkers();
  } else {
    getWorkersHomwtown = workerList.filter((worker) => {
      return worker.city == e.target.value;
    });
    getWorkers(getWorkersHomwtown);
  }
});

filterPosition.addEventListener("change", (e) => {
  if (e.target.value == "Level") {
    getWorkers();
  } else {
    filteredLevel = workerList.filter((level) => {
      return level.position == e.target.value;
    });
    getWorkers(filteredLevel);
  }
});
