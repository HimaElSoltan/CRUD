let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let serchTitel = document.getElementById("serchTitel")
let serch = document.getElementById("serch")
let serchCategory = document.getElementById("serchCategory")

let mood = 'create';

let tmp;
// get total
function getTotal(){
    // console.log('done')
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result
        total.style.backgroundColor = '#040';
        total.style.opacity = '1';
    }else{
        total.innerHTML ='';
        total.style.backgroundColor = '#a00d02';
        total.style.opacity = '0';
    }
}
// create product
// save in localStorage
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
 dataPro =[];
}
submit.onclick = function (){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if(title.value != '' && price.value != ''&& category.value != ''){

if( mood === 'create'){
if(newPro.count > 1 & newPro.count < 60){
    for(let i = 0; i < newPro.count; i++ ){
    dataPro.push(newPro);
    }
}else{
    dataPro.push(newPro);
}
}else{
    dataPro[      tmp        ] = newPro;
    mood = 'create';
submit.innerHTML = 'create';
count.style.display= 'block';
}
clearData()

}


// x = [1,2,3];
// x[1] = 5;

// console.log(newPro);
// save in localStorage
    localStorage.setItem('product', JSON.stringify(dataPro) )
    showData()
}

    // console.log(dataPro);
// clear input
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';
}
// read 
function showData(){
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
// table = dataPro[i];
// console.log(dataPro);
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updatadata(  ${i}  )" id="updata">updata</button> </td>
        <td><button onclick="delatdata(  ${i}  )" id="delete">delete</button> </td>
    </tr>`
}
     document.getElementById("tbody").innerHTML = table;
        // console.log(table)
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick='DeleweAll()' >Delete All (${dataPro.length})</button>`
    } else {
        btnDelete.innerHTML = '';
    }
}
showData()
// delat
function delatdata(i){
// console.log(i);
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData()
}
function DeleweAll(){
    localStorage.clear()
    dataPro.splice(0)
showData()
}
// count
// updata
function updatadata(i){
    // console.log(i);
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Updata';
    mood = 'Updata';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// sherch

let searchMood = 'title';
function getsearchMood(id)
{
// console.log(id)
let  search = document.getElementById('search');
if(id =='serchTitel' ){
    searchMood = 'title';
}else{
    searchMood = 'category';

}
search.placeholder = "serch by "+ searchMood;

search.focus()
// console.log(searchMood)
search.value = '';
showData()
}

function searchData(value)
{
// console.log(value);
// dataPro[0].title
// 'samsung'
// 'samsung'.includes('m')
// true
let table = '';
for(let i = 0; i < dataPro.length;i++){
if(searchMood == 'title'){

if(dataPro[i].title.includes(value.toLowerCase())){
    // console.log(i);
    table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updatadata(  ${i}  )" id="updata">updata</button> </td>
    <td><button onclick="delatdata(  ${i}  )" id="delete">delete</button> </td>
</tr>`
}
}else{

        if(dataPro[i].category.includes(value.toLowerCase())){
            // console.log(i);
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updatadata(  ${i}  )" id="updata">updata</button> </td>
            <td><button onclick="delatdata(  ${i}  )" id="delete">delete</button> </td>
        </tr>`

        }
}
}
document.getElementById("tbody").innerHTML = table;

}




// clean data
