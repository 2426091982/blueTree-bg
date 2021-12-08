<script setup>
let emit = defineEmits(["switchImage"]);
let getImgPath = () => window.localStorage.getItem("imagePath");

let images = [
    "/images/ocean-3605547_1920.jpg",
    "/images/tree-736885(1).jpg",
    "/images/forest-3622519_1920.jpg",
    "/images/tree-3358468_1920.jpg",
    "/images/sunset-1373171_1920.jpg",
];
let end = false;
let select = (path) => {
  if (end || getImgPath() == path) return;
  emit('switchImage', path);
  end = true;
  setTimeout(() => end = false, 350);
}
</script>

<template>
  <div class="list">
    <div 
      class="item-image" 
      v-for="path in images"
      :key="path"
      @click="select(`url('${path}')`)"
    >
      <img :src="path" alt="" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-image {
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 100px;
}

.item-image:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100px;
  transition: background-color 0.5s;
  cursor: pointer;
}

.item-image:hover:before {
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  user-select: none;
}
</style>