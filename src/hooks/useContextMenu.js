import { onBeforeUnmount, ref, onMounted } from "vue";

const defaultOptions = {
  rightBoundary: true,
  bottomBoundary: true,
};
export const useContextMenu = (wrapper, menu, options = {}) => {
  const { rightBoundary, bottomBoundary } = { ...defaultOptions, ...options };
  const isShow = ref(false);
  const computedStyle = ref({});
  const x = ref(0);
  const y = ref(0);

  const getBoundingClientRect = (el) => {
    return el.getBoundingClientRect();
  };

  const adjustPosition = (
    clientX,
    clientY,
    menuWidth,
    menuHeight,
    wrapperRect
  ) => {
    let newTop = clientY;
    let newLeft = clientX;
    // 检查是否超出右侧边界
    if (rightBoundary && newLeft + menuWidth > wrapperRect.right) {
      newLeft = newLeft - menuWidth;
    }
    // 检查是否超出底部边界
    if (bottomBoundary && newTop + menuHeight > wrapperRect.bottom) {
      newTop = newTop - menuHeight;
    }
    return {
      top: `${newTop}px`,
      left: `${newLeft}px`,
    };
  };

  onMounted(() => {
    wrapper.value.addEventListener("contextmenu", menuHandler);
    window.addEventListener("click", clickHandler, true);
    window.addEventListener("contextmenu", clickHandler, true);
  });

  onBeforeUnmount(() => {
    wrapper.value.removeEventListener("contextmenu", menuHandler);
    window.removeEventListener("click", clickHandler, true);
    window.removeEventListener("contextmenu", clickHandler, true);
  });

  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isShow.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  };

  const changeStyle = () => {
    const { width, height } = getBoundingClientRect(menu.value);
    if (!width || !height) return;
    const wrapperRect = getBoundingClientRect(wrapper.value);
    const adjustedPosition = adjustPosition(
      x.value,
      y.value,
      width,
      height,
      wrapperRect
    );
    computedStyle.value = adjustedPosition;
  };

  const onBeforeEnter = (el) => {
    el.style.height = 0;
  };
  const onEnter = (el) => {
    el.style.height = "auto";
    const height = el.offsetHeight;
    changeStyle();
    el.style.height = 0;
    requestAnimationFrame(() => {
      el.style.transition = ".5s";
      el.style.height = height + "px";
    });
  };
  const onAfterEnter = (el) => {
    el.style.transition = "none";
  };

  const clickHandler = () => {
    isShow.value = false;
  };

  return {
    computedStyle,
    isShow,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
  };
};
