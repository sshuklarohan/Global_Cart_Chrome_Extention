document.addEventListener('DOMContentLoaded', function () {
    const total = document.getElementById('Total');
    var sumPrices = 0;
    const linksList = document.getElementById('List');
    const addButton = document.getElementById('AddButton');
  
    
    addButton.addEventListener('click', () => {
      window.location.href = 'addcart.html';
    });
    
    function renderLinks() {
      chrome.storage.sync.get(['savedItems'], (result) => {
        sumPrices = 0;
        const savedItems = result.savedItems || [];
        linksList.innerHTML = '';
        savedItems.forEach((link, index) => {
          addListItem(link, index);
        });
        total.innerText = "Subtotal:   $" + sumPrices.toFixed(2);
      });
    }

    renderLinks();

    function addListItem(link, index) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const price = document.createElement('span');
      const deleteButton = document.createElement('span');
      const icon = document.createElement("img");
      sumPrices += parseFloat(link.price);


      price.innerText = "$" + link.price;
      price.className = "price";
      a.href = link.url;
      console.log(link.url);
      a.textContent = link.name;
      a.className = "item-name"
      a.target = '_blank';
      deleteButton.innerText = "x";
      deleteButton.className = "delete-button";

      let iconUrl = `${a.protocol}//${a.hostname}`;
      iconUrl = iconUrl + "/favicon.ico";
      icon.src = iconUrl;
      icon.classList = "icon";

      deleteButton.addEventListener('click', ()=> deleteItem(index));
      li.appendChild(icon);
      li.appendChild(a);
      li.appendChild(price);
      li.appendChild(deleteButton);
      linksList.appendChild(li);
    }


    function deleteItem(index){
      chrome.storage.sync.get(['savedItems'], (result) => {
        let savedItems = result.savedItems;
        savedItems.splice(index,1);
        chrome.storage.sync.set({savedItems: savedItems}, ()=>{
          renderLinks();
        });

      });
    }
});