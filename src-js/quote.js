$(document).ready(function () {
  $.ajaxSetup({ cache: false })

  $.getJSON('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&callback=', function (data) {
    $('.quote').html(data[0].content + ' - ' + data[0].title)
  })
})
