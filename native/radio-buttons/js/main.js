const switchNode = document.querySelector(".switch");
const labelNodes = switchNode.querySelectorAll(".switch__label");
let switchNodeStyles = "";

labelNodes.forEach((node) => {
  const nodeType = node.getAttribute("for");
  const { width } = node.getBoundingClientRect();
  switchNodeStyles += `--${nodeType}-width: ${width}px;`;
});

switchNode.style = switchNodeStyles;
