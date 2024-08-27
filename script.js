document.querySelectorAll('.keyboard button').forEach(button => {
  button.addEventListener('click', () => {
    const regInput = document.getElementById('regnumber');
    const value = button.textContent;

    // Backspace functionality
    if (button.id === 'backspace') {
      regInput.value = regInput.value.slice(0, -1);
    } else {
      // Add clicked value to the input field
      regInput.value += value;
    }

    // Enable "Spara och fortsätt" button if there's input
    document.getElementById('submit').disabled = regInput.value === '';
  });
});

// Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
  const regInput = document.getElementById('regnumber');
  regInput.value = '';
  document.getElementById('submit').disabled = true;
});
