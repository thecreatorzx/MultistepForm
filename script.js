let navigation = document.querySelector(".nav");
let nav = document.querySelector(".navig-area");
let previous = document.querySelector(".foot .prev");
let nxt = document.querySelector(".foot .next");
let submitted = document.querySelector(".foot .submitted");
let ball = document.querySelector(".ball");
let month = document.querySelector(".mon");
let year = document.querySelector(".year");
let cost = document.querySelectorAll(".cst");
let costs = document.querySelectorAll(".costs");
let plancost = document.querySelector(".plan .charge");
let addOn1 = document.querySelector(".service1 .charge");
let addOn2 = document.querySelector(".service2 .charge");
let addOn3 = document.querySelector(".service3 .charge");
let totalsec = document.querySelector(".total .charge");
let s1 = document.querySelector("#search1");
let s2 = document.querySelector("#search2");
let s3 = document.querySelector("#search3");
let note = document.querySelector(".note");
let total = 0;
let plancharge = [9, 12, 15];
let service = [1, 2, 3];
let planselected = plancharge[0];
let serviceselected = [0, 0, 0];
let value = 1;
let yearly = false;
let costvalue = 1;
let i = ["one", "two", "three"];
let planname = ["Arcade", "Advanced", "Pro"];
let a = 0;
let done = true;
document.querySelectorAll(".navig-area div").forEach((element) => {
  element.addEventListener("click", () => {
    previous.classList.remove("none");
    nxt.classList.remove("none");
    document.querySelector(`.sec${value}`).classList.remove("selected");
    document.querySelector(`.page${value}`).classList.add("none");
    value = parseInt(element.getAttribute("value"));
    element.classList.add("selected");
    document.querySelector(`.page${value}`).classList.remove("none");
    check();
  });
});
function update(x) {
  document.querySelector(`.sec${value}`).classList.remove("selected");
  document.querySelector(`.page${value}`).classList.add("none");
  value = value + x;
  document.querySelector(`.sec${value}`).classList.add("selected");
  document.querySelector(`.page${value}`).classList.remove("none");
}
function next() {
  update(1);
  check();
}
function prev() {
  update(-1);
  check();
}
function check() {
  if (value == 1) {
    previous.classList.add("none");
    nxt.classList.remove("none");
  } else if (value == 2) {
    previous.classList.remove("none");
    nxt.classList.remove("none");
  } else if (value == 3) {
    previous.classList.remove("none");
    nxt.classList.remove("none");
  } else if (value == 4) {
    previous.classList.remove("none");
    nxt.classList.add("none");
  }
  finalprices();
}
function plantype(x) {
  a = x;
  planselected = plancharge[a];
  for (j = 0; j < 3; j++) {
    document.querySelector(`.page2 .${i[j]}`).classList.remove("opted");
  }
  document.querySelector(`.page2 .${i[x]}`).classList.add("opted");
}
function planchange() {
  if (yearly) {
    ball.style.transform = "translate(0,-.5px)";
    yearly = false;
    year.style.color = "#3334";
    month.style.color = "hsl(213,96%,18%)";
    document.querySelector(".check").style.background = "#ccc";
    cost.forEach((e) => {
      let amount = 6 + 3 * costvalue;
      plancharge[costvalue - 1] = amount;
      e.innerHTML = `$${amount}/mon`;
      e.classList.remove("extra");
      costvalue++;
    });
    planselected = plancharge[a];
    costvalue = 1;
    costs.forEach((e) => {
      service[costvalue - 1] = costvalue;
      e.innerHTML = `$${costvalue}/mon`;
      costvalue++;
    });
    costvalue = 1;
    planselected = plancharge[a];
  } else {
    document.querySelector(".check").style.background = "hsl(213, 96%, 18%)";
    ball.style.transform = "translate(19.5px,-.3px)";
    yearly = true;
    year.style.color = "hsl(213, 96%, 18%)";
    month.style.color = "#3334";
    cost.forEach((e) => {
      let amount = 60 + 30 * costvalue;
      plancharge[costvalue - 1] = amount;
      e.innerHTML = `$${amount}/yr`;
      e.classList.add("extra");
      costvalue++;
    });
    costvalue = 1;
    costs.forEach((e) => {
      service[costvalue - 1] = 10 * costvalue;
      e.innerHTML = `$${10 * costvalue}/yr`;
      costvalue++;
    });
    costvalue = 1;
    planselected = plancharge[a];
  }
}
check();
for (j = 0; j < 3; j++) {
  document.querySelector(`.page3 .${i[j]} input`).checked = false;
}
function additional(x) {
  document.querySelector(`.page3 .${i[x]}`).classList.toggle("opted");
  let p = document.querySelector(`.page3 .${i[x]} input`);
  if (p.checked) p.checked = false;
  else {
    p.checked = true;
  }
  if (serviceselected[x] == 0) {
    serviceselected[x] = 1;
  } else {
    serviceselected[x] = 0;
  }
}
function finalprices() {
  total = plancharge[a];
  document.querySelector(".plan-name").innerHTML = `${planname[a]}`;
  if (yearly) {
    plancost.innerHTML = `
  +$${planselected}/yr`;
    addOn1.innerHTML = "+$10/yr";
    addOn2.innerHTML = "+$20/yr";
    addOn3.innerHTML = "+$30/yr";
    console.log(serviceselected);
    for (let j = 0; j < 3; j++) {
      if (serviceselected[j] == 0) {
        document.querySelector(`.page4 .service${j + 1} .charge`).innerHTML =
          "not selected";
      } else if (serviceselected[j] == 1) {
        total += service[j];
      }
    }
    totalsec.innerHTML = `+$${total}/yr`;
    document.querySelector(".type").innerHTML = "(Yearly)";
    document.querySelector(".total .type").innerHTML = "(per year)";
  } else {
    plancost.innerHTML = `+$${planselected}/mo`;
    addOn1.innerHTML = "+$1/mo";
    addOn2.innerHTML = "+$2/mo";
    addOn3.innerHTML = "+$3/mo";
    for (let j = 0; j < 3; j++) {
      if (serviceselected[j] == 0) {
        document.querySelector(`.page4 .service${j + 1} .charge`).innerHTML =
          "not selected";
      } else if (serviceselected[j] == 1) {
        total += service[j];
      }
    }
    totalsec.innerHTML = `+$${total}/mo`;
    document.querySelector(".type").innerHTML = "(Monthly)";
    document.querySelector(".total .type").innerHTML = "(per month)";
  }
  if (s1.value != "" && s2.value != "" && s3.value != "") {
    submitted.style.display = "block";
  } else {
    submitted.style.display = "none";
  }
}
function planchanged() {
  planchange();
  finalprices();
}
function submit() {
  if (done) {
    document.querySelector(".page4").classList.add("none");
    document.querySelector(".congrats-page").classList.remove("none");
    document.querySelector(".congrats-page").style.display = "flex";
    previous.classList.add("none");
    document.querySelector(".foot").classList.add("return");
    submitted.innerHTML = "Return";
    navigation.style.display = "none";
    note.style.display = "none";
    document.querySelector(".nav .sec4").classList.remove("selected");
    document.querySelector(
      ".congrats"
    ).innerHTML = `Hello <b>${s1.value}</b>. Thanks for confirming your subscription of <b>$${total}</b> ! Your contact email <b>${s2.value}</b> and phone number +91 <b>${s3.value}</b> have been saved. We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.`;
    done = false;
  } else {
    document.querySelector(".page1").classList.remove("none");
    document.querySelector(".congrats-page").classList.add("none");
    document.querySelector(".congrats-page").style.display = "none";
    submitted.innerHTML = "Submit";
    navigation.style.display = "flex";
    note.style.display = "inline";
    document.querySelector(".foot").classList.remove("return");
    nxt.classList.remove("none");
    document.querySelector(".nav .sec1").classList.add("selected");
    document.querySelector(".congrats").innerHTML = "";
    value = 1;
    done = true;
  }
  s1.value = "";
  s2.value = "";
  s3.value = "";
}
function checkfilled(e) {
  e.classList.remove("empty");
  e.previousElementSibling.classList.remove("empty2");
  if (e.value == "") {
    e.classList.add("empty");
    e.previousElementSibling.classList.add("empty2");
  }
}
