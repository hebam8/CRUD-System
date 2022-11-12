var productNameInput=document.getElementById('productnameinput');
var productPriceInput=document.getElementById('productpriceinput');
var productCategoryInput=document.getElementById('productcategoryinput');
var productDescriptionInput=document.getElementById('productdescriptioninput');
var addProudctBtn= document.querySelector('.add-product');
var UpdateProudctBtn= document.querySelector('.update-product');
var tableBody=document.querySelector('#table-body');
var searchInput=document.getElementById('searchinput');
formProuduct=document.getElementById('form-Product');
var textValidateName=document.getElementById('textValidateName')
var textValidatePrice=document.getElementById('textValidatePrice')
var textValidateCategory=document.getElementById('textValidateCategory')
var textValidateDesc=document.getElementById('textValidateDesc')

var productContainer;

if (localStorage.getItem('my product') != null){
    productContainer=JSON.parse( localStorage.getItem('my product'));
    display(productContainer);
}
else{
    productContainer= [];
}


function addProudct(){
    if (formValidate == true){
        var product={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescriptionInput.value,
           }
           productContainer.push(product);
           clearForm();
           localStorage.setItem('my product',JSON.stringify(productContainer));
           display(productContainer);
           console.log( productContainer);
           productNameInput.classList.remove('is-valid');
           productPriceInput.classList.remove('is-valid');
           productCategoryInput.classList.remove('is-valid');
           productDescriptionInput.classList.remove('is-valid');
    }


}


function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescriptionInput.value="";
}

function display(productList){
    var cartoona=``;
    for (var i=1; i<productList.length; i++){
        cartoona+= `
        <tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button class="update-product" onclick=setFormForUpdate(${i})> Update</button></td>
        <td><button class="btn btn-outline-danger" onclick=deleteProduct(${i})> Delete</button></td>
  </tr>`
    }
    tableBody.innerHTML=cartoona;
}


function searchProduct(searchTerm){
    var searchResult=[];
    for (var i=0; i<productContainer.length; i++){
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
            console.log(searchResult);
        searchResult.push(productContainer[i]);
        
        }
    }
    display(searchResult);
}
 function deleteProduct(deletedindex){
    productContainer.splice(deletedindex,1);
    display(productContainer);
    localStorage.setItem('my product',JSON.stringify(productContainer));
 }

function setFormForUpdate(updateItem){
    updateIndex=updateItem;
    productNameInput.value=productContainer[updateItem].name;
    productPriceInput.value=productContainer[updateItem].price;
    productCategoryInput.value=productContainer[updateItem].category;
    productDescriptionInput.value=productContainer[updateItem].desc;
    UpdateProudctBtn.classList.replace('d-none','d-inline-block');
    addProudctBtn.classList.add('d-none');
}
 function UpdateProuduct(){
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescriptionInput.value,
    }
    productContainer.splice(updateIndex,1,product);
    display(productContainer);
    localStorage.setItem('my product',JSON.stringify(productContainer));
    clearForm();


 }
 function formValidate(){
    if (validateProductName && validateProductPrice  && validateProductCategory && validateProductDescription == true){
        addProudct();
   
    }
 }

//  ---------validation ---------------
function validateProductName(){
 
    var regEx=/^[A-Z][a-z]{3,20}$/;
   if ( regEx.test(productNameInput.value) == true){
    productNameInput.classList.replace('is-invalid', 'is-valid');
    return true;
   }
   else{
    productNameInput.classList.add('is-invalid');
    textValidateName.innerHTML='Please enter your name start with capital letter';

    return false;
   }
}

function validateProductPrice(){
    var regEx=/^[0-9]{1,}$/;
   if ( regEx.test(productPriceInput.value) == true){
    productPriceInput.classList.replace('is-invalid', 'is-valid');
    return true;
   }
   else{
    productPriceInput.classList.add('is-invalid');
    textValidatePrice.innerHTML='The price shoud be only numbers';

    return false;
   }
}
function validateProductCategory(){
    var regEx=/[a-zA-Z]{5,30}$/;
   if ( regEx.test(productCategoryInput.value) == true){
    productCategoryInput.classList.replace('is-invalid', 'is-valid');
    return true;
   }
   else{
    productCategoryInput.classList.add('is-invalid');
    textValidateCategory.innerHTML='The text size must be no less than 5 characters and no more than 30 characters.';

    return false;
   }
}
function validateProductDescription(){
    var regEx=/[a-zA-Z0-9]{5,90}$/;
   if ( regEx.test(productDescriptionInput.value) == true){
    productDescriptionInput.classList.replace('is-invalid', 'is-valid');
    return true;
   }
   else{
    productDescriptionInput.classList.add('is-invalid');
    textValidateDesc.innerHTML='The text size must be no less than 5 characters and no more than 30 characters.';
    return false;
   }
}


//  -----------------events----------------
addProudctBtn.addEventListener('click', addProudct);
searchInput.addEventListener('input', function (){
    searchProduct(this.value)
})
UpdateProudctBtn.addEventListener('click',UpdateProuduct);
productNameInput.addEventListener('input',validateProductName)
productPriceInput.addEventListener('input',validateProductPrice)
productCategoryInput.addEventListener('input',validateProductCategory)
productDescriptionInput.addEventListener('input',validateProductDescription)
formProuduct.addEventListener('submit', function(e){
    e.preventDefault();
   
})
formProuduct.addEventListener('input', formValidate)