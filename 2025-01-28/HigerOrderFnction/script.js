import { productData } from "./data.js";

const productListEl = document.getElementById("product-list");
const uniqueProducts = [...new Set(productData.map((product) => product.name))];

uniqueProducts.forEach((name) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<a href="#" data-name="${name}">${name}</a>`;
  productListEl.appendChild(listItem);
});

document.querySelectorAll("#product-list a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const name = this.dataset.name;
    showProductDetail(name);
  });
});

function showProductDetail(name) {
  const detailSection = document.getElementById("product-detail");
  const productNameEl = document.getElementById("product-name");
  const productDataEl = document.getElementById("product-data");
  const totalSalesEl = document.getElementById("total-sales");

  const productEntries = productData.filter((product) => product.name === name);

  productNameEl.textContent = `${name}'s Sales Details`;
  productDataEl.innerHTML = productEntries
    .map((entry) => {
      return `<tr><td>${entry.date}</td><td>${entry.unitsSold}</td></tr>`;
    })
    .join("");

  const totalSales = productEntries.reduce(
    (sum, entry) => sum + entry.unitsSold,
    0
  );
  totalSalesEl.textContent = `Total Units Sold: ${totalSales}`;

  document.querySelector("#product-list").style.display = "none";
  detailSection.style.display = "block";
}

document.getElementById("back-button").addEventListener("click", () => {
  document.getElementById("product-detail").style.display = "none";
  document.querySelector("#product-list").style.display = "block";
});
