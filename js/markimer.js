var markimer = angular.module('markimer', []);

markimer.controller('MainController', function ($scope) {

  $scope.bookmarks = [];

  $scope.setTimeToLive = function (bookmark) {};

  $scope.setTimeToTrigger = function (bookmark, time) {};

  $scope.getTree = function () {
    chrome.bookmarks.getTree(function(rootNode) {
      $scope.fetchBookmarks(rootNode);
    });
  };

  $scope.fetchBookmarks = function (parentNode) {
    var FAVICON_PREFIX = 'chrome://favicon/';

    parentNode.forEach(function(bookmark) {
      if (!(bookmark.title === undefined || bookmark.title === null)) {
        if (bookmark.url) {
          $scope.bookmarks.push(bookmark.title);
        }
      }
      if (bookmark.children) {
        $scope.fetchBookmarks(bookmark.children);
      }
    });
  };

  $scope.configuration = { expiryDate: '',
                          expiryTime: '',
                          triggerDate: '',
                          triggerTime: ''
                        };

  $scope.submit = function () {
    console.log("Submitted!");
  };

});

chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension Installed!');
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