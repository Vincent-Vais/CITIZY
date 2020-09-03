export class MainView {
  constructor() {
    this.ebayContainer = document.querySelector(
      ".results-poper__left .results-poper__list"
    );
    this.amazonContainer = document.querySelector(
      ".results-poper__right .results-poper__list"
    );
    this.resultsSection = document.querySelector("#section-results");
    this.resultsLoader = document.querySelector("#results-loader");
    this.resultsLoaderList = document.querySelectorAll(
      ".results-poper__loader--list"
    );
  }
  changePages(element) {
    element.addClass("u-hide-section");
    window.setTimeout(
      (el) => {
        el.removeClass("u-hide-section");
        el.attr("hidden", true);
      },
      2500,
      element
    );
  }
  showResPage(present) {
    this.resultsLoader.style.display = "block";
    if (!present) {
      this.resultsSection.hidden = false;
      $(this.resultsSection).addClass("u-show-section");
      window.setTimeout(
        (el) => {
          el.removeClass("u-show-section");
        },
        2500,
        $(this.resultsSection)
      );
    }
  }
  hideResPage() {
    $(this.resultsSection).addClass("u-hide-section");
    window.setTimeout(
      (el) => {
        this.resultsSection.hidden = true;
        el.removeClass("u-hide-section");
      },
      2500,
      $(this.resultsSection)
    );
  }
  display(markupArr) {
    this.resultsLoader.style.display = "none";
    const [markupAmz, markupEbay] = markupArr;
    this.displayAmazon(markupAmz);
    this.displayEbay(markupEbay);
  }
  displayAmazon(markup) {
    this.amazonContainer.innerHTML = markup;
  }
  displayEbay(markup) {
    this.ebayContainer.innerHTML = markup;
  }
  showMore(markupArr) {
    this.resultsLoader.style.display = "none";
    const [markupAmz, markupEbay] = markupArr;
    this.showMoreAmazon(markupAmz);
    this.showMoreEbay(markupEbay);
  }
  showMoreAmazon(markup) {
    this.amazonContainer.insertAdjacentHTML("beforeend", markup);
  }
  showMoreEbay(markup) {
    this.ebayContainer.insertAdjacentHTML("beforeend", markup);
  }
  showLoaderList() {
    Array.from(this.resultsLoaderList).forEach(
      (loader) => (loader.hidden = false)
    );
  }
  hideLoaderList() {
    Array.from(this.resultsLoaderList).forEach(
      (loader) => (loader.hidden = true)
    );
  }
}
