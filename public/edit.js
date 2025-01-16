export default function edit() {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("viewBox", "0 0 24 24");
  svgElement.setAttribute("fill", "none");
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute(
    "d",
    "M13.727 6.72708L14.9642 5.48991C15.1194 5.33459 15.3038 5.21139 15.5066 5.12733C15.7095 5.04327 15.927 5 16.1466 5C16.3662 5 16.5836 5.04327 16.7865 5.12733C16.9894 5.21139 17.1737 5.33459 17.329 5.48991L18.511 6.67191C18.8244 6.98542 19.0005 7.41059 19.0005 7.8539C19.0005 8.29722 18.8244 8.72238 18.511 9.0359L17.2738 10.2731M13.727 6.72708L5.68877 14.7645C5.41122 15.042 5.24018 15.4084 5.2056 15.7994L5.00331 18.0898C4.99244 18.2115 5.00842 18.3342 5.0501 18.4491C5.09178 18.564 5.15816 18.6684 5.24456 18.7549C5.33096 18.8414 5.43528 18.9078 5.55016 18.9496C5.66503 18.9914 5.78768 19.0075 5.90945 18.9968L8.19988 18.7945C8.59145 18.7603 8.95845 18.5892 9.23642 18.3113L17.2738 10.2731M13.727 6.72708L17.2738 10.2731"
  );
  pathElement.setAttribute("stroke", "currentColor");
  pathElement.setAttribute("stroke-width", "1.5");
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");

  svgElement.appendChild(pathElement);

  return svgElement;
}
