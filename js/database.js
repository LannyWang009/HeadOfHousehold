
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

const docRef = firestore.doc('tasks/taskType')

const inputTaskField = document.getElementById('tasks')
const saveButton = document.getElementById('saveTask')
const outputTask = document.getElementById('taskOutput')

saveButton.addEventListener('click', function () {
  const textToSave = inputTaskField.value
  console.log('Saved: ' + textToSave + ' to Firestore')
  docRef.set({
    task: textToSave
  }).then(function () {
    console.log('Status saved')
  }).catch(function (error) {
    console.log('Got an error', error)
  })
})

function getRealtimeUpdates () {
  docRef.onSnapshot(function (doc) {
    if (doc && doc.exists) {
      const taskData = doc.data()
      console.log('Document received: ', doc)
      outputTask.innerText = 'Task: ' + taskData.task
    }
  })
}

getRealtimeUpdates()

// Trying to use an autocomplete function using jQueryUI, still needs work.
function autoComplete () {
  var availableTasks = [
    'Dishes',
    'Laundry',
    'Call',
    'Groceries',
    'Yardwork',
    'Oil change',
    'Homework',
    'Walk Dog'
  ]
  $('#task').autocomplete({
    source: availableTasks
  })
};
