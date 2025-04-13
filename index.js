import {catsData} from '/data.js'

const emotionRadio = document.getElementById('emotion-radios')
const gifCheck = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const getImg = document.getElementById('get-image-btn')
const modalCloseBtn = document.getElementById('meme-modal-close-btn')


emotionRadio.addEventListener('change', hc)

modalCloseBtn.addEventListener('click', close)

getImg.addEventListener('click', renderKitty)

function hc(e){
    const radioItems = document.getElementsByClassName('radio')
   
    for(let radio of radioItems) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function close() {
    memeModal.style.display = 'none'
}

function renderKitty() {
    const catImg = singleKitty()
    memeModalInner.innerHTML = `<img 
        class="cat-img" 
        src="./images/${catImg.image}"
        alt=${catImg.alt}
        >`

    memeModal.style.display = 'flex'
}

function singleKitty(){
    const kittyArr = getMatchingCatsArray()
    if(kittyArr.length === 1) {
        return kittyArr[0]   
    }

    else{
        return (kittyArr[Math.floor(Math.random()* kittyArr.length)] )
    }
}

function getMatchingCatsArray() {
    if(document.querySelector('input[type="radio"]:checked')) {  
        const radio = document.querySelector('input[type="radio"]:checked')
        const isGif = gifCheck.checked
        
        const array = catsData.filter(function(cats){
            if(isGif) {
                return (cats.emotionTags.includes(radio.value) && cats.isGif)
            }
            else{
                return cats.emotionTags.includes(radio.value)
            }
        })
        return array
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if(!(emotionsArray.includes(emotion))) {
                emotionsArray.push(emotion)
            }
        }
    }

    return emotionsArray
}

function renderEmotionsRadios(cats)  {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    // check for duplicate moods....
    // for (let i = 0; i <emotions.length; i++) {
    //     if(!emotion.includes(emotions[i])) {
    //         emotion.push(emotions[i])
    //     }   
    // }
    // same here commented out code removes r the duplicates..
    // const emotion = emotions.filter((item, index) => emotions.indexOf(item) == index)

    for (let emo of emotions) {
        radioItems += `
        <div class = "radio">
            <label for = ${emo}>${emo}</label>
            <input type = "radio" 
                id = ${emo} 
                name="emotions"
                value=${emo} >
        </div>`
    }
    emotionRadio.innerHTML = radioItems
}

renderEmotionsRadios(catsData)
