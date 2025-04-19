document.getElementById('guessForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value;
    fetch('/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `guess=${guess}`
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('message');
        messageElement.textContent = data.message;
        document.getElementById('count').textContent = `Guesses: ${data.count}`;
        console.log(`Frontend: Message: ${data.message}, Count: ${data.count}`);

        // Add success or error class for animation
        if (data.message.includes("Good gob")) {
            messageElement.classList.add('success');
            messageElement.classList.remove('error');
            guessInput.disabled = true;
        } else {
            messageElement.classList.add('error');
            messageElement.classList.remove('success');
        }

        // Clear input box after guess
        guessInput.value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = "Kuch galat ho gaya!";
    });
});

document.getElementById('resetButton').addEventListener('click', function() {
    fetch('/reset', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('message');
        messageElement.textContent = data.message;
        messageElement.classList.remove('success', 'error');
        document.getElementById('count').textContent = `Guesses: ${data.count}`;
        document.getElementById('guessInput').disabled = false;
        document.getElementById('guessInput').value = '';
        console.log(`Frontend: Reset - Message: ${data.message}, Count: ${data.count}`);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = "Reset me error!";
    });
});
