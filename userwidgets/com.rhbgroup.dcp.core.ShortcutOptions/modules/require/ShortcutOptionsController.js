define(function() {

  //hard code the positions of the options button
  let optionPosition = [
    ['50%'],
    ['33.33%', '66.67%'],
    ['21.2%', '50%', '78.7%'],
    ['8.5%', '36.1%', '63.9%', '91.5%']
  ];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    generateShortcuts: function(list){
      this.clearShortcuts();
      let totalCount = list.length;
      let position = optionPosition[totalCount - 1];

      let shortcut = {};
      let shortcutId;

      for(let [i, button] of list.entries()){
        try {
          shortcutId = `shortcutOption${button.id}`;
          shortcut = new com.rhbgroup.dcp.core.ShortcutButton({
            "id": shortcutId,
            "centerX": position[i],
            "top": "0dp",
//             "height": "80dp",
//             "width": "60dp"
          }, {}, {});

          shortcut.text = button.description;
          shortcut.txtWidth = button.textWidth; // To cater for longer text length (eg. frmCreditCardDetails when all option buttons are implemented)
          shortcut.src = button.image;
          shortcut.sknFlxOuter = button.sknFlxOuter ? button.sknFlxOuter : 'sknFlxRoundedBtn';
          shortcut.setShadow();
          shortcut.showImage = true;
          
          let isActive = true;
          if (Object.keys(button).indexOf('isActive') !== -1) {
            shortcut.isActive = button.isActive;
            isActive = button.isActive;
          }
          shortcut.onClick = (button.callback && isActive) ? button.callback : () => {}; // if callback not defined and button is not active, set to empty function

          this.view.flxOptionsArea.add(shortcut);
        } catch(err) {
          kony.print(`DEBUG >> Exception generating ShortcutButton: ${err}`);
        }

      }
    },
    
    clearShortcuts: function() {
      if (this.view.flxOptionsArea.widgets().length > 0) {
        this.view.flxOptionsArea.removeAll();
      }
    },

  };
});