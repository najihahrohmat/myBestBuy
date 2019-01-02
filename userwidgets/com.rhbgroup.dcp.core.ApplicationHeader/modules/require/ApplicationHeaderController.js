define(function() {

  const ALLOWABLE_KEYS = ['leftIcon', 'leftCallback', 'rightIcon', 'rightCallback'];
  const ALLOWABLE_SECONDARY_KEYS = ['icon', 'icon2', 'title', 'subtitle', 'callback', 'callback2'];

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {},

    initGettersSetters: function() {
      defineSetter(this, 'enableRight', function(flag) {
        this._enableRight = flag;
        this._toggleSection('Right', flag);
      });
      defineSetter(this, 'enableLeft', function(flag) {
        this._enableLeft = flag;
        this._toggleSection('Left', flag);
      });
      defineSetter(this, 'enableCenter', function(flag) {
        this._enableCenter = (flag);
        this._toggleSection('Center', flag);
      });
    },

    initializeHeader: function(arg){

      if(arg instanceof Object)
        this._updateHeaderAsHashMap(arg);
      else
        alert("Header expects a configuration map with keys");
    },

    _updateHeaderAsHashMap: function (arg){
      let key, innerKey;
      let titleIsAlreadyAnImage = false;

      if('leftConfig' in arg){
        for (key in arg.leftConfig){
          if(ALLOWABLE_SECONDARY_KEYS.indexOf(key) > -1){
            switch(key){
              case 'callback' : 
                arg.leftCallback = arg.leftConfig.callback;
                break;
            }
          }else{
            kony.print('Key used inside object [leftConfig] is not defined in list of allowable keys: '+key);
            alert('Key used inside object [leftConfig] is not defined in list of allowable keys: '+key);
          }
        }
        delete arg.leftConfig;
      }

      if('rightConfig' in arg){
        for (key in arg.rightConfig){
          if(ALLOWABLE_SECONDARY_KEYS.indexOf(key) > -1){
            switch(key){
              case 'callback' : 
                arg.rightCallback = arg.rightConfig.callback;
                break;
            }
          }else{
            kony.print('Key used inside object [rightConfig] is not defined in list of allowable keys: '+key);
            alert('Key used inside object [rightConfig] is not defined in list of allowable keys: '+key);
          }
        }
        delete arg.rightConfig;
      }
      
      for(key in arg){

        if(ALLOWABLE_KEYS.indexOf(key) > -1){
          let executeMe = {
            'titleIcon': ()=>{
              this.view.imgCenterIcon.setVisibility(true);
            },
            'leftIcon': ()=>{
              this.view.imgLeftIcon.setVisibility(true);
            },
            'leftCallback': ()=>{
              this.view.imgLeftIcon.onTouchEnd = utils.handleEventInvocation(arg[key]);
            },
            'rightIcon': ()=>{
              this.view.imgRightIcon.setVisibility(true);
            }, 
            'rightCallback': ()=>{
              this.view.imgRightIcon.onTouchEnd = utils.handleEventInvocation(arg[key]);
            },
          }[key]();
        }else{
          kony.print('Key used is not defined in list of allowable keys: '+key);
          alert('Key used is not defined in list of allowable keys: '+key);
        }
      }
    },

    _toggleSection: function (section, flag){
      this.view[`img${section}Icon`].setVisibility(flag);
    },
  };
});