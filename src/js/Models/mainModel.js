export class MainModel {
  constructor() {
    this.ebay = [];
    this.amazon = [];
  }
  addData(data) {
    this.amazon = [];
    this.ebay = [];
    if (data) {
      const { amazon, ebay } = data;
      amazon.forEach((item) => this.amazon.push(item));
      ebay.forEach((item) => this.ebay.push(item));
      const markupAmazon = this.convertToHTML(this.amazon);
      const markupEbay = this.convertToHTML(this.ebay);
      return [markupAmazon, markupEbay];
    }
  }
  convertToHTML(arr) {
    const markup = arr.map((obj) => {
      return `<div class="results-poper__list--item">
          <h3 class="results-poper__list--item--heading">
            <a
              target="_blank"
              href="#"
              ><span class="results-poper__list--item--heading--name"
                >${obj.title}</span
              ><span class="results-poper__list--item--heading--price"
                >Price: ${obj.price}</span
              ></a
            >
          </h3>
          <img
            class="results-poper__list--item--img"
            src=${obj.img}
            alt=${obj.title}
          />
          <p class="results-poper__list--item--cta">
            <a
              target="_blank"
              href="#"
              ><i class="fas fa-arrow-circle-right"></i
            ></a>
          </p>
        </div>`;
    });
    return markup;
  }
}
