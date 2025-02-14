document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote');
    const translatedQuoteText = document.getElementById('translated-quote');
    const characterText = document.getElementById('character');
    const characterImg = document.getElementById('character-img');
    const newQuoteButton = document.getElementById('new-quote');

    async function fetchQuote() {
        try {
            const url = 'https://thesimpsonsquoteapi.glitch.me/quotes';
            const response = await fetch(url);
            const data = await response.json();
            const quote = data[0].quote;
            const character = data[0].character;
            const image = data[0].image;

            const translatedQuote = await translateQuote(quote);
            quoteText.textContent = `"${quote}"`;
            translatedQuoteText.textContent = `(${translatedQuote})`;
            characterText.textContent = `- ${character}`;
            characterImg.src = image;
            characterImg.style.display = 'block';
        } catch (error) {
            quoteText.textContent = 'Error al obtener la cita. Inténtalo de nuevo.';
            translatedQuoteText.textContent = '';
            characterText.textContent = '';
            characterImg.style.display = 'none';
        }
    }

    async function translateQuote(quote) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(quote)}&langpair=en|es`);
        const data = await response.json();
        return data.responseData.translatedText;
    }

    newQuoteButton.addEventListener('click', fetchQuote);

    // Obtener una cita al cargar la página
    fetchQuote();
});