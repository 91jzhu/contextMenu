<script setup>
import { ref } from "vue";
import { useContextMenu } from "../hooks/useContextMenu";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  menuList: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["update:modelValue"]);
const wrapper = ref(null);
const menu = ref(null);
const { isShow, computedStyle, onBeforeEnter, onEnter, onAfterEnter } =
  useContextMenu(wrapper, menu, props.options);
const handleClick = (val) => {
  emit("update:modelValue", val);
};
</script>

<template>
  <div class="context-wrapper" ref="wrapper">
    <slot />
    <Teleport to="body">
      <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
      >
        <div
          v-show="isShow"
          class="context-list"
          :style="computedStyle"
          ref="menu"
        >
          <div
            class="item"
            v-for="(item, index) in menuList"
            :key="index"
            @click="handleClick(item)"
          >
            {{ item }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="less">
.context-wrapper {
  width: fit-content;
}
.context-list {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  .item {
    cursor: pointer;
    color: black;
    padding: 8px 12px;
    border-radius: 8px;
    &:hover {
      background: lightblue;
    }
  }
}
</style>
