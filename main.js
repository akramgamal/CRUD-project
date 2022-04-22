/**************project******************** */
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productContainer = [];
if (localStorage.getItem("ourProducts") != null) {
  productContainer = JSON.parse(localStorage.getItem("ourProducts"));
  displayProducts();
}
var updateidx;
function addProduct() {
  if (document.getElementById("mainbtn").innerHTML == "Update") {
    productContainer[updateidx].name = productNameInput.value;
    productContainer[updateidx].price = productPriceInput.value;
    productContainer[updateidx].category = productCategoryInput.value;
    productContainer[updateidx].description = productDescriptionInput.value;
    localStorage.setItem('ourProducts', JSON.stringify(productContainer));
    clear();
    displayProducts();
    document.getElementById("mainbtn").innerHTML = "add product"
  } else {
    if (validate() == true) {

      var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
      }
      productContainer.push(product);
      localStorage.setItem('ourProducts', JSON.stringify(productContainer));
      console.log(product);
      // clear();
      displayProducts();
    }

  }

}
function clear() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}
function displayProducts() {
  var cartoon = ``;
  for (var i = 0; i < productContainer.length; i++) {
    cartoon += `
    <tr>
 <td>${i}</td>
 <td>${productContainer[i].name}</td>
 <td>${productContainer[i].price}</td>
 <td>${productContainer[i].category}</td>
 <td>${productContainer[i].description}</td>
 <td><button class="btn btn-outline-info" onClick="updateProduct(${i})">Update</button></td>
 <td><button class="btn btn-outline-danger" onClick="deleteProducts(${i})" >Delete</button></td>
 </tr>
 `
  }
  document.getElementById("tableBody").innerHTML = cartoon;
}
function searchProducts(term) {

  var cartoon = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartoon += `
    <tr>
 <td>${i}</td>
 <td>${productContainer[i].name}</td>
 <td>${productContainer[i].price}</td>
 <td>${productContainer[i].category}</td>
 <td>${productContainer[i].description}</td>
 <td><button class="btn btn-outline-info" onClick="updateProduct(${i})">Update</button></td>
 <td><button class="btn btn-outline-danger" onClick="deleteProducts(${i})">Delete</button></td>
 </tr>
 `
    }

  }
  document.getElementById("tableBody").innerHTML = cartoon;
}
function deleteProducts(index) {
  productContainer.splice(index, 1);
  localStorage.setItem('ourProducts', JSON.stringify(productContainer));
  displayProducts();
}
function updateProduct(index) {
  updateidx = index;
  productNameInput.value = productContainer[index].name;
  productPriceInput.value = productContainer[index].price;
  productCategoryInput.value = productContainer[index].category;
  productDescriptionInput.value = productContainer[index].description;
  document.getElementById("mainbtn").innerHTML = "Update";
}
function validate() {
  var regexName = /^[A-Z][a-z]{2,5}$/;
  var regexPrice = /^([1-9][0-9]{3}|10000)$/;
  var regexCategory = /^(mobile|laptop|tv)$/;
  var regexDesc = / {30}/;
  if (regexName.test(productNameInput.value) && regexPrice.test(productPriceInput.value) && regexCategory.test(productCategoryInput.value)
    && regexDesc.test(productDescriptionInput.value)) {
    return true;
  } else {
    return false;
  }
}
function validateName() {
  var regexName = /^[A-Z][a-z]{2,5}$/;
  if (regexName.test(productNameInput.value) == false) {
    document.getElementById("alert1").style.display = "block";
  } else {
    document.getElementById("alert1").style.display = "none";
  }
  if (validate()) {
    document.getElementById("mainbtn").disabled = false;
  } else {
    document.getElementById("mainbtn").disabled = true;
  }
}
function validatePrice() {
  var regexPrice = /^([1-9][0-9]{3}|10000)$/;
  if (regexPrice.test(productPriceInput.value) == false) {
    document.getElementById("alert2").style.display = "block";
  } else {
    document.getElementById("alert2").style.display = "none";
  }
  if (validate()) {
    document.getElementById("mainbtn").disabled = false;
  } else {
    document.getElementById("mainbtn").disabled = true;
  }
}
function validateCategory() {
  var regexCategory = /^(mobile|laptop|tv)$/;
  if (regexCategory.test(productCategoryInput.value) == false) {
    document.getElementById("alert3").style.display = "block";
  } else {
    document.getElementById("alert3").style.display = "none";
  }
  if (validate()) {
    document.getElementById("mainbtn").disabled = false;
  } else {
    document.getElementById("mainbtn").disabled = true;
  }
}
function validateDesc() {
  var regexDesc = / {30}/;
  if (regexDesc.test(productDescriptionInput.value) == false) {
    document.getElementById("alert4").style.display = "block";
  } else {
    document.getElementById("alert4").style.display = "none";
  }
  if (validate()) {
    document.getElementById("mainbtn").disabled = false;
  } else {
    document.getElementById("mainbtn").disabled = true;
  }
}