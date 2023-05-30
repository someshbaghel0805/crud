let selectedRow = null
function setLocalStorage(e) {
  // e.preventdefault()
  if (localStorage.getItem('formData')) {
    // let arr = JSON.parse(localStorage.getItem('formData')) ?? []
    // const localData = arr.map((user, i) => {
    //   return `<span class=“fullname”>${user.fullname}</span>
    //   <span class=“email”>${user.email}</span>
    //   <button id=“” onclick='${() => onDelete(i)}'>Delete</button>
    //   <button id=“btnEdit” onclick=“${() => onEdit(i)}“>Edit</button>`
    // })
    // console.log('localdata>>>', localData)
    // document.getElementById('showlist').innerHTML = localData
  } else {
    let arr = []
    let arrData = {
      fullname: '',
      email: '',
    }
    arr.push(arrData)
    console.log(arr, '25')
    localStorage.setItem('userData', JSON.stringify(arr))
    alert('Done')
  }
}
async function local() {
  // alert('r')
  let localdata = (await JSON.parse(localStorage.getItem('formData'))) ?? []
  console.log('>>>>>>>>>>>>>>', localdata)
  const localData1 = localdata.map((user, i) => {
     `<span class="fullname">${user.fullname}</span>
  <span class="email">${user.email}</span>
  <button id="" onclick='${() => onDelete(i)}'>Delete</button>
  <button id="btnEdit" onclick="${() => onEdit(i)}">Edit</button>`
  })
  console.log(localData1)
  document.getElementById('showlist').innerHTML 
  return localData1
  // return 
}
local()
function readFormData() {
  let formData = {}
  formData['fullname'] = document.getElementById('fullname').value
  formData['email'] = document.getElementById('email').value
  return formData
}
function insertNewRecord(data) {
  let table = document
    .getElementById('userlist')
    .getElementsByTagName('tbody')[0]
  let newRow = table?.insertRow(table.length)
  cell1 = newRow.insertCell(0)
  cell1.innerHTML = data.fullname
  cell2 = newRow.insertCell(1)
  cell2.innerHTML = data.email
  cell3 = newRow.insertCell(2)
  cell3.innerHTML = `
                   <a onclick="onEdit(this)" >Edit</a>
                   <a onclick="onDelete(this)">Delete</a>
                `
}
function resetForm() {
  document.getElementById('fullname').value = ''
  document.getElementById('email').value = ''
  selectedRow = null
}
function onEdit(td) {
  if (td) {
    selectedRow = td?.parentElement?.parentElement
    document.getElementById('fullname').value = selectedRow.cells[0].innerHTML
    document.getElementById('email').value = selectedRow.cells[1].innerHTML
  }
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullname
  selectedRow.cells[1].innerHTML = formData.email
}
function onDelete(td) {
  if (td) {
    if (confirm('Are you sure to delete this record ')) {
      row = td.parentElement.parentElement
      document.getElementById('userlist').deleteRow(row.rowIndex)
      resetForm()
    }
  }
}
function validate() {
  document.getElementById('fullname').value
  document.getElementById('email').value
  var isValid = false
  if (
    document.getElementById('fullname').value == '' &&
    document.getElementById('email').value == ''
  ) {
    isValid = false
    document.getElementById('fullNameValidationError').classList.remove('hide'),
      document.getElementById('emailvalidation').classList.remove('hide')
  } else {
    isValid = true
    if (
      !document
        .getElementById('fullNameValidationError', 'emailvalidation')
        .classList.contains('hide')
    )
      document.getElementById('fullNameValidationError').classList.add('hide')
    document.getElementById('emailvalidation').classList.add('hide')
  }
  return isValid
}
let prom = async () => {
  let firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('firstPromise')
      resolve('Inprogress')
    }, 1000)
  })
  let secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Pending')
    }, 2000)
  })
  let thirdPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done')
    }, 3000)
  })
  let fPromise = await firstPromise
  let sPromise = await secondPromise
  let tPromise = await thirdPromise
  return [fPromise, sPromise, tPromise]
}
const main = async () => {
  console.log('sgdhsahh')
  let a = prom()
  a.then((data) => {
    console.log(data)
  })
}
// onFormSubmit(async () => {
//   let arr = await JSON.parse(localStorage.getItem('formData'))
//   console.log('>>>>>>>>>>>>>>>>>>list', arr)
//   let fullname = document.getElementById('fullname').value
//   let email = document.getElementById('email').value
//   if (fullname.length <= 0 && email.length <= 0) {
//     alert('enter something')
//   } else if (fullname.length > 0 && email.length > 0) {
//     let list = []
//     console.log(list, 'list')
//     let arrData = {
//       fullname: fullname,
//       email: email,
//     }
//     list.push(arrData, ...arr)
//     localStorage.setItem('formData', JSON.stringify(list))
//     document.getElementById('fullname').value = ''
//     document.getElementById('email').value = ''
//     setLocalStorage()
//     main()
//   } else {
//     alert('ashdhas')
//   }
// })
const onFormSubmit = async () => {
  // setLocalStorage()
  if (validate()) {
    const formData = readFormData()
    if (selectedRow == null) insertNewRecord(formData)
    else updateRecord(formData)
    // resetForm()
  }
  let arr = await JSON.parse(localStorage.getItem('formData'))
  let fullname = document.getElementById('fullname').value
  let email = document.getElementById('email').value
  if (fullname.length <= 0 && email.length <= 0) {
    alert('enter something')
  } else {
    let list = []
    console.log(list, 'list185')
    let arrData = {
      fullname: fullname,
      email: email,
    }
    console.log('>>>>>>>>>>>>>>>>>>arrData', arrData)
    if (arr) {
      list.push(arrData, ...arr)
    } else {
      list.push(arrData)
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>list>>', list)
    localStorage.setItem('formData', JSON.stringify(list))
    document.getElementById('fullname').value = ''
    document.getElementById('email').value = ''
    // local()
  }
}






