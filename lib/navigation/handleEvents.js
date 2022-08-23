"use babel";

function handleEnter({ event, currentIndex, availableElements }) {
  let clickElement;
  if (currentIndex === 0) {
    clickElement = availableElements[currentIndex + 1];
  } else {
    clickElement = availableElements[currentIndex];
  }
  if (clickElement === undefined) return;
  clickElement.click();
  event.preventDefault();
}

function handleArrowKey({ event, currentIndex, availableElements }) {
  // If the focus isn't in the container, focus on the first thing
  if (currentIndex === -1) availableElements[0].focus();

  // Move the focus up or down
  let nextElement;
  if (event.key === "ArrowDown") {
    nextElement = availableElements[currentIndex + 1];
  }

  if (event.key === "ArrowUp") {
    nextElement = availableElements[currentIndex - 1];
  }

  console.log(nextElement);
  nextElement && nextElement.focus();
  event.preventDefault();
}

/**
 * Implement arrow key navigation for the given parentNode
 * @param {object}  options
 * @param {Event}   options.e          Keydown event
 * @param {DOMNode} options.parentNode The parent node to operate on. Arrow keys won't navigate outside of this node
 * @param {String}  options.selectors  Selectors for elements we want to be able to key through
 */
export default function handleEvents({
  event,
  parentNode,
  modal,
  selectors = "a,button,input",
}) {
  if (!parentNode) return;

  const key = event.key;
  if (!["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(key)) {
    return;
  }

  const activeElement = document.activeElement;

  // If we're not inside the container, don't do anything
  if (!parentNode.contains(activeElement)) return;

  // Get the list of elements we're allowed to scroll through
  const availableElements = parentNode.querySelectorAll(selectors);

  // No elements are available to loop through.
  if (!availableElements.length) return;

  // Which index is currently selected
  const currentIndex = Array.from(availableElements).findIndex(
    (availableElement) => availableElement === activeElement
  );

  if (key === "Enter") {
    handleEnter({ event, currentIndex, availableElements });
  }

  if (key === "Escape") {
    modal();
    event.preventDefault();
    return;
  }

  handleArrowKey({ event, currentIndex, availableElements });
}
