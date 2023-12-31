function changeLength() {
    var value = document.getElementById('range').valueAsNumber
    document.getElementById('res').innerText = value
}

function generate() {
    var check = document.querySelectorAll('.check > input[type="checkbox"]')
    var charset = [
        ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"],
        ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"],
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        ["!", "@", "#", "$", "%"]
    ]
    var chars = []
    var strenghtLevel = -1
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked) {
            for (let j = 0; j < charset[i].length; j++) {
                chars.push(charset[i][j])
            }
            strenghtLevel++
        }
    }
    
    const errorClassList = document.getElementById('error').classList
    var elementLevels = document.querySelectorAll('.levels')
    var errorMsg = elementLevels[0].previousElementSibling
    if (strenghtLevel == -1) {
        for (let i = 0; i < elementLevels.length; i++) {
            elementLevels[i].setAttribute('name', '')
        }
        errorMsg.innerText = 'none'
        errorClassList.add('active')
    } else {
        errorClassList.remove('active')
        strenght(strenghtLevel)
        document.querySelector('.result > p').innerHTML = password(chars)
    }
}

function strenght(level) {
    var levels = ["weak", "medium", "strong", "robust"]
    document.querySelector('#level').innerText = levels[level]
    var elementLevels = document.querySelectorAll('.levels')
    for (let i = 0; i < elementLevels.length; i++) {
        elementLevels[i].setAttribute('name', `${levels[level]}`)
    }
}

function password(chars) {
    var password = ''
    var length = Number(document.getElementById('res').innerText)
    for (let i = 0; i < length; i++) {
        password += `${chars[parseInt(Math.random() * chars.length)]}`
        if (i % 25 == 0 && i != 0) {
            password += `<br>`
        }
    }
    return password
}

function copy(p) {
    navigator.clipboard.writeText(p.innerText)
    p.id = 'copy'
    setTimeout(() => {
        p.id = ''
    }, 1000)
}