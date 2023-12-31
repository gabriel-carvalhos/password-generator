const generate = document.querySelector('.btn-generate')
const copy = document.querySelector('.copy')
const range = document.querySelector('.range')
const res = document.querySelector('.result > p')
const check = document.querySelectorAll('.check > input[type="checkbox"]')
const error = document.querySelector('.error')
const levelContainer = document.querySelector('.level-container')
const level = document.querySelector('.level')
const elementLevels = document.querySelectorAll('.levels')
const passwordLength = document.querySelector('.password-length')

generate.addEventListener('click', () => {
    const checked = [...check].filter(item => item.checked)
    if (!checked.length) {
        levelContainer.classList.remove(`${levelContainer.classList[1]}`) // improve this
        error.classList.add('active')
        return
    }
    
    error.classList.remove('active')
    const charset = [
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'abcdefghijklmnopqrstuvwxyz',
        '0123456789',
        '!@#$%&*'
    ]

    const chars = charset.filter((item, i) => checked.includes(check[i])).reduce((acc, charType) => acc += charType, '')
    const strenghtLevel = checked.length - 1

    strenght(strenghtLevel)
    res.innerHTML = password(chars)
})

range.addEventListener('change', () => {
    let value = document.querySelector('.range').valueAsNumber
    passwordLength.innerText = value
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(res.innerText)
    res.classList.add('copied')
    setTimeout(() => {
        res.classList.remove('copied')
    }, 1000)
})

function strenght(strenghtLevel) {
    const levels = ["weak", "medium", "strong", "robust"]
    level.innerText = levels[strenghtLevel]

    // improve this
    if (levelContainer.classList.length > 1) {
        levelContainer.classList.replace(`${levelContainer.classList[1]}`, `${levels[strenghtLevel]}`)
    } else {
        levelContainer.classList.add(`${levels[strenghtLevel]}`)
    }
}

function password(chars) {
    let password = ''
    const length = Number(passwordLength.innerText)
    for (let i = 0; i < length; i++) {
        password += `${chars[parseInt(Math.random() * chars.length)]}`
    }
    return password
}