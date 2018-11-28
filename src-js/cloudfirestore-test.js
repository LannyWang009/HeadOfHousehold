
console.log('running js')
// Initialize Cloud Firestore through Firebase
var firestore = firebase.firestore()

// Disable deprecated features
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

const docRef = firestore.collection('task')
// set HTML elements
const taskName = document.querySelector('#taskName').value
// const deadlineDate = document.querySelector('#deadlineDate')
// const executor = document.querySelector('#executor')
const submitbtn = document.querySelector('#submitbtn')

submitbtn.addEventListener('click', function () {
  // TODO: add creator/current user uid
  console.log('saving task data to firestore')
  // Add a new document with a generate id.

  console.log(taskName)

  docRef.add({
    taskname: taskName
  }).then(function (docRef) {
    console.log('just saved the new document: ', docRef.id)
  }).catch(function (error) {
    console.log('Error adding new task:', error)
  })
})
