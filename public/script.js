/** Inlined version of noflash.js from use-dark-mode */
(function () {
  var storageKey = "theme";
  var classNameDark = "dark-mode";
  var classNameLight = "light-mode";
  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(
      darkMode === "dark" ? classNameDark : classNameLight
    );
    document.body.classList.remove(
      darkMode === "dark" ? classNameLight : classNameDark
    );
  }
  var preferDarkQuery = "(prefers-color-scheme: dark)";
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = localStorageTheme;
  }
  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();
