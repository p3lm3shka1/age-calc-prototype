const dateForm = document.querySelector('.date-form')
const yearResult = document.getElementById('year-result')
const monthResult = document.getElementById('month-result')
const dayResult = document.getElementById('day-result')
const yearText = document.getElementById('year-text')
const monthText = document.getElementById('month-text')
const dayText = document.getElementById('day-text')
const yearInput = document.getElementById('year')
const monthInput = document.getElementById('month')
const dayInput = document.getElementById('day')
const dateNow = Date.now()
const thisYear = new Date(dateNow).getFullYear()
const thisMonth = new Date(dateNow).getMonth() + 1
const todayDate = new Date(dateNow).getDate()

// elements to target for errors
const inputBoxes = document.querySelectorAll('.inputBoxes')
const inputLabels = document.querySelectorAll('.inputLabels')
const requiredMsg = document.querySelectorAll('.requiredMsg')

const submitButton = document.getElementById('submit-btn')
const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

// Need to account for which dates exist - leap years, months have 30 or 31 days
// - APR, JUN, SEP, NOV - 30 days
// - Rest 31 days
// - FEB 28 days, or Leap Year 29 days

function runChecks() {
  dateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputYear = yearInput.value
    const inputMonth = monthInput.value
    const inputDay = dayInput.value
    if (inputYear === '' || inputMonth === '' || inputDay === '') { 
      for (e of inputBoxes) {
        e.classList.add('error-box')
      } 
      for (e of inputLabels) {
        e.classList.add('error-color')
      }
      for (e of requiredMsg) {
        e.classList.remove('hideMsg')
        e.classList.add('error-color')
        e.innerText = 'This field is required'
      }
    } else {
      for (e of inputBoxes) {
        e.classList.remove('error-box')
      } 
      for (e of inputLabels) {
        e.classList.remove('error-color')
      }
      for (e of requiredMsg) {
        e.classList.add('hideMsg')
        e.classList.remove('error-color')
        e.innerText = ''
      }
      getResults(inputDay, inputMonth, inputYear)
    }
  })
}
runChecks()

function checkDaysInMonth() {
  dateForm.addEventListener('change', (e) => {
    const yearNum = Number(yearInput.value)
    const monthNum = Number(monthInput.value)
    const dayNum = Number(dayInput.value)
    if (yearNum !== 0 && yearInput.value.length !== 4) {
      // Valid year entry
      inputBoxes[2].classList.add('error-box')
      inputLabels[2].classList.add('error-color')
      requiredMsg[2].classList.add('error-color')
      requiredMsg[2].classList.remove('hideMsg')
      requiredMsg[2].innerText = 'Must be a valid year'
      submitButton.disabled = true
    } else if (yearNum > thisYear || yearNum === thisYear && (monthNum === thisMonth + 1 && dayNum > todayDate || monthNum > thisMonth + 1)) {
      // No future dates
      for (e of inputBoxes) {
        e.classList.add('error-box')
      } 
      for (e of inputLabels) {
        e.classList.add('error-color')
      }
      for (e of requiredMsg) {
        e.classList.remove('hideMsg')
        e.classList.add('error-color')
        e.innerText = 'Must be in the past'
      }
      submitButton.disabled = true
    } else if ((monthNum === 4 || monthNum === 6 || monthNum === 9 || monthNum === 11) && dayNum > 30) {
      // Months with 30 days
      inputBoxes[0].classList.add('error-box')
      inputLabels[0].classList.add('error-color')
      requiredMsg[0].classList.add('error-color')
      requiredMsg[0].classList.remove('hideMsg')
      requiredMsg[0].innerText = 'Must be a valid day'
      submitButton.disabled = true
    } else if (monthNum === 2) {
      // If a year is a leap yr and month === 2 then set days to 29, else month === 2, set days to 28
      // %4 yes -> %100 no = leap year || %4 yes -> %100 yes -> %400 yes = leap year 
      // Leap Year
      if (yearNum !== 0 && ((yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 4 === 0 && yearNum % 100 === 0 && yearNum % 400 === 0)) && dayNum > 29) {
        inputBoxes[0].classList.add('error-box')
        inputLabels[0].classList.add('error-color')
        requiredMsg[0].classList.remove('hideMsg')
        requiredMsg[0].classList.add('error-color')
        requiredMsg[0].innerText = 'Must be a valid date'
        submitButton.disabled = true
      // Normal Year
      } else if (yearNum !== 0 && ((yearNum % 4 !== 0) || (yearNum % 4 === 0 && yearNum % 100 === 0 && yearNum % 400 !== 0)) && dayNum > 28) {
        inputBoxes[0].classList.add('error-box')
        inputLabels[0].classList.add('error-color')
        requiredMsg[0].classList.remove('hideMsg')
        requiredMsg[0].classList.add('error-color')
        requiredMsg[0].innerText = 'Must be a valid date'
        submitButton.disabled = true
      // Generic Feb rule
      } else if (dayNum > 29) {
        inputBoxes[0].classList.add('error-box')
        inputLabels[0].classList.add('error-color')
        requiredMsg[0].classList.remove('hideMsg')
        requiredMsg[0].classList.add('error-color')
        requiredMsg[0].innerText = 'Must be a valid date'
        submitButton.disabled = true
      } else {
        for (e of inputBoxes) {
          e.classList.remove('error-box')
        } 
        for (e of inputLabels) {
          e.classList.remove('error-color')
        }
        for (e of requiredMsg) {
          e.classList.add('hideMsg')
          e.classList.remove('error-color')
          e.innerText = ''
        }
        submitButton.disabled = false
      }
    } else if (dayNum > 31) {
      // Rest of the months with 31 days
      inputBoxes[0].classList.add('error-box')
      inputLabels[0].classList.add('error-color')
      requiredMsg[0].classList.add('error-color')
      requiredMsg[0].classList.remove('hideMsg')
      requiredMsg[0].innerText = 'Must be a valid day'
      submitButton.disabled = true
    } else if (monthNum > 12) {
      // Valid month
      inputBoxes[1].classList.add('error-box')
      inputLabels[1].classList.add('error-color')
      requiredMsg[1].classList.add('error-color')
      requiredMsg[1].classList.remove('hideMsg')
      requiredMsg[1].innerText = 'Must be a valid month'
      submitButton.disabled = true
    } else {
      for (e of inputBoxes) {
        e.classList.remove('error-box')
      } 
      for (e of inputLabels) {
        e.classList.remove('error-color')
      }
      for (e of requiredMsg) {
        e.classList.add('hideMsg')
        e.classList.remove('error-color')
        e.innerText = ''
      }
      submitButton.disabled = false
    }
  })
}
checkDaysInMonth()

function getResults(inputDay, inputMonth, inputYear) {
  const dd = inputDay.length < 2 ? `0${inputDay}` : `${inputDay}`
  const mm = inputMonth.length < 2 ? `0${inputMonth}` : `${inputMonth}`
  const date = `${inputYear}-${mm}-${dd}T00:00:01`
  const userInputDate = new Date(date).getTime()
  const diff = dateNow - userInputDate
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24))
  // year
  const yearRes = Math.floor(daysPassed / 365)
  const leftOver = (daysPassed - (yearRes * 365)) 

  // months
  // months are an array so Jan starts at 0
  const birthMonth = new Date(date).getMonth() + 1
  // Accounts for dates later in the month than present date, won't need to add extra month on results
  function lessThanMonth() {
    if (Number(inputDay) > todayDate) {
      return thisMonth - birthMonth < 0 ? (12 - (thisMonth - birthMonth) * -1) - 1 : (thisMonth - birthMonth) - 1
    } else {
      return thisMonth - birthMonth < 0 ? 12 - (thisMonth - birthMonth) * -1 : thisMonth - birthMonth
    }
  }
  const monthRes = lessThanMonth()
  
  const prevMonthLength = daysInMonth(thisYear, thisMonth - 1)

  // Accounts for different lengths of months to give amount of days
  function getDays() {
    if (Number(inputDay) < todayDate) {
      return todayDate - Number(inputDay)
    } else {
      if ((prevMonthLength - Number(inputDay)) < 0) {
        const posResult = (prevMonthLength - Number(inputDay)) * -1
        return ((prevMonthLength - Number(inputDay)) + todayDate) + posResult
      } else {
        return (prevMonthLength - Number(inputDay)) + todayDate
      }
    }
  }
  const dayRes = getDays()

  function runAnimation(finalNum, targetResult) {
    for (let i = 0; i <= finalNum; i++) {
      setTimeout(
        (function(i) {
          return function() {        
            const result = i
            targetResult.innerHTML = result
          }
        // time animation takes = total time (1000) % total number (finalNum)
        })(i), i * (1000 / finalNum))
    }
  }

  // corrects wording for amounts
  yearRes === 1 ? yearText.innerText = 'year' : yearText.innerText = 'years'
  monthRes === 1 ? monthText.innerText = 'month' : monthText.innerText = 'months'
  dayRes === 1 ? dayText.innerText = 'day' : dayText.innerText = 'days'

  if (daysPassed >= 365 || Number(inputYear) < thisYear) {
    // * Year
    thisYear === Number(inputYear) ? yearResult.innerText = 0 : runAnimation(yearRes, yearResult)
    if (leftOver > 0) {
      // * Month
      thisMonth !== Number(inputMonth) ? runAnimation(monthRes, monthResult) : monthResult.innerText = 0
      // * Day
      todayDate === Number(inputDay) ? dayResult.innerText = 0 : runAnimation(dayRes, dayResult)
    } else {
      monthResult.innerText = 0
      dayResult.innerText = 0
    }
  } else if (daysPassed < 365 || Number(inputYear) === thisYear) {
    // * Year
    yearResult.innerText = 0
    // * Month
    thisMonth !== Number(inputMonth) ? runAnimation(monthRes, monthResult) : monthResult.innerText = 0
    // * Day
    todayDate === Number(inputDay) ? dayResult.innerText = 0 : runAnimation(dayRes, dayResult)
  }
}
