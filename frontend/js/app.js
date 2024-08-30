document.addEventListener('DOMContentLoaded', () => {
  const regnumberInput = document.getElementById('regnumber');
  const submitButton = document.getElementById('submit');

  document.querySelectorAll('.keyboard button').forEach(button => {
      button.addEventListener('click', () => {
          const char = button.textContent;
          if (char === 'Back') {
              regnumberInput.value = regnumberInput.value.slice(0, -1);
          } else {
              regnumberInput.value += char;
          }
          validateInput();
      });
  });

  document.getElementById('reset').addEventListener('click', () => {
      regnumberInput.value = '';
      validateInput();
  });

  submitButton.addEventListener('click', async () => {
      const registrationNumber = regnumberInput.value;

      try {
          const response = await fetch('/api/cars', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  registrationNumber,
                  zone: 'Bavaria', // Exempelvärden
                  package: '24 tim fri', // Exempelvärden
              }),
          });

          const result = await response.json();

          if (response.ok) {
              alert('Registrering sparad: ' + result.car.registration_number);
          } else {
              alert(result.message); // Visar felmeddelandet från servern
          }

      } catch (error) {
          console.error('Fel vid sparande av registrering:', error);
          alert('Ett fel uppstod. Försök igen senare.');
      }
  });

  function validateInput() {
      submitButton.disabled = regnumberInput.value.length === 0;
  }
});
