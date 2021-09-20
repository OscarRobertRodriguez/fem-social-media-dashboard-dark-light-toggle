let radios = document.querySelectorAll('input[name="theme"]');

updateOnThemeChange("dark", activateDarkMode);
updateOnThemeChange("light", activateLightMode);
setDefaultTheme();
moveToggle();

radios.forEach((radio) => {
  radio.addEventListener("click", (e) => {
    if (e.target.id === "dark" && e.target.checked) {
      activateDarkMode();
    } else if (e.target.id === "light" && e.target.checked) {
      activateLightMode();
    }
  });
});

function setDefaultTheme() {
  document.body.classList = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : prefersColorScheme();
}

function activateDarkMode() {
  document.body.classList = "dark";
  localStorage.setItem("theme", "dark");
  moveToggle();
}

function activateLightMode() {
  document.body.classList = "light";
  localStorage.setItem("theme", "light");
  moveToggle();
}

function prefersColorScheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    localStorage.setItem("theme", "dark");
    return "dark";
  } else {
    localStorage.setItem("theme", "light");
    return "light";
  }
}

function moveToggle() {
  let lightRadio = document.getElementById("light");
  let darkRadio = document.getElementById("dark");
  localStorage.getItem("theme") === "light"
    ? (lightRadio.checked = true)
    : (darkRadio.checked = true);
}

function updateOnThemeChange(theme, func) {
  window
    .matchMedia(`(prefers-color-scheme: ${theme})`)
    .addEventListener("change", (e) => e.matches && func());
}
