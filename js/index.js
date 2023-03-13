import {
    catsData
} from './data.js'

let emotionRadios = null;
let memeModal = null;

function init() {

    emotionRadios = document.getElementById('emotion-radios')
    const getImageBtn = document.getElementById('get-image-btn')
    memeModal = document.getElementById('meme-modal')
    const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

    renderEmotionsRadios(catsData)

    emotionRadios.addEventListener('change', highlightCheckedOption)

    getImageBtn.addEventListener('click', renderCat)

    memeModalCloseBtn.addEventListener('click', closeModal)
}


function highlightCheckedOption(e) {
    e.target.classList.add('highlight')
}

function renderCat() {
    const catObject = getMatchingCat()
    document.getElementById('meme-modal-inner')
        .innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function getMatchingCat() {

    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = document.getElementById('gifs-only-option').checked

        return catsData.find(function (cat) {

            if (isGif) {
                if (cat.emotionTags.includes(selectedEmotion) && cat.isGif) {
                    return cat
                }

            } else {
                if (cat.emotionTags.includes(selectedEmotion))
                    return cat
            }
        })

    }
}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {

    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

function closeModal() {
    memeModal.style.display = 'none'
}


document.addEventListener("DOMContentLoaded", init)