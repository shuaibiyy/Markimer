var markimer = angular.module('markimer', []);

markimer.controller('MainController', function ($scope, $timeout) {

  $scope.bookmarks = [];

  $scope.configuration = {
    expiryDate: '',
    expiryTime: '',
    triggerDate: '',
    triggerTime: ''
  };

  $timeout(function() {
    $scope.getTree();
  });

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
          $scope.bookmarks.push(bookmark);
          console.log(bookmark.title);
        }
      }
      if (bookmark.children) {
        $scope.fetchBookmarks(bookmark.children);
      }
    });
  };

  $scope.submit = function () {
    console.log("Submitted!");

    if ($scope.selectedBookmarks) {
      for (var i = 0; i < $scope.selectedBookmarks.length; i++) {
        chrome.bookmarks.update($scope.selectedBookmarks[i].id, {title: "NYPL"}, function(){
          console.log("Awesome! Woot! Woot!");
        });
      }
    }
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