<template>
  <div class="login">
    <form-data></form-data>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import formData from "./form.vue";

export default defineComponent({
  components: {
    formData,
  },
});
</script>

<style lang="less">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-image: url(/images/sunset-1373171_1920.jpg);
  background-size: cover;
}
</style>