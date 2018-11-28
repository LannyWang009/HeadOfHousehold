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
  let p = document.createElement('p')
  let task = document.createElement('p')
  let deadline = document.createElement('p')
  let assignedTo = document.createElement('p')
  let doneBtn = document.createElement('button')

  p.setAttribute('data-id', doc.id)
  console.log('doc.id = ' + doc.id)
  task.textContent = 'To do: ' + doc.data().task
  deadline.textContent = 'Deadline: ' + doc.data().deadline
  assignedTo.textContent = doc.data().assignedTo
  doneBtn.textContent = 'done'

  p.appendChild(task)
  p.appendChild(deadline)
  p.appendChild(doneBtn)
  assignedUser.appendChild(p)

  // delete the data goes here
  doneBtn.addEventListener('click', function (evt) {
    evt.stopPropagation()
    let id = evt.getAtrribute('data-id')
    taskRef.doc(id).delete().then(function () {
      console.log('Document successfully deleted!')
    }).catch(function (error) {
      console.error('Error removing document: ', error)
    })
  })
}

// show real time for Marco
taskRef.where('assignedTo', '==', 'Marco').onSnapshot(snapshot => {
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, marcoCard)
    } else if (change.type === 'removed') {
      let li = marcoCard.querySelector('[data-id=', change.doc.id + ']')
      marcoCard.removeChild(li)
    }
  })
})

// show real time for Zoe
taskRef.where('assignedTo', '==', 'Zoe').onSnapshot(snapshot => {
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, zoeCard)
    } else if (change.type === 'removed') {
      let li = zoeCard.querySelector('[data-id=' + change.doc.id + ']')
      zoeCard.removeChild(li)
    }
  })
})

// show real time for Bowie
taskRef.where('assignedTo', '==', 'Bowie').onSnapshot(snapshot => {
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, bowieCard)
    } else if (change.type === 'removed') {
      let li = bowieCard.querySelector('[data-id=' + change.doc.id + ']')
      bowieCard.removeChild(li)
    }
  })
})

// show real time for Cy
taskRef.where('assignedTo', '==', 'Cy').onSnapshot(snapshot => {
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc, cyCard)
    } else if (change.type === 'removed') {
      let li = cyCard.querySelector('[data-id=' + change.doc.id + ']')
      cyCard.removeChild(li)
    }
  })
})
