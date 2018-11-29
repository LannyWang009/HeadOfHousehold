// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAfOH62OimyZABipB7qopRwtbbwuNdKGaA',
  authDomain: 'headofhousehold-222605.firebaseapp.com',
  databaseURL: 'https://headofhousehold-222605.firebaseio.com',
  projectId: 'headofhousehold-222605',
  storageBucket: 'headofhousehold-222605.appspot.com',
  messagingSenderId: '672191560403'
}
firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
var firestore = firebase.firestore()

// Disable deprecated features
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

const taskRef = firestore.collection('tasks')
// const userRef = firestore.collection('users')

const taskCard = document.querySelector('#taskCard')

// saving data ...
taskCard.addEventListener('submit', function (evt) {
  evt.preventDefault()

  taskRef.add({
    task: taskCard.task.value,
    assignedTo: taskCard.user.value,
    deadline: taskCard.dateDeadline.value
  }).then(function () {
    console.log('Status saved')
  }).catch(function (error) {
    console.log('Got an error', error)
  })
  taskCard.task.value = ''
  taskCard.user.value = ''
  taskCard.dateDeadline.value = ''
})

const zoeCard = document.getElementById('Zoe')
const marcoCard = document.getElementById('Marco')
const bowieCard = document.getElementById('Bowie')
const cyCard = document.getElementById('Cy')

// create elements and render card
function renderNewCard (doc, assignedUser) {
  let div = document.createElement('div')
  let task = document.createElement('h3')
  let deadline = document.createElement('p')
  let fontAwesome = document.createElement('i')
  // let assignedTo = document.createElement('p')
  let doneBtn = document.createElement('button')

  div.setAttribute('data-id', doc.id)
  div.setAttribute('class', 'dutyCard')
  task.setAttribute('class', 'taskName')
  deadline.setAttribute('class', 'dutyDeadline')

  console.log('doc.id = ' + doc.id)
  fontAwesome.setAttribute('class', doc.data().task)
  // task.textContent = 'To do: ' + doc.data().task
  deadline.textContent = 'Deadline: ' + doc.data().deadline
  // assignedTo.textContent = doc.data().assignedTo
  doneBtn.textContent = 'done'

  div.appendChild(fontAwesome)
  div.appendChild(deadline)
  div.appendChild(doneBtn)
  assignedUser.appendChild(div)

  // delete the data goes here
  doneBtn.addEventListener('click', function (evt) {
    evt.stopPropagation()
    let id = evt.target.parentElement.getAttribute('data-id')
    taskRef.doc(id).delete()
  })
}

// show real time for Marco
taskRef.where('assignedTo', '==', 'Marco').onSnapshot(snapshot => {
  taskRef.orderBy('deadline', 'asc')
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, marcoCard)
    } else if (change.type === 'removed') {
      let p = marcoCard.querySelector('[data-id=' + change.doc.id + ']')
      marcoCard.removeChild(p)
    }
  })
})

// show real time for Zoe
taskRef.where('assignedTo', '==', 'Zoe').onSnapshot(snapshot => {
  taskRef.orderBy('deadline', 'asc')
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, zoeCard)
    } else if (change.type === 'removed') {
      let p = zoeCard.querySelector('[data-id=' + change.doc.id + ']')
      zoeCard.removeChild(p)
    }
  })
})

// show real time for Bowie
taskRef.where('assignedTo', '==', 'Bowie').onSnapshot(snapshot => {
  taskRef.orderBy('deadline', 'asc')
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, bowieCard)
    } else if (change.type === 'removed') {
      let p = bowieCard.querySelector('[data-id=' + change.doc.id + ']')
      bowieCard.removeChild(p)
    }
  })
})

// show real time for Cy
taskRef.where('assignedTo', '==', 'Cy').onSnapshot(snapshot => {
  taskRef.orderBy('deadline', 'asc')
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, cyCard)
    } else if (change.type === 'removed') {
      let p = cyCard.querySelector('[data-id=' + change.doc.id + ']')
      cyCard.removeChild(p)
    }
  })
})
