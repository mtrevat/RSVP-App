const form = document.getElementById('registrar');
const input = form.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';

  const paragraphLength = 500;
  
  console.log('text');
  
  const ul = document.getElementById('invitedList');
  const li = document.createElement('li');
  li.textContent = text;
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);
  for (i = 0; i<paragraphLength; i++) {
    ul.appendChild(li);
  }
});
