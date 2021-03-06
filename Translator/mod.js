(function(ext) {
  alert("Powered by Yandex.Translate");
  var apikey = "";
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
  asyncgetcallback("https://raw.githubusercontent.com/colt05/Scratch-Mods/gh-pages/Translator/apikey.txt", "Scratch-Mods", false, function(response) {
    apikey = response;
  });
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
  function translateGoogle(text, target, callback) {
      try {
       var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + target + "&dt=t&q=" + encodeURI(text);
       console.log(url);
       asyncgetcallback(url, "Scratch-Mods", false, function(response) {
        var responseparsed = JSON.parse(response);
        callback(responseparsed.text[0][0][0]);
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
  ext.translateBlockGoogle = function(text, language, callback) {
    // Google!
    translateGoogle(text, language, function(resultt) {
      callback(resultt);
    });
  };
  ext.setApiKey = function(keyToSet) {
    apikey = keyToSet;
  }
  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      ['R', 'Translate %s to %s (Powered by Yandex.Translate)', 'translateBlock', 'Hi!', 'Japanese'],
      //['R', 'Translate %s to %s (Google Translate)', 'translateBlockGoogle', 'Hi!', 'Japanese'],
      [' ', 'Set Yandex.Translate API key to %s', 'setApiKey', '...']
    ]
  };

  // Register the extension
  ScratchExtensions.register('Translator', descriptor, ext);
  console.log("Registered Translator :)");
})({});
