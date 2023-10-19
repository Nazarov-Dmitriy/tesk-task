<template>
  <div>
    <FormComponent/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FormComponent from "./components/FormComponent.vue";

@Options({
  components: { FormComponent },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body,
p {
  margin: 0;
  padding: 0;
}

#app {
  padding-top: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
