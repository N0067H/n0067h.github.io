
const changeYear = (element) => {
    const yearDisplay = document.getElementById("year-display")
    yearDisplay.textContent = element.value

    const yearContent = document.getElementById("year-content")
    yearContent.innerHTML = yearContents[element.value - 2018]
}

changeYear(document.getElementById("year-slider"))

