(function(ext) {
  ext.getUserId = function() {
   return Scratch.LoggedInUser.attributes.id;
  };
  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      ['r', 'User ID', 'getUserId']
    ]
  };
  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {
  console.log("Unloaded UserStuff :(");
  };

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
    return {
      status: 2,
      msg: 'Ready'
    };
  };
  // Register the extension
  ScratchExtensions.register('UserStuff', descriptor, ext);
  console.log("Registered UserStuff :)");
})({});
