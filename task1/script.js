import { data } from "./data.js";
let selectCity = document.querySelectorAll(".form__select")[0];
let selectWorkshop = document.querySelectorAll(".form__select")[1];
let selectEmployees = document.querySelectorAll(".form__select")[2];
let selectBrigade = document.querySelectorAll(".form__select")[3];
let btnReset = document.querySelector(".btn__reset");
let btnSubmit = document.querySelector(".btn__submit");
let formSuccess = document.querySelector(".form__success");
let formError = document.querySelector(".form__error");

writeToSelect();

selectCity.addEventListener("change", (event) => {
  cityChange(event.target.value);
});

selectWorkshop.addEventListener("change", (event) => {
  workshopChange(event.target.value);
});

selectEmployees.addEventListener("change", (event) => {
  employeesChange(event.target.value);
});

btnReset.addEventListener("click", (event) => {
  event.preventDefault();
  writeToSelect();
});

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    selectCity.options[selectCity.selectedIndex].value === "" ||
    selectWorkshop.options[selectWorkshop.selectedIndex].value === "" ||
    selectEmployees.options[selectEmployees.selectedIndex].value === "" ||
    selectBrigade.options[selectBrigade.selectedIndex].value === ""
  ) {
    formError.textContent = "Ошибка заполните все поля формы";
    formSuccess.textContent = "";
  } else {
    formError.textContent = "";
    formSuccess.textContent = "Успех";
    writeToSelect();
  }
});

function writeToSelect() {
  clearSelect(selectCity);
  clearSelect(selectWorkshop);
  clearSelect(selectEmployees);

  data.forEach((item) => {
    let newOption = new Option(item.city, item.city);
    selectCity.append(newOption);

    item.workshop.forEach((workshop) => {
      let newOption = new Option(workshop, workshop);
      selectWorkshop.append(newOption);
    });

    item.employees.forEach((employee) => {
      let newOption = new Option(employee.name, employee.name);
      selectEmployees.append(newOption);
    });
  });
  selectBrigade.selectedIndex = 0;
}

function cityChange(city) {
  clearSelect(selectWorkshop);
  clearSelect(selectEmployees);
  if (city !== "") {
    data.forEach((item) => {
      if (item.city === city) {
        item.workshop.forEach((workshop) => {
          let newOption = new Option(workshop, workshop);
          selectWorkshop.append(newOption);
        });

        item.employees.forEach((employee) => {
          let newOption = new Option(employee.name, employee.name);
          selectEmployees.append(newOption);
        });
      }
    });
  } else {
    writeToSelect();
  }
}

function workshopChange(workshop) {
  clearSelect(selectWorkshop);
  clearSelect(selectEmployees);
  console.log(workshop);
  if (workshop !== "") {
    data.forEach((item, i) => {
      if (item.workshop.includes(workshop)) {
        selectCity.selectedIndex = i + 1;
        item.workshop.forEach((item_ws) => {
          if (item_ws === workshop) {
            selectWorkshop.append(new Option(item_ws, item_ws, false, true));
          }
        });
        item.employees.forEach((employee) => {
          if (employee.workshop === +workshop.split(" ")[1]) {
            let newOption = new Option(employee.name, employee.name);
            selectEmployees.append(newOption);
          }
        });
      }
    });
  } else {
    data.forEach((item, i) => {
      item.workshop.forEach((workshop) => {
        let newOption = new Option(workshop, workshop);
        selectWorkshop.append(newOption);
      });
    });
  }
}

function employeesChange(employees) {
  clearSelect(selectEmployees);

  if (employees !== "") {
    clearSelect(selectWorkshop);
    data.forEach((item, i) => {
      if (item.employees.some((e) => e.name === employees)) {
        let workshop;
        selectCity.selectedIndex = i + 1;

        item.employees.forEach((employee) => {
          let option;
          if (employee.name === employees) {
            option = new Option(employee.name, employee.name, false, true);
            workshop = employee.workshop;
          }
          selectEmployees.append(option);
        });
        item.workshop.forEach((item_ws) => {
          selectWorkshop.append(
            item_ws.includes(workshop)
              ? new Option(item_ws, item_ws, false, true)
              : new Option(item_ws, item_ws)
          );
        });
      }
    });
  } else {
    data.forEach((item, i) => {
      item.employees.forEach((employee) => {
        let newOption = new Option(employee.name, employee.name);
        selectEmployees.append(newOption);
      });
    });
  }
}

function clearSelect(select) {
  Array.from(select.children).forEach((item, i) => {
    if (i !== 0) item.remove();
  });
}
