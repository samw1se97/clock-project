"use strict";

const timer = document.getElementById("timer");
const curDate = document.getElementById("date");
const locationTag = document.getElementById("location");

let myInterval;
let hour, min, sec;

// Display current date in DOM
let hebDate = Intl.DateTimeFormat("il-HE", { dateStyle: "full" }).format();
curDate.innerHTML = hebDate;

// seting a object with locations that can be used withing functions
const cities = {
  newYork: "America/New_York",
  london: "Europe/London",
  paris: "Europe/Paris",
  china: "Asia/Chongqing",
};

// Set defaut clock based on your location
function defaultTime() {
  const dt = new Date();
  /*    Line 22,23,24 -> checking if the hour is lower than 10, if true add '0' infront. if false nothing happens.
   EXAMPLE : if time is `1:3:29` it will '0' onfront of the number that is < 10. `01:03:29` will be diplayed. */
  hour = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
  min = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
  sec = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();
  //   console.log(hour, min, sec);

  timer.innerHTML = `${hour}:${min}:${sec} PM`;
  locationTag.innerHTML = "your location";
}
myInterval = setInterval(defaultTime, 1000);

// Display time as button is selected
const btn = document.getElementsByClassName("btn");
for (const button of btn) {
  button.addEventListener("click", function btnClick() {
    const [upCase, ...rest] = button.id;
    const btnId = upCase.toUpperCase() + rest.join("");
    locationTag.innerHTML = btnId;

    clearInterval(myInterval);
    myInterval = setInterval(intervalFunc, 1000, cities[button.id]);
  });
}

// This funcTion gets the selected location as a parameter and converts the current hour (based on the user location) and returns the hour of the selected location.
function intervalFunc(selectedCity) {
  const changedTime = changeTimeZone(new Date(), selectedCity);

  hour =
    changedTime.getHours() < 10
      ? "0" + changedTime.getHours()
      : changedTime.getHours();

  min =
    changedTime.getMinutes() < 10
      ? "0" + changedTime.getMinutes()
      : changedTime.getMinutes();

  sec =
    changedTime.getSeconds() < 10
      ? "0" + changedTime.getSeconds()
      : changedTime.getSeconds();

  timer.innerHTML = `${hour}:${min}:${sec} PM`;
}

// Converting time zones
function changeTimeZone(date, timeZone) {
  if (typeof date === "string") {
    return new Date(
      new Date(date).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
}
