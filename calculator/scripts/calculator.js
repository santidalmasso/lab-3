const display = document.querySelector('#display')
const preCalc = document.querySelector('#pre-calc')
const clearButton = document.querySelector('#clear')
const equalButton = document.querySelector('#equal')
const deleteButton = document.querySelector('#delete')
const buttons = document.querySelectorAll('[data-value]')

let calculationDone = false

function handleButtonClick(e) {
  if (e.pointerType !== 'mouse' && e.pointerType !== 'touch') return
  const valueOfButtonClicked = e.target.dataset.value

  if (valueOfButtonClicked === '+-') {
    display.textContent = -display.textContent
    return
  }

  if (
    isNumber(valueOfButtonClicked) &&
    !hasOperator(display.textContent) &&
    calculationDone
  ) {
    display.textContent = ''
    calculationDone = false
  }

  display.textContent += valueOfButtonClicked

  if (isNumber(valueOfButtonClicked) || valueOfButtonClicked === '%') {
    const result = parseFloat(
      eval(prepareStringForEvaluation(display.textContent)).toFixed(10),
    )

    if (display.textContent != result) {
      preCalc.textContent = result
    }
  }

  function prepareStringForEvaluation(inputStr) {
    const stringWithPercentageReplaced = replacePercentage(inputStr)
    return stringWithPercentageReplaced.replaceAll('x', '*')
  }

  function replacePercentage(inputStr) {
    const percentageRegex = /(?:(\d))?%(\d+)?/g
    const replacedPercentage = inputStr.replace(
      percentageRegex,
      function (match, p1, p2) {
        if (p1 && p2) return `${p2}*${p1}/100`
        if (p1) return `${p1}/100`
        return match
      },
    )
    return replacedPercentage
  }

  function hasOperator(text) {
    const operators = ['+', '-', '*', '/']
    return operators.some(operator => text.includes(operator))
  }
}

function isNumber(potentialNumber) {
  return !isNaN(Number(potentialNumber))
}

function calculateResult() {
  display.textContent = preCalc.textContent.replaceAll('*', 'x')
  preCalc.textContent = null
  calculationDone = true
}

function clearDisplay() {
  display.textContent = null
  preCalc.textContent = null
}

function handleDelete() {
  display.textContent = display.textContent.slice(0, -1)
}

const clickEvent = new PointerEvent('click', {
  pointerType: 'mouse',
})

function handleKeyboardInput(e) {
  if (e.key === 'Enter') {
    equalButton.click()
  }

  if (e.key === '.') {
    document.querySelector('[data-value="."]').dispatchEvent(clickEvent)
  }

  if (e.key === '+') {
    document.querySelector('[data-value="+"]').dispatchEvent(clickEvent)
  }

  if (e.key === '-') {
    document.querySelector('[data-value="-"]').dispatchEvent(clickevent)
  }

  if (e.key === '*') {
    document.querySelector('[data-value="x"]').dispatchEvent(clickEvent)
  }

  if (e.key === '/') {
    document.querySelector('[data-value="/"]').dispatchEvent(clickEvent)
  }

  if (e.key === '%') {
    document.querySelector('[data-value="%"]').dispatchEvent(clickEvent)
  }

  if (e.key === 'Backspace') {
    deleteButton.dispatchEvent(clickEvent)
  }

  if (e.key === 'Escape') {
    clearButton.dispatchEvent(clickEvent)
  }

  if (isNumber(e.key)) {
    const numberButton = [...buttons].find(
      button => button.getAttribute('data-value') === e.key,
    )
    if (!numberButton) return
    numberButton.dispatchEvent(clickEvent)
  }
}

buttons.forEach(function (button) {
  button.addEventListener('click', handleButtonClick)
})
window.addEventListener('keydown', handleKeyboardInput)
equalButton.addEventListener('click', calculateResult)
clearButton.addEventListener('click', clearDisplay)
deleteButton.addEventListener('click', handleDelete)
