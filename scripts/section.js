window.addEventListener("wheel", (e) => {
    e.preventDefault()
}, { passive: false })

const $html = $("html")
const lastPage = $(".section").length
let currentPage = 1

$html.animate({ scrollTop: 0 }, 10)

$(window).on("wheel", (e) => {
    if ($html.is(":animated")) {
        return
    }
    if (e.originalEvent.deltaY > 0) {
        if (currentPage == lastPage) {
            return
        }

        currentPage += 1

    } else if (e.originalEvent.deltaY < 0) {
        if (currentPage == 1) {
            return
        }

        currentPage -= 1
    }

    const topPosition = (currentPage - 1) * $(window).height()
    $html.animate({ scrollTop: topPosition })

})

