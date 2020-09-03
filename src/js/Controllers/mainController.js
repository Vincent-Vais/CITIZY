import regeneratorRuntime from "regenerator-runtime";
import { MainModel } from "../Models/mainModel";
import { MainView } from "../Views/mainView";

export class MainController {
  constructor() {
    this.layoutBtns = {
      closeResults: $("#results-close"),
      closeLanding: $("#landing-close"),
    };
    this.mainForm = {
      inputField: $("#input-field"),
      inputSubmit: $("#input-btn"),
    };
    this.resultsForm = {
      inputField: $("#results-input"),
      inputSubmit: $("#results-submit-input"),
    };

    this.resList = $(".results-poper__list");
    // this.loadSection = $("#section-loader");

    this.ready = false;
    this.url = `/api/results`;

    this.mainModel = new MainModel();
    this.mainView = new MainView();

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  init() {
    // this.loadSection.hide();
    for (let btn in this.layoutBtns) {
      this.layoutBtns[btn].on("click", this.handlePageChange);
    }
    const mainInputSubmit = this.mainForm.inputSubmit;
    const resultsInputSubmit = this.resultsForm.inputSubmit;
    [mainInputSubmit, resultsInputSubmit].forEach((item) =>
      item.on("click", this.handleSubmit)
    );

    this.resList.on("scroll", this.handleScroll);
  }
  handlePageChange(event) {
    this.ready = false;
    const section = $(event.target.closest("section"));
    this.mainView.changePages(section);
    this.mainView.display(["", ""]);
  }
  async handleSubmit(event) {
    let present, input;
    console.log(event.target.closest("button"));
    if (event.target.closest("button").matches("#input-btn")) {
      present = false;
      input = this.mainForm.inputField[0];
    } else {
      present = true;
      input = this.resultsForm.inputField[0];
    }
    const searchStr = input.value;
    this.key = searchStr.replace(" ", "+").toLowerCase();
    input.value = "";
    try {
      this.mainView.showResPage(present);
      const data = await this.fetchData(this.url, this.key);
      const markup = this.mainModel.addData(JSON.parse(data));
      this.mainView.display(markup);
    } catch (err) {
      alert("An error occured. Please try again");
      this.mainView.display(["", ""]);
      this.mainView.hideResPage();
    }
  }
  async handleScroll(event) {
    if (
      event.target.scrollHeight - event.target.scrollTop < 5000 &&
      this.ready &&
      this.key
    ) {
      this.ready = false;
      const data = await this.fetchData(this.url, this.key);
      console.log(data);
      const markup = this.mainModel.addData(JSON.parse(data));
      this.mainView.showMore(markup);
    }
  }
  fetchData(url, key) {
    return new Promise((resolve, reject) => {
      $.get(url, { api: process.env.API_KEY, key: key })
        .done((data) => {
          this.ready = true;
          resolve(data);
        })
        .fail((err) => reject(err));
    });
  }
}
