console.log("MOO!");

let shopArray = [];

const cookieCountTotal = document.getElementById("counter-clicked");
const cpsTotal = document.getElementById("counter-cps");
const cookieButtonClicker = document.getElementById("cookie-clicker-button");
const resetGameButton = document.getElementById("reset-cookies-button");

let stats = JSON.parse(localStorage.getItem("cookieClickerStats")) || {
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
  saveGame();
}

async function getMyShopItems() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const json = await response.json();
  shopArray = json;
  addShopItems();
}

function addShopItems() {
  const shopContainer = document.getElementById("cookie-shop");
  shopArray.forEach((item, index) => {
    const shopItemDiv = document.createElement("div");
    shopItemDiv.classList.add("shop-item");
    shopItemDiv.textContent = `${item.name}\nPrice: ${item.cost}\nCPS: ${item.increase}`;
    shopItemDiv.id = `shop-item-${index}`;
    shopItemDiv.addEventListener("click", () => {
      buyShopItem(index);
    });
    shopContainer.appendChild(shopItemDiv);
  });
}

function saveGame() {
  localStorage.setItem("cookieClickerStats", JSON.stringify(stats));
}

function buyShopItem(shopItemIndex) {
  const item = shopArray[shopItemIndex];
  if (stats.cookieCount >= item.cost) {
    stats.cookieCount -= item.cost;
    stats.cps += item.increase;
    updateCookieTotal();
    updateCPS();
    saveGame();
    console.log("brought an item");
  } else {
    console.log("You can't afford it");
  }
}

function resetCookies() {
  if (confirm("Are you sure you want to reset the game?"))
    stats = {
      cookieCount: 0,
      cps: 0,
    };
  localStorage.clear();
  updateCookieTotal();
  updateCPS();
}

resetGameButton.addEventListener("click", resetCookies);

setInterval(addCPS, 1000);
setInterval(saveGame, 1000);

updateCookieTotal();
updateCPS();
getMyShopItems();
