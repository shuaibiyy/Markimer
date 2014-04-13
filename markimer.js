var Markimer = function () {};

Markimer.prototype.setTimeToLive = function (bookmark) {};

Markimer.prototype.setTimeToTrigger = function (bookmark, time) {};

Markimer.prototype.fetch_bookmarks = function () {

  var bookmarkIds = new Array();
  var FAVICON_PREFIX = "chrome://favicon/";

  var fetchBookmarks = function (parentNode) {
    parentNode.forEach(function(bookmark) {
      if (!(bookmark.title === undefined || bookmark.title === null)) {
        if (bookmark.url) {
          bookmarkIds.push(bookmark.title);

          // DOM elements that'll make up the select items
          var listItem = document.createElement("option");
          var listItemIcon = document.createElement("img");
          var listItemAnchor = document.createElement("a");

          // Set up the anchor element
          listItemAnchor.setAttribute("href", bookmark.url);
          listItemAnchor.innerHTML += bookmark.title;

          // Set up the icon element
          listItemIcon.setAttribute("src", FAVICON_PREFIX + bookmark.url);

          // Add the select item's components
          listItem.appendChild(listItemIcon);
          listItem.appendChild(listItemAnchor);

          document.getElementById("bookmarks").appendChild(listItem);
        }
      }
      if (bookmark.children) {
        fetchBookmarks(bookmark.children);
      }
    });
  }

  chrome.bookmarks.getTree(function(rootNode) {
    fetchBookmarks(rootNode);
    //console.log(JSON.stringify(bookmarkIds));
  });

};

Markimer.prototype.populateBookmarksList = function () {
  document.createElement("elem");
}

document.addEventListener('DOMContentLoaded', function() {
  var markimer = new Markimer();
  markimer.fetch_bookmarks();
});

chrome.runtime.onInstalled.addListener(function() {
  console.log("Extension Installed!");
});

chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
  console.log("bookmark added .. " + bookmark.title);
});

chrome.bookmarks.onRemoved.addListener(function(id, removeInfo) {
  console.log("bookmark removed .. " + id);
});

chrome.bookmarks.onChanged.addListener(function(id, changeInfo) {
  console.log("bookmark changed .. " + id);
});