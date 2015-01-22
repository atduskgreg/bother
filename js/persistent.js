// persistent.js
// Utility code for working with localStorage

function _allLocalStorageKeys() {
  var found = [];
  var kIdx = 0;
  var kName = null;

  do {
    kName = localStorage.key(kIdx);
    if (kName) {
      found.push(kName);
    }
    kIdx++;
  } while(kName);

  return found;
}

// This constructor builds an object which gives simple access to a namespaced
// subset of localStorage. It expects underscore.js to be loaded before it.

function PersistentMap(prefix) {
  this._prefix = prefix;

  this.rawKeys = function() {
    return _.filter(_allLocalStorageKeys(), function(k) {
      return k.startsWith(prefix);
    });
  }

  this.get = function(key) {
    return localStorage.getItem(prefix + key);
  }

  this.hasKey = function(key) {
    return !!(_.find(this.keys(), function (k) {
      return k === key
    }));
  }

  this.set = function(key, val) {
    return localStorage.setItem(prefix + key, val);
  }

  this.del = function(key) {
    localStorage.removeItem(prefix + key);
  }

  this.keys = function() {
    return _.map(this.rawKeys(), function(s) {
      return s.substring(prefix.length);
    });
  }

  this.reallyClearIMeanIt = function() {
    _.each(this.rawKeys(), function(k) {
      localStorage.removeItem(k)
    });
  }
}

