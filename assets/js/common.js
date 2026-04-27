$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  function toggleEntrySection(button, sectionClass) {
    const card = button.closest("li");
    const target = card.find("." + sectionClass + ".hidden").first();
    const isOpening = !target.hasClass("open");

    card.find(".hidden.open").removeClass("open");
    card.find(".links a.btn.active").removeClass("active");

    if (isOpening) {
      target.addClass("open");
      button.addClass("active");
    }
  }

  $("a.abstract").click(function (e) {
    e.preventDefault();
    toggleEntrySection($(this), "abstract");
  });
  $("a.award").click(function (e) {
    e.preventDefault();
    toggleEntrySection($(this), "award");
  });
  $("a.bibtex").click(function (e) {
    e.preventDefault();
    toggleEntrySection($(this), "bibtex");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
