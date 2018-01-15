(function(){
    var common =  require('../../common/js/common.js');
    var ios = require('../../common/js/ios.js');
    var android = require('../../common/js/android.js');
    module.exports = {
        device:function(){
            if(common.device.ios){
                return ios;
            }
            if(common.device.android){
               return android;
            }
        }
    }
})();