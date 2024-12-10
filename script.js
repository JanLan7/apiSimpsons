document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote');
    const characterText = document.getElementById('character');
    const characterImg = document.getElementById('character-img');
    const newQuoteButton = document.getElementById('new-quote');

    async function fetchQuote() {
        try {
            const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
            const data = await response.json();
            const quote = data[0].quote;
            const character = data[0].character;
            const image = data[0].image;

            quoteText.textContent = `"${quote}"`;
            characterText.textContent = `- ${character}`;
            characterImg.src = image;
            characterImg.style.display = 'block';
        } catch (error) {
            quoteText.textContent = 'Error al obtener la cita. Inténtalo de nuevo.';
            characterText.textContent = '';
            characterImg.style.display = 'none';
        }
    }

    newQuoteButton.addEventListener('click', fetchQuote);

    // Obtener una cita al cargar la página
    fetchQuote();
});