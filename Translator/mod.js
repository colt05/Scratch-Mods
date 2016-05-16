(function(ext) {
  alert("Powered by Yandex.Translate");
  var apikey = "trnsl.1.1.20160516T193740Z.6a606b137bf1783a.2bbc8b02f47cf36b6f38b4ef451390c118a8eee5";
  function asyncgetcallback(url, reponame, returnAll, callback) {
    if (reponame === undefined) {
      reponame = "default";
    }
    var response = "0";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4) {
        response = xmlHttp.responseText;
        //do not catch error, error handling would not be good
        if (returnAll == false || returnAll === undefined) {
          callback(response);
        } else {
          callback([response, xmlHttp.status]);
        }
      }
    }
    xmlHttp.send(null);
  }

  function translate(text, target, callback) {
    try {
      var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=".concat(apikey).concat("&text=").concat(text).concat("&lang=").concat(target);
      asyncgetcallback(url, "Scratch-Mods", false, function(response) {
        var responseparsed = JSON.parse(response);
        callback(responseparsed.text[0]);
      });
    } catch (err) {
      return false;
    }
  }
  // thanks https://github.com/LLK/scratchx/wiki#writing-extensions-for-scratchx
  // also thanks http://stackoverflow.com/a/26272470/3583166
  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {};

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
    return {
      status: 2,
      msg: 'Ready'
    };
  };

  ext.translateBlock = function(text, language, callback) {
    // Yandex!
    translate(text, language, function(resultt) {
      callback(resultt);
    });
  };
  ext.setApiKey = function(keyToSet) {
    apikey = keyToSet;
  }
  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      ['R', 'Translate %s to %s', 'translateBlock', 'Hi!', 'Japanese'],
      [' ', 'Set API key to %s', 'setApiKey', '...']
    ]
  };

  // Register the extension
  ScratchExtensions.register('Translator', descriptor, ext);
  console.log("Registered Translator :)");
})({});
