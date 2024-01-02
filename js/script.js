const generate = document.querySelector('.btn-generate')
const copy = document.querySelector('.copy')
const range = document.querySelector('.range')
const res = document.querySelector('.result > p')
const check = document.querySelectorAll('.check > input[type="checkbox"]')
let checked
const error = document.querySelector('.error')
const levelContainer = document.querySelector('.level-container')
const level = document.querySelector('.level')
const passwordLength = document.querySelector('.password-length')

generate.addEventListener('click', () => {
    if (!checked?.length) {
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

    const chars = charset
        .filter((item, i) => checked.includes(check[i]))
        .reduce((acc, charType) => acc += charType, '')
    
    res.innerHTML = password(chars)
})

check.forEach(item => {
    item.addEventListener('click', () => {
        checked = [...check].filter(item => item.checked)
        strenght(checked.length - 1)
    })
})

range.addEventListener('input', () => {
    passwordLength.innerText = range.valueAsNumber
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(res.innerText)
    res.classList.add('copied')
    setTimeout(() => {
        res.classList.remove('copied')
    }, 1000)
})

const strenght = (strenghtLevel) => {
    const levels = ["fraca", "média", "forte", "robusta"]
    const strenghtName = levels[strenghtLevel] ?? 'nenhum'
    level.innerText = strenghtName

    // improve this
    if (levelContainer.classList.length > 1) {
        levelContainer.classList.replace(`${levelContainer.classList[1]}`, `${strenghtName}`)
    } else {
        levelContainer.classList.add(`${strenghtName}`)
    }
}

const password = (chars) => {
    let password = ''
    const length = Number(passwordLength.innerText)
    for (let i = 0; i < length; i++) {
        password += `${chars[parseInt(Math.random() * chars.length)]}`
    }
    return password
}
