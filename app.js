document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);

  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for (let i = 0; i < lis.length; i+=1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < lis.length; i+=1) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });

  // Function to create list items containing invitees
  function createLi(text){
    // Function to create elements nested in the li elements
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    };

    function appendToLi(elementName, property, value){
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }
    
    const li = document.createElement('li');    
    appendToLi('span', 'textContent', text);
    appendToLi('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLi('button', 'textContent', 'edit');   
    appendToLi('button', 'textContent', 'remove');
    return li;
  }

  // Submit handler for invite textbox
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLi(text);
    ul.appendChild(li);
  });


  // Change handler to add CSS when box is checked
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  // Click handler to remove names from list/edit button to edit invitee names
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };

      // Select and run action in button's name
      nameActions[action]();
    }
  });
});

// Form validation -- reject empty strings ---> alert to the user to input a name
// Confirmed checkbox should read 'Confirm' before checking, 'Confirmed' after. ----> look into text nodes: https://developer.mozilla.org/en-US/docs/Web/API/Text
// Add text area for notes on invitees
// Add checkbox for not coming
// Add behavior to hide checkbox when 'Confirmed' checkbox is checked
// Look into local storage for saving page information after refresh ----> https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  -----  treehouse link: https://teamtreehouse.com/library/using-local-storage-with-javascript-2