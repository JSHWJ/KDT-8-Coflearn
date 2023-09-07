const tab = document.getElementsByClassName("tabs_hi");

tab.addEventListener("click", function (e) {
  e.currentTarget.classList.toggle("active");
});
