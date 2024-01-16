// Search Card Properties

document.querySelector('.search').addEventListener('submit', async (e) => {
    e.preventDefault()

    const input = document.querySelector('#searchInput').value

    if (input !== '') {
        clearInfo()
        showWarning('Loading Card...')

        const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURI(input)}`

        const response = await fetch(url)
        const json = await response.json()

        if (response.status === 200) {
            showCardInfo({
                name: json.data[0].name,
                attribute: json.data[0].attribute,
                level: json.data[0].level,
                atk: json.data[0].atk,
                def: json.data[0].def,
                sets: json.data[0].card_sets[0].set_code,
                race: json.data[0].race,
                type: json.data[0].type,
                desc: json.data[0].desc,
                image: json.data[0].card_images[0].image_url,
            }),
            additionalImagesSearch({
                moreImage: json.data[0].card_images
            }),
            handleDisplayCard()
        } else {
            clearInfo()
            showWarning(`The specific card you're looking for doesn't exist`)
        }

    } else {
        clearInfo()
    }
})


// Search a Random Card

document.querySelector('#random-card').addEventListener('click', async () => {
    clearInfo()
    showWarning('Loading Card...')
    document.querySelector('#random-card').disabled = true

    const url = 'https://db.ygoprodeck.com/api/v7/randomcard.php'

    const response = await fetch(url)
    const json = await response.json()

    if (response.status === 200) {
        showWarning('')
        const moreImagesContainer = document.querySelector('.card-more-images')
        
        moreImagesContainer.innerHTML = ''
        
        json.card_images.map((imgObj) => {
            const displayImgs = document.createElement('img')
            displayImgs.setAttribute('src', imgObj.image_url)
            moreImagesContainer.appendChild(displayImgs)
        })
        handleDisplayCard()

        if (json.attribute !== undefined) {
            document.querySelector('.card-name').innerHTML = `${json.name}`
        
            document.querySelector('.card-image img').setAttribute('src', json.card_images[0].image_url)
        
            document.querySelector('.card-attribute span').innerHTML = `${json.attribute}`
            document.querySelector('.card-level span').innerHTML = `${json.level}`
            document.querySelector('.card-atk span').innerHTML = `${json.atk}`
            document.querySelector('.card-def span').innerHTML = `${json.def}`
            document.querySelector('.card-sets span').innerHTML = `${json.card_sets[0].set_code}`
            document.querySelector('.card-race span').innerHTML = `${json.race}`
            document.querySelector('.card-type span').innerHTML = `${json.type}`
            document.querySelector('.card-desc span').innerHTML = `${json.desc}`
        } 

        if (json.type === 'Spell Card' || json.type === 'Trap Card') {
            document.querySelector('.card-name').innerHTML = `${json.name}`

            document.querySelector('.card-image img').setAttribute('src', json.card_images[0].image_url)

            document.querySelector('.card-sets span').innerHTML = `${json.card_sets[0].set_code}`

            document.querySelector('.card-type span').innerHTML = `${json.type}`
            document.querySelector('.card-race span').innerHTML = `${json.race}`
            document.querySelector('.card-desc span').innerHTML = `${json.desc}`
        }
    }

    document.querySelector('#random-card').disabled = false
})

// Display the Desired Card

function handleDisplayCard() {
    const cardMoreImgs = document.querySelectorAll('.card-more-images img')
    const cardDisplay = document.querySelector('.card-image img')

    cardMoreImgs.forEach((img) => {
        img.addEventListener('click', () => {
            cardDisplay.setAttribute('src', img.getAttribute('src'))
        })
        img.classList.add('more-images-icon')
        img.setAttribute('title', 'Click to display this art')
    })

}

function blockSelectionedArt() {
    const cardIcon = document.querySelectorAll('more-images-icon')
    const cardDisplay = document.querySelector('.card-image img')

    if (cardDisplay.src === cardIcon.src) {
        alert('this is the card!')
    } else {
        alert('you still dont get it, man... ')
    }
}

// Card Infos

function showCardInfo(json) {
    showWarning('')

    if (json.attribute !== undefined) {
        document.querySelector('.card-name').innerHTML = `${json.name}`
    
        document.querySelector('.card-image img').setAttribute('src', json.image)
    
        document.querySelector('.card-attribute span').innerHTML = `${json.attribute}`
        document.querySelector('.card-level span').innerHTML = `${json.level}`
        document.querySelector('.card-atk span').innerHTML = `${json.atk}`
        document.querySelector('.card-def span').innerHTML = `${json.def}`
        document.querySelector('.card-sets span').innerHTML = `${json.sets}`
        document.querySelector('.card-race span').innerHTML = `${json.race}`
        document.querySelector('.card-type span').innerHTML = `${json.type}`
        document.querySelector('.card-desc span').innerHTML = `${json.desc}`
    } else if (json.type === 'Spell Card' || json.type === 'Trap Card') {
        document.querySelector('.card-name').innerHTML = `${json.name}`

        document.querySelector('.card-image img').setAttribute('src', json.image)

        document.querySelector('.card-type span').innerHTML = `${json.type}`
        document.querySelector('.card-race span').innerHTML = `${json.race}`
        document.querySelector('.card-desc span').innerHTML = `${json.desc}`
    }

}


// Clear Card Infos

function clearInfo() {
    showWarning('')
    document.querySelector('.card-name').innerHTML = '--'

    document.querySelector('.card-image img').setAttribute('src', './img/card-back.png')

    document.querySelector('.card-attribute span').innerHTML = '--'
    document.querySelector('.card-level span').innerHTML = '--'
    document.querySelector('.card-atk span').innerHTML = '--'
    document.querySelector('.card-def span').innerHTML = '--'
    document.querySelector('.card-sets span').innerHTML = '--'
    document.querySelector('.card-race span').innerHTML = '--'
    document.querySelector('.card-type span').innerHTML = '--'
    document.querySelector('.card-desc span').innerHTML = '--'
    document.querySelector('.card-more-images').innerHTML = ''
}


// Show Messages

function showWarning(msg) {
    document.querySelector('.warning').innerHTML = msg
}

// Show Additional Images

function additionalImagesSearch(json) {
    const moreImagesContainer = document.querySelector('.card-more-images')

    moreImagesContainer.innerHTML = ''

    json.moreImage.map((imgObj) => {
        const displayImgs = document.createElement('img')
        displayImgs.setAttribute('src', imgObj.image_url)
        moreImagesContainer.appendChild(displayImgs)
    })
}