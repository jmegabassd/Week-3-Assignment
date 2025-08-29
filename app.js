console.log("MOO!");

//Game Logic
// When the user clicks on the cookie, the total count of cookies goes up by 1

// when the user clocks on the buy button in an upgrade in the shop, the total count of cookies goes down by the cost of the upgrade and the cps goes up

// You will need functions to contain the game logic

// To create the loic for when the shop upgrades:

// Option 1: you could have a function per upgrade
// Option 2: you could have have a reusable function that works for all the upgrades

// Tip on local storage:
// Make sure the local storage values are updated after the user buys an upgrade or when the user clicks on the cookie

//==========================================

//Data Storage

const cookieCountTotal = document.getElementById("counter-clicked");
const cpsTotal = document.getElementById("counter-cps");

// let cookieCount = 0;
// let cps = 0;

let stats = {
  cookieCount: 0,
  cps: 0,
};

function updateCookieTotal() {
  cookieCountTotal.textContent = stats.cookieCount + " Have been clicked!";
}

function updateCPS() {
  cpsTotal.textContent = stats.cps + " Cookies per second!";
}

updateCookieTotal();
updateCPS();

//if there is data in local Storage, update stats with this data so that the user picks up where they left off

//==============================================

//Shop Upgrades

//fetch the upgrades from the API

let shopArray = [];

async function getMyShopItems() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  // console.log("HTTP Repsonse:", response);
  const json = await response.json();
  // console.log("JSON Data", json);
  shopArray = json;
  console.log("shopArray data", shopArray);
}
getMyShopItems();

// To create multiple DOM elements in a more convientient was, you can use a loop.

//TODO: create DOM elements to contain the upgrades in the shop

// create an element
// assign the value to its tect content
//append it to the DOM
//after task complete you should see the upgrades on your page

//=================================================

// the interval

// setInterval(function () {
//   cookieCount += cps; //cookieCount = cookieCount +cps
//   //update the DOM to reflect the changes in the values
//   //save the values in local storage
// }, 1000);
