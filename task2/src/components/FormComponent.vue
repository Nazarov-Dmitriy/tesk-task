<template>
  <h1 class="title">Задание 1</h1>
  <form class="form">
    <div class="input__wraper">
      <label class="form__label">Город</label>
      <select
        class="form__select"
        v-model="selected.city"
        @change="changetCity()"
      >
        <option value="" selected>Выберите регион</option>
        <option
          v-for="option in listCity"
          :value="option"
          v-text="option"
          :key="option"
        />
      </select>
    </div>

    <div class="input__wraper">
      <label class="form__label">Цех</label>
      <select
        class="form__select"
        v-model="selected.workshop"
        @change="changetWorkShop()"
      >
        <option value="" selected>Выберите цех</option>
        <option
          v-for="option in listWorkshop"
          :value="option"
          v-text="option"
          :key="option"
        />
      </select>
    </div>

    <div class="input__wraper">
      <label class="form__label">Сотрудник</label>
      <select
        class="form__select"
        v-model="selected.employees"
        @change="changeEmployees()"
      >
        <option value="" selected>Выберите cотрудник</option>
        <option
          v-for="option in listEmployees"
          :value="option"
          v-text="option"
          :key="option"
        />
      </select>
    </div>

    <div class="input__wraper">
      <label class="form__label" for="brigade">Бригада</label>
      <select
        class="form__select"
        id="brigade"
        v-model="selected.brigade"
        @change="changeBrigade()"
      >
        <option value="" selected>Выберите бригаду</option>
        <option value="Бригада 1">Бригада 1</option>
        <option value="Бригада 2">Бригада 2</option>
      </select>
    </div>
    <div class="btns">
      <button class="btn btn__submit" @click="submit($event)">
        Отправить форму
      </button>
      <button class="btn btn__reset" @click="reset($event)">
        Сбросить форму
      </button>
    </div>

    <p v-if="isSuccess" class="form__success">Форма успешно отправлена</p>
    <p v-if="isError" class="form__error">Заполните все поля формы</p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { data } from "../data/data";
import IData from "../interface/IData";

interface IDataComponent {
  listCity: string[];
  listWorkshop: string[];
  listEmployees: string[];
  listBrigade: string;
  isSuccess: boolean;
  isError: boolean;
  selected: {
    city: string;
    workshop: string;
    employees: string;
    brigade: string;
  };
}

export default defineComponent({
  name: "FormComponent",

  data(): IDataComponent {
    return {
      listCity: [],
      listWorkshop: [],
      listEmployees: [],
      listBrigade: "",
      isSuccess: false,
      isError: false,
      selected: {
        city: "",
        workshop: "",
        employees: "",
        brigade: "",
      },
    };
  },

  mounted() {
    this.writeToSelect();

    let result: any = document.cookie.match(new RegExp("form" + "=([^;]+)"));
    result && (result = JSON.parse(result[1]));
    if (result !== null) {
      this.selected = result;
      console.log(this.selected);
      if (result.employees !== "") {
        this.changeEmployees();
      } else if (result.workshop !== "") {
        this.changetWorkShop();
      } else if (result.city !== "") {
        this.changetCity();
      }
    }
  },
  methods: {
    writeToSelect() {
      data?.forEach((item: IData) => {
        this.listCity.push(item.city);
        item.workshop.forEach((item) => this.listWorkshop.push(item));
        item.employees.forEach((item) => this.listEmployees.push(item.name));
      });
    },
    changetCity(): void {
      if (this.selected.city !== "") {
        this.listWorkshop = [];
        this.listEmployees = [];
        this.selected.workshop = "";
        this.selected.employees = "";
        data?.forEach((item: IData) => {
          if (item.city === this.selected.city) {
            item.workshop.forEach((item) => this.listWorkshop.push(item));
            item.employees.forEach((item) =>
              this.listEmployees.push(item.name)
            );
          }
        });
        this.setCookie();
      } else {
        this.listWorkshop = [];
        this.listEmployees = [];
        data?.forEach((item: IData) => {
          item.workshop.forEach((item) => this.listWorkshop.push(item));
          item.employees.forEach((item) => this.listEmployees.push(item.name));
        });
        this.setCookie();
      }
    },
    changetWorkShop(): void {
      if (this.selected.workshop !== "") {
        this.listWorkshop = [];
        this.listEmployees = [];

        data?.forEach((item: IData) => {
          if (item.workshop.includes(this.selected.workshop)) {
            this.selected.city = item.city;
            item.workshop.forEach((item) => this.listWorkshop.push(item));
            item.employees.forEach((item) => {
              if (item.workshop === +this.selected.workshop.split(" ")[1]) {
                this.listEmployees.push(item.name);
              }
            });
          }
        });
        this.setCookie();
      } else {
        this.listWorkshop = [];
        this.listEmployees = [];
        this.selected.employees = "";

        data?.forEach((item: IData) => {
          item.workshop.forEach((item) => this.listWorkshop.push(item));
          item.employees.forEach((item) => this.listEmployees.push(item.name));
        });
        this.setCookie();
      }
    },

    changeEmployees(): void {
      if (this.selected.employees !== "") {
        this.listWorkshop = [];

        this.listEmployees = [];
        data?.forEach((item: IData) => {
          let workshop: string;

          if (item.employees.some((e) => e.name === this.selected.employees)) {
            this.selected.city = item.city;

            item.employees.forEach((item) => {
              if (item.name === this.selected.employees) {
                workshop = `${item.workshop}`;
                this.listEmployees.push(item.name);
              }
            });

            item.workshop.forEach((item) => {
              if (item.includes(workshop)) {
                this.selected.workshop = item;
                this.listWorkshop.push(item);
              }
            });
          }
        });
        this.setCookie();
      } else {
        this.listWorkshop = [];
        this.listEmployees = [];
        data?.forEach((item: IData) => {
          item.workshop.forEach((item) => this.listWorkshop.push(item));
          item.employees.forEach((item) => this.listEmployees.push(item.name));
        });
        this.setCookie();
      }
    },
    changeBrigade() {
      this.setCookie();
    },

    submit(event: Event) {
      event.preventDefault();
      if (
        this.selected.brigade == "" ||
        this.selected.employees == "" ||
        this.selected.city == "" ||
        this.selected.workshop == ""
      ) {
        this.isError = true;
        this.isSuccess = false;
      } else {
        this.isSuccess = true;
        this.isError = false;
        this.reset(event);
      }
    },
    reset(event: Event) {
      event.preventDefault();
      this.selected.brigade = "";
      this.selected.employees = "";
      this.selected.city = "";
      this.selected.workshop = "";
      this.writeToSelect();
      this.setCookie();
    },
    setCookie() {
      let expDays = 1;
      let date = new Date();
      date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie =
        "form" +
        "=" +
        JSON.stringify(this.selected) +
        "; " +
        expires +
        "; path=/";
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 32px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input__wraper {
  display: flex;
  gap: 20px;
  align-items: center;
}

.form__label {
  width: 80px;
}

.form__select {
  width: 200px;
  height: 25px;
}

.form__input {
  width: 200px;
  box-sizing: border-box;
  height: 25px;
}

.btns {
  display: flex;
  gap: 10px;
}

.btn {
  text-align: center;
  width: 200px;
  height: 30px;
  padding: 5px;
}

.form__error {
  color: red;
}
</style>