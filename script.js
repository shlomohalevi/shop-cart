const data = [
    {
       "id":"1",
        "cat":"food",
        "name":"Milk",
        "price":"6",
        "image":"https://images.unsplash.com/photo-1559598467-f8b76c8155d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDcxOTMxNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    },
    {
       "id":"2",
        "cat":"food",
        "name":"Bread",
        "price":"8",
        "image":"https://plus.unsplash.com/premium_photo-1663851785132-d0372e7801ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDcxOTIxNQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    },
    {
       "id":"4",
        "cat":"food",
        "name":"Eggs",
        "price":"12",
        "image":"https://images.unsplash.com/photo-1593462430565-94f606c65e71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDcxODk5Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    },
    {
       "id":"3",
        "cat":"clothing",
        "name":"Coat",
        "price":"120",
        "image":"https://images.unsplash.com/photo-1520484205608-f65d27ad0765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDcyMDE1MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    },
    {
       "id":"5",
        "cat":"clothing",
        "name":"Dress",
        "price":"4000",
        "image":"https://plus.unsplash.com/premium_photo-1670430623154-24626c42fb33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwODQzNzc2NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    },
    {
       "id":"6",
        "cat":"clothing",
        "name":"Shirt",
        "price":"70",
        "image":"https://images.unsplash.com/photo-1602810319428-019690571b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDcxOTk1Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    },
    {
       "id":"7",
        "cat":"animals",
        "name":"Dog food",
        "price":"70",
        "image":"https://images.unsplash.com/photo-1608408891486-f5cade977d19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDcxOTY3OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    },
    {
        "id":"8",
        "cat":"animals",
        "name":"Cat toy",
        "price":"50",
        "image":"https://images.unsplash.com/photo-1618500299034-abce7ed0e8df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDcxOTU5Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    }
]
const contentEl = document.querySelector('#content')
const sortSelector = document.querySelector('#sort')
console.log(sortSelector)
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
    <p class = "card-text">price: ${pruduct.price}$</p>
    </div>
    `
    const btn = document.createElement('button')
    btn.classList.add('bg-blue-gray-hover')

    if(cart.some(el => el.id == pruduct.id))
    {
        btn.classList.add('bg-blue-gray')
        btn.innerText = 'added to cart'
    }
    else
    {
        btn.classList.add('bg-navy-color')
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
            const col = createCol('col-md-3 pt-4');
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
        e.target.classList.remove('bg-navy-color')
        e.target.classList.add('bg-blue-gray')
        e.target.innerText = 'added to cart'
    }
    else
    {
        const indexToRemove = cart.findIndex(item => item.id === prudoct.id);
        cart.splice(indexToRemove,1)
        e.target.classList.remove('bg-blue-gray')
        e.target.classList.add('bg-navy-color')
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
    tbl.className = 'open-tbl-animation'
    cartContainer.append(tbl);
    addRowsToTable(tbl);
    addTotalSumToTable(tbl);
    addCloseTblButton(tbl);
    
    
    
})
    
    
    

function addRowToTable(prudoct){
    const btnplus = document.createElement('button');
    btnplus.innerText = '+';
    btnplus.id = `btnplus${prudoct.id}`
    btnplus.classList.add('btn')
    btnplus.addEventListener('click', (e) => {
        prudoct.amount+=1
        const event = new Event('plusbtnclicked');
        td3.dispatchEvent(event);
        td4.dispatchEvent(event)
        const tbl = document.querySelector('table')
        addTotalSumToTable(tbl)

    
    });

    const btnminus = document.createElement('button');
    btnminus.innerText = '-';
    btnminus.id = `btnminus${prudoct.id}`
    btnminus.classList.add('btn')
    btnminus.addEventListener('click', (e) => {

        if (prudoct.amount > 0)
        {
            prudoct.amount-=1
            const tbl = document.querySelector('table')
            console.log(tbl)
            addTotalSumToTable(tbl)
            const event = new Event('minusbtnclicked');
            td3.dispatchEvent(event)
            td4.dispatchEvent(event)


        }
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
    td3.addEventListener('plusbtnclicked', ()=> {
        td3.innerText= `${prudoct.amount * prudoct.price}`;
    });
    td3.addEventListener('minusbtnclicked', ()=> {
        td3.innerText= `${prudoct.amount * prudoct.price}`;
    });
       
    row.append(td3);
    const td4 = document.createElement('td');
    td4.append(btnminus); 
    td4.insertAdjacentText('beforeend',prudoct.amount)
    td4.append(btnplus);
    td4.addEventListener('plusbtnclicked', ()=> {
        td4.innerHTML = ''
        td4.append(btnminus); 
        td4.insertAdjacentText('beforeend',prudoct.amount)
        td4.append(btnplus);
    });
    td4.addEventListener('minusbtnclicked', ()=> {
        td4.innerHTML = ''
        td4.append(btnminus); 
        td4.insertAdjacentText('beforeend',prudoct.amount)
        td4.append(btnplus);
    });
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
    let totalEl = tbl.querySelector('#totalPrice')
    if(!totalEl)
    {
        totalEl = document.createElement('div')
        totalEl.id = 'totalPrice'
        tbl.append(totalEl)
    }

    totalEl.innerText = ''
    const total  = cart.reduce((sum,current)=>
    {
        return sum + current.amount*current.price
        
    },0)
    
    totalEl.innerText = `Total price: ${total}$`;

}
function addCloseTblButton(tbl){
    const closeCart = document.createElement('button')
    closeCart.innerText = 'x'
    closeCart.classList.add('btn','close-cart-btn')
    closeCart.addEventListener('click',()=>
    {
        tbl.className = 'close-tbl-animation'
        tbl.remove()
        cartContainer.classList.add('hideEl')
    
    })
    tbl.append(closeCart)

}
render(data,contentEl)                
    
    
    
    
      







    
   










   







