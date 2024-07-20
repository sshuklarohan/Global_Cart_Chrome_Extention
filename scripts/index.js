document.addEventListener('DOMContentLoaded', function () {
    const linksList = document.getElementById('List');
    const addButton = document.getElementById('AddButton');
  
    
    addButton.addEventListener('click', () => {
      window.location.href = 'addcart.html';
    });
    
    function renderLinks() {
      chrome.storage.sync.get(['savedItems'], (result) => {
        const savedItems = result.savedItems || [];
        linksList.innerHTML = '';
        savedItems.forEach((link, index) => {
          addListItem(link, index);
        });
      });
    }
  
    renderLinks();

    function addListItem(link, index) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const price = document.createElement('span');
      const deleteButton = document.createElement('span');


      price.innerText = link.price;
      price.className = "price";
      a.href = link.url;
      a.textContent = link.name;
      a.className = "item_name"
      a.target = '_blank';
      deleteButton.innerText = "x";
      deleteButton.className = "delete_button";

      deleteButton.addEventListener('click', ()=> deleteItem(index));


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