
console.log('running js')
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore()

// Disable deprecated features
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// set HTML elements
const taskName = document.getElementById('taskName')
const deadlineDate = document.getElementById('deadlineDate')
const executor = document.getElementById('executor')
const submitbtn = document.getElementById('submitbtn')

submitbtn.addEventListener('click', function () {
  // TODO: add creator/current user uid
  console.log('saving task data to firestore')
  // Add a new document with a generate id.
  db.collection('task').add({
    taskname: taskName,
    deadline: deadlineDate,
    status: false,
    executor: executor
  }).then(function (docRef) {
    console.log('just saved the new task: ', docRef.id)
  }).catch(function (error) {
    console.log('Error adding new task:', error)
  })
})
