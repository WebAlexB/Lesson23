const formStatistics = document.getElementById("form-statistics");
const inputText = document.getElementById("text-statistics");

formStatistics.addEventListener('submit', function (e) {
    e.preventDefault();
    const words = inputText.value;
    fetch('http://localhost:5555/calculate-statistics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ words: words }),
    })
        .then(response => response.json())
        .then(data => displayStatistics(data.uniqueWordsCount, data.wordCountMap))
        .catch(error => console.error('Error:', error));
});

function displayStatistics(uniqueWordsCount, wordCountMap) {
    const resultContainer = document.getElementById("statistics-result");
    resultContainer.innerHTML = "Унікальних слів: " + uniqueWordsCount + "<br>";

    for (const [word, count] of Object.entries(wordCountMap)) {
        resultContainer.innerHTML += word + ": " + count + "<br>";
    }
}
