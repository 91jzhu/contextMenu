<script setup>
import { ref } from "vue";
import ContextMenu from "./components/ContextMenu.vue";

const selected = ref(null);
const list = ref(["轻轻乌龙", "马斯卡彭", "西瓜拿铁", "酱香拿铁", "冰美式"]);

const childValue = ref(null);
const childList = ref(["111", "222"]);
</script>

<template>
  <h3>右键菜单封装</h3>
  <div>
    <ContextMenu v-model="selected" :menuList="list">
      <div class="area">
        <!-- <h4>当前选中值：{{ selected }}</h4>
        <ContextMenu v-model="childValue" :menuList="childList">
          <div class="child">
            <h4>当前选中值22：{{ childValue }}</h4>
          </div>
        </ContextMenu> -->
      </div>
    </ContextMenu>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.area {
  width: 300px;
  height: 300px;
  background: lightcoral;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.child {
  width: 200px;
  height: 200px;
  background: lightgreen;
}
</style>
