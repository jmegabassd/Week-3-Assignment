console.log("MOO!");

let shopArray = [];

const cookieCountTotal = document.getElementById("counter-clicked");
const cpsTotal = document.getElementById("counter-cps");
const cookieButtonClicker = document.getElementById("cookie-clicker-button");

let stats = {
  cookieCount: 0,
  cps: 0,
};

function updateCookieTotal() {
  cookieCountTotal.textContent = stats.cookieCount + " cookies!";
}

function updateCPS() {
  cpsTotal.textContent = stats.cps + " cookies per second!";
}

cookieButtonClicker.addEventListener("click", () => {
  stats.cookieCount++;
  updateCookieTotal();
  saveGame();
});

function addCPS() {
  stats.cookieCount += stats.cps;
  updateCookieTotal();
}

async function getMyShopItems() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const json = await response.json();
  shopArray = json;
  console.log(json);
  addShopItems();
}

function addShopItems() {
  const shopContainer = document.getElementById("cookie-shop");
  shopArray.forEach((item, index) => {
    const shopItemDiv = document.createElement("div");
    shopItemDiv.classList.add("shop-item");
    shopItemDiv.textContent = `${item.name} Price: ${item.cost} CPS: ${item.increase}`;
    shopItemDiv.id = `shop-item-${index}`;
    shopContainer.appendChild(shopItemDiv);
  });
}

function saveGame() {
  localStorage.setItem("cookieClickerStats", JSON.stringify(stats));
}

setInterval(addCPS, 1000);
setInterval(saveGame, 30000);

updateCookieTotal();
updateCPS();
getMyShopItems();

//if there is data in local Storage, update stats with this data so that the user picks up where they left off

//==============================================

//Shop Upgrades

// Option 1: you could have a function per upgrade
// Option 2: you could have have a reusable function that works for all the upgrades

// Tip on local storage:
// Make sure the local storage values are updated after the user buys an upgrade
