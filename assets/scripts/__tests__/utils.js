import {
  hasClass,
  addClass,
  removeClass,
  isPartiallyVisible,
  isFullyVisible
} from "../utils";
import {
  CLASS_NAMES,
  LARGE_RECT_DIMENSIONS,
  SMALL_RECT_DIMENSIONS
} from "../__fixtures__";

/**
 *
 * jsDom - `innerWidth` = 1024px / `innerHeight` = 768px
 *
 */

function setup({ className = "", dimensions } = {}) {
  const el = document.createElement("div");
  el.className = className;

  if (dimensions) {
    const boundingClientRect = {
      ...el.getBoundingClientRect(),
      ...dimensions
    };

    jest
      .spyOn(el, "getBoundingClientRect")
      .mockImplementation(() => boundingClientRect);
  }

  return { el };
}

function getTestDimensions(dimensions, verticalOffset) {
  return verticalOffset
    ? {
        ...dimensions,
        top: verticalOffset,
        bottom: dimensions.bottom + verticalOffset,
        y: verticalOffset
      }
    : dimensions;
}

describe("dom helper methods", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("checks if class exists on element", () => {
    const { el } = setup({ className: CLASS_NAMES[0] });

    expect(hasClass(el, CLASS_NAMES[0])).toBe(true);
  });

  test("checks if class is added to element", () => {
    const { el } = setup();

    addClass(el, CLASS_NAMES[0]);

    expect(el.className).toBe(CLASS_NAMES[0]);
  });

  test("checks if multiple classes are added to element", () => {
    const { el } = setup();

    for (let className of CLASS_NAMES) {
      addClass(el, className);
    }

    expect(el.className).toBe(CLASS_NAMES.join(" "));
  });

  test("checks if class is removed from element", () => {
    const { el } = setup({ className: CLASS_NAMES[0] });

    removeClass(el, CLASS_NAMES[0]);

    expect(el.className).toBe("");
  });

  test("checks if multiple classes are removed from element", () => {
    const { el } = setup({ className: CLASS_NAMES.join(" ") });

    for (let className of CLASS_NAMES) {
      removeClass(el, className);
    }

    expect(el.className).toBe("");
  });

  test("checks if element is partially visible in window", () => {
    const { el } = setup({
      dimensions: getTestDimensions(
        LARGE_RECT_DIMENSIONS,
        window.innerHeight / 2
      )
    });

    expect(isPartiallyVisible(el)).toBe(true);
  });

  test("checks if element is not visible in window", () => {
    const { el } = setup({
      dimensions: getTestDimensions(
        LARGE_RECT_DIMENSIONS,
        window.innerHeight + 1
      )
    });

    expect(isPartiallyVisible(el)).toBe(false);
  });

  test("checks if element is not fully visible in window", () => {
    const { el } = setup({
      dimensions: getTestDimensions(
        LARGE_RECT_DIMENSIONS,
        window.innerHeight / 2
      )
    });

    expect(isFullyVisible(el)).toBe(false);
  });

  test("checks if element is fully visible in window", () => {
    const { el } = setup({
      dimensions: getTestDimensions(SMALL_RECT_DIMENSIONS)
    });

    expect(isFullyVisible(el)).toBe(true);
  });
});
