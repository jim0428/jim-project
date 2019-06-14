var TagsInput = function(element) { 
  var self = this;
  var initChar = "\u200B";
  var initCharPattern = new RegExp(initChar, 'g');
  
  var insert = function(element) {
     if(self.textNode) self.element.insertBefore(element, self.textNode);
     else self.element.appendChild(element);
  };
  
  var updateCursor = function() {
    self.cursor = self.blank;
  };
  
  var keydown = function(event) {
    if(event.keyCode == 188) {
      event.preventDefault();
      setTimeout(function() {
        var text = self.text;
        if(text) {
          self.text = initChar;
          self.add(text);
        }
      }, 1);
    }
    else if(event.keyCode == 8) {
      if(self.text.replace(initCharPattern, '') == '') {
        self.text = initChar+initChar;
        if(self.selected) {
          self.element.removeChild(self.selected);
        }
        else {
          var tags = self.tags;
          var keys = Object.keys(tags)
          if(keys.length > 0) {
            var tag = tags[keys[keys.length-1]];
            tag.setAttribute('data-selected', '');
          }
        }
      }
    }
    
    if(event.keyCode !== 8) {
      if(self.selected) self.selected.removeAttribute('data-selected');
    }
    setTimeout(function() {
      updateCursor();
    }, 1);
  };
  
  var focus = function() {
    updateCursor();
  };
  
  Object.defineProperties(this, {
    element: {
      get: function() {
        return element;
      },
      set: function(v) {
        if(typeof v == 'string') v = document.querySelector(v);
        element = v instanceof Node ? v : document.createElement('div');
        if(!element.className.match(/\btags-input\b/)) element.className += ' tags-input';
        if(element.getAttribute('contenteditable') != 'true') element.setAttribute('contenteditable', 'true');
        
        element.removeEventListener('keydown', keydown);
        element.addEventListener('keydown', keydown);
        
        element.removeEventListener('focus', focus);
        element.addEventListener('focus', focus);
        this.text = initChar;
      }
    },
    tags: {
      get: function() {
        var element;
        var elements = this.element.querySelectorAll('span');
        var tags = {};
        for(var i = 0; i < elements.length; i++) {
          element = elements[i]
          tags[element.innerText] = element;
        }
        
        return tags;
      }
    },
    lastChild: {
      get: function() {
        return this.element.lastChild;
      }
    },
    textNode: {
      get: function() {
        return this.element.lastChild instanceof Text ? this.element.lastChild : null;
      }
    },
    text: {
      get: function() {
        return this.textNode ? this.textNode.data : null;
      },
      set: function(v) {
        if(!this.textNode) this.element.appendChild(document.createTextNode(','));
        this.textNode.data = v;
      },
    },
    cursor: {
      get: function() {
        return this.element.getAttribute('data-cursor') !== null;
      },
      set: function(v) {
        if(v) this.element.setAttribute('data-cursor', '');
        else this.element.removeAttribute('data-cursor');
      }
    },
    focused: {
      get: function() {
        return document.activeElement == this.element;
      }
    },
    blank: {
      get: function() {
        return this.text.replace(initCharPattern, '') == '';
      }
    },
    selected: {
      get: function() {
        return this.element.querySelector('span[data-selected]');
      }
    }
  });
  
  this.add = function(tag) {
    tag = tag.replace(initCharPattern, '');
    tag = tag.replace(/^\s+/, '').replace(/\s+$/, '');
    tag = tag[0].toUpperCase()+tag.toLowerCase().slice(1);
    if(tag != '' && this.tags[tag] === undefined) {
      var element = document.createElement('span');
      element.appendChild(document.createTextNode(tag));
      element.setAttribute('contenteditable', 'false');
      
      insert(element);
    }
  };
  
  this.remove = function(tag) {
     var element = this.tags[tag];
     if(element) this.element.removeChild(element);
  };
  
  this.element = element;
};

var input = new TagsInput('.tags-input');