export const hasClass = (element, targetClass) => {
  return !!element.className.match(new RegExp(`(\\s|^)${targetClass}(\\s|$)`));
};

export const addClass = (element, newClass) => {
  if (!hasClass(element, newClass)) {
    element.className = `${element.className.trim()} ${newClass}`;
  }
};

export const removeClass = (element, targetClass) => {
  if (hasClass(element, targetClass)) {
    element.className = element.className.replace(
      new RegExp(`(\\s|^)${targetClass}(\\s|$)`),
      " "
    );
  }
};

export const isFullyVisible = element => {
  let { top, bottom } = element.getBoundingClientRect();

  return top >= 0 && bottom <= window.innerHeight;
};

export const isPartiallyVisible = element => {
  let { top, bottom, height } = element.getBoundingClientRect();

  return top + height >= 0 && height + window.innerHeight >= bottom;
};
