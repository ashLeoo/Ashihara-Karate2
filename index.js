console.log('Suntem conectati!');

class FormHandler {
  constructor(formElement) {
    this.form = formElement;
    this.messageContainer = document.createElement('div');
    this.messageContainer.classList.add('message-container');
    this.form.appendChild(this.messageContainer);
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault(); // prevenim comportamentul implicit al formularului

    // Verificăm dacă toate câmpurile sunt completate, inclusiv secțiunea de tip radio
    const formData = new FormData(this.form);
    let formIsValid = true;

    // Verificăm toate câmpurile text
    formData.forEach((value, key) => {
      if (!value) {
        formIsValid = false;
        return;
      }
    });

    // Verificăm secțiunea de tip radio
    const genderInputs = this.form.querySelectorAll('input[name="gender"]');
    let genderChecked = false;
    genderInputs.forEach(input => {
      if (input.checked) {
        genderChecked = true;
      }
    });

    if (!genderChecked) {
      formIsValid = false;
    }

    // Dacă nu toate câmpurile sunt completate, afișăm mesajul de eroare și nu trimitem formularul
    if (!formIsValid) {
      this.showMessage('Te rugăm să completezi toate câmpurile!', 'error');
      return;
    }

    // Dacă toate câmpurile sunt completate, trimitem formularul
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await this.submitFormData(formObject);
      if (response.status === 201) { // Verificăm dacă răspunsul este de tipul "Created"
        this.showMessage('Trimitere cu succes!', 'success');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      this.showMessage('A apărut o eroare! Te rugăm să încerci din nou mai târziu.', 'error');
    }
  }

  async submitFormData(formData) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    return await fetch(url, options);
  }

  showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', type);
    this.messageContainer.innerHTML = ''; // Ștergem mesajele anterioare
    this.messageContainer.appendChild(messageElement);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.forms['myForm'];
  const formHandler = new FormHandler(formElement);
});
