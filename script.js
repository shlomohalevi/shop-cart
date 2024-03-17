const data = [
    {
       "id":"1",
        "cat":"food",
        "name":"Milk",
        "price":"6",
        "image":"https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_150.jpg"
    },
    {
       "id":"2",
        "cat":"food",
        "name":"Bread",
        "price":"8",
        "image":"https://cdn.pixabay.com/photo/2014/07/22/09/59/bread-399286_150.jpg"
    },
    {
       "id":"4",
        "cat":"food",
        "name":"Eggs",
        "price":"12",
        "image":"https://cdn.pixabay.com/photo/2015/09/17/17/19/egg-944495_150.jpg"
    },
    {
       "id":"3",
        "cat":"clothing",
        "name":"Coat",
        "price":"120",
        "image":"https://cdn.pixabay.com/photo/2015/05/29/19/19/person-789663_150.jpg"
    },
    {
       "id":"5",
        "cat":"clothing",
        "name":"Dress",
        "price":"4000",
        "image":"https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dresses-1485984_150.jpg"
    },
    {
       "id":"6",
        "cat":"clothing",
        "name":"Shirt",
        "price":"70",
        "image":"https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328_150.jpg"
    },
    {
       "id":"7",
        "cat":"animals",
        "name":"Dog food",
        "price":"70",
        "image":"https://cdn.pixabay.com/photo/2017/04/07/10/53/dog-2210717_150.jpg"
    },
    {
        "id":"8",
        "cat":"animals",
        "name":"Cat toy",
        "price":"50",
        "image":"https://cdn.pixabay.com/photo/2018/07/21/09/17/cat-3552143_150.jpg"
    }
]
const contentEl = document.querySelector('#content')
const sortSelector = document.querySelector('#sort')
const userInput = document.querySelector('#userinput')
const checkContainer = document.querySelector('#checkboxes-container')
let activeDataOnPage = data
let searcheInput = ''
let requieredSorting = 'unordered'
const cart = []
const checkboxescat = []
const shopButton = document.querySelector('#cart-button')
const cartContainer = document.querySelector('#cart-container')


const createCol = (clasess) =>{

    const colEl = document.createElement('div')
    colEl.className = clasess
    return colEl
}

const createCard = (pruduct)=>
{
    const cardEl = document.createElement('div')
    cardEl.className = 'card'
    cardEl.innerHTML+=`
    <img src = "${pruduct.image}" class="card-img-top" alt = "${pruduct.image}">
    <div class = "card-body">
    <h5 class = "card-title">${pruduct.name}</h5>
    <p class = "card-text">price:${pruduct.price}</p>
    </div>
    `
    const btn = document.createElement('button')
    if(cart.some(el => el.id == pruduct.id))
    {
        btn.classList.add('btn','btn-success')
        btn.innerText = 'added to cart'
    }
    else
    {
        btn.classList.add('btn', 'btn-primary')
        btn.innerHTML = 'buy now'
    }

    btn.id = `btn_${pruduct.id}`
    btn.addEventListener('click',addToCart)
    cardEl.append(btn)
    return cardEl

}

const addContent = (holder,content)=>{
    holder.append(content)
    return holder
}
    
    
const render = (data , holder)=>
{
    holder.innerHTML= ''
    if(data.length != 0)
        data = filterByTextInput()
    if(data.length > 0)
    {
        sorting(data,requieredSorting)
        data.map(product => {
            const col = createCol('col-md-3 pt-5');
            const card = createCard(product);
            const colAndCard = addContent(col,card);
            addContent(holder, colAndCard);
        });
    }
}

const sorting = (arr, key) => {
    switch (key) {
        case 'price':
        arr.sort((a, b) => a.price - b.price)
        break
        case 'name':
            arr.sort((a, b) => a.name.localeCompare(b.name))
            case 'unordered':
                arr = data.filter((el)=>{
                    return arr.includes(el)
                    
                })
            }
        }
        
const filterByTextInput = ()=>
{
    return activeDataOnPage.filter(item => item.name.toLowerCase().startsWith(searcheInput.toLowerCase()))
}
        
const filterByCheckBox = (event)=>
{   
    const category = event.target.value
    const checked = event.target.checked
    if(checked){
        checkboxescat.push(category)
    }
    else{
        const index = checkboxescat.indexOf(category)
        checkboxescat.splice(index, 1)
    }
    
    if (checkboxescat.length === 0)
    {
        activeDataOnPage = data
    }
    else
    {
        activeDataOnPage = (data.filter(item => checkboxescat.includes(item.cat)));

    }
    render(activeDataOnPage,contentEl)

    
    

}
const addToCart =(e)=>
{
    
    let id = e.target.id
    id = id.split('_')[1]
    let prudoct = data.find(el => el.id === id);
    if (!cart.some(item => item.id === prudoct.id))
    {
        prudoct = {...prudoct, amount : 1}
        cart.push(prudoct)
        e.target.classList.add('btn-success')
        e.target.innerText = 'added to cart'
    }
    else
    {
        const indexToRemove = cart.findIndex(item => item.id === prudoct.id);
        cart.splice(indexToRemove,1)
        e.target.classList.remove('btn-success')
        e.target.innerText = 'buy now'
    }
}


userInput.addEventListener('input',(event)=>{
    searcheInput = event.target.value
    render(activeDataOnPage,contentEl)
})

checkContainer.addEventListener('change',(event)=>{
    filterByCheckBox(event)
})
sortSelector.addEventListener('change',(event)=>{
    requieredSorting = event.target.value
    render(activeDataOnPage,contentEl)
    
})
shopButton.addEventListener('click',()=>
{
    
    cartContainer.classList.remove('hideEl');
    const tbl = document.createElement('table');
    addRowsToTable(tbl);
    addTotalSumToTable(tbl);
    addCloseTblButton(tbl);
    cartContainer.append(tbl);

    
})
    
    
    

function addRowToTable(prudoct){
    let btnplus = document.createElement('button');
    btnplus.innerText = '+';
    
    // Define event listener for btnplus button
    btnplus.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Button clicked!');
    });
    
    const prudoctImg = `<img src="${prudoct.image}" alt="Product Image">`;
    const row = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerText = `${prudoct.name}`;
    row.append(td1);

    const td2 = document.createElement('td');
    td2.innerText = `${prudoct.cat}`;
    row.append(td2);

    const td3 = document.createElement('td');
    td3.innerText = `${prudoct.amount * prudoct.price}`;
    row.append(td3);

    const td4 = document.createElement('td');
    td4.innerText = `${prudoct.amount}`;
    td4.append(btnplus); 
    row.append(td4);

    const td5 = document.createElement('td');
    td5.innerHTML = prudoctImg;
    row.append(td5);

    return row;
}

function addRowsToTable(tbl)
{
    const headerContent = `
    <thead>
    
    <tr>
    <th>Prudoct-Name</th>
    <th>Category</th>
    <th>Price</th>
    <th>Quantity</th>
    </tr>
    </thead>
    
    `;
    tbl.innerHTML = headerContent;
    const tbody = document.createElement('tbody');
    
    addContent(tbl,tbody);
    cart.forEach((el)=>
    {
        const row = addRowToTable(el);
        tbody.append(row);
        
    })

}
function addTotalSumToTable(tbl)
{
    const total  = cart.reduce((sum,current)=>
    {
        return sum + current.amount*current.price
        
    },0)
    tbl.innerHTML+=
    `<div>
    total price:${total}$
    </div>`;

}
function addCloseTblButton(tbl){
    const closeCart = document.createElement('button')
    closeCart.innerText = 'x'
    closeCart.classList.add('btn','close-cart-btn')
    closeCart.addEventListener('click',()=>
    {
        tbl.remove()
        cartContainer.classList.add('hideEl')
    
    })
    tbl.append(closeCart)

}


render(data,contentEl)                





    
   










   







