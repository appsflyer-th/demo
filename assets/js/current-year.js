(function () {
  var year = String(new Date().getFullYear());
  document.querySelectorAll('.js-current-year').forEach(function (el) {
    el.textContent = year;
  });
})();
