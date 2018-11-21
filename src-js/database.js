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
  console.log('button')

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

const newCard = document.getElementById('newCard')
// create elements and render card
function renderNewCard (doc) {
  let li = document.createElement('li')
  let task = document.createElement('p')
  let deadline = document.createElement('p')
  let assignedTo = document.createElement('p')

  li.setAttribute('data-id', doc.id)
  console.log(doc.id)
  task.textContent = doc.data().task
  deadline.textContent = doc.data().deadline
  assignedTo.textContent = doc.data().assignedTo

  li.appendChild(assignedTo)
  li.appendChild(task)
  li.appendChild(deadline)

  newCard.appendChild(li)

  // delete the data goes here
}

// get the data
taskRef.orderBy('deadline').get().then(function (getTasks) {
  getTasks.docs.forEach(function (doc) {
    console.log(doc.data())
    renderNewCard(doc)
  })
})

// show real time
taskRef.orderBy('deadline').onSnapshot(snapshot => {
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type === 'added') {
      renderNewCard(change.doc)
    } else if (change.type === 'removed') {
      let li = newCard.querySelector('[data-id=' + change.doc.id + ']')
      newCard.removeChild(li)
    }
  })
})
