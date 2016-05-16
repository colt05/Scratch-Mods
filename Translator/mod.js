(function(ext) {
  function asyncgetcallback(url, reponame, returnAll, callback) {
  if (reponame === undefined) {
    reponame = "default";
  }
  var response = "0";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, true );
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
  xmlHttp.send( null );
  }
  function translate(text, target, callback) {
  var apikey = "trnsl.1.1.20160325T002502Z.51d6cbf6baba0fb2.0e88540fb49b9ea16737bc4619ee2c516c2ee2f4";
  try{
  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=".concat(apikey).concat("&text=").concat(text).concat("&lang=").concat(target);
  asyncgetcallback(url, "Scratch-Mods", false, function(response) {
  var responseparsed = JSON.parse(response);
  callback(responseparsed.text[0]);
  });
  } catch(err) {
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
        return {status: 2, msg: 'Ready'};
    };

    ext.get_temp = function(text, language, callback) {
        // Yandex!
              translate(text, language, function(resultt) {
               callback(resultt);
              });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Translate %s to %s', 'get_temp', 'Hi!', 'Japanese'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Translator', descriptor, ext);
    console.log("Registered Translator :)");
})({});
