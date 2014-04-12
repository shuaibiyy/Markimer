var Markimer = function () {};

Markimer.prototype.fetchBookmarks = function () {
  chrome.bookmarks.get("Ruby", function (bookmark) {
    console.log(bookmark);

    document.getElementById("bookmarks").innerHTML = bookmark;

    // var listItem = document.createElement("li");
    // var listsElement = document.getElementById('bookmarks');
    // listsElement.appendChild('elem');

  });
};

Markimer.prototype.setTimeToLive = function (bookmark) {};

Markimer.prototype.setTimeToTrigger = function (bookmark, time) {};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  var markimer = new Markimer();
  markimer.fetchBookmarks();
});
