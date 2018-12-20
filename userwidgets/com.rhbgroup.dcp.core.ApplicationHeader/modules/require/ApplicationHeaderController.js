define(function() {

	const SKINS = {
		SKIN_TITLE_LIGHT : 'sknLblHeaderTitleWhite',
		SKIN_SUBTITLE_LIGHT : 'sknLblHeaderSubtitleWhite',
		SKIN_SECONDARY_LIGHT : 'sknLblHeaderSecondaryWhite',
		SKIN_TITLE_DARK : 'sknLblBold16spTitleGrey',
		SKIN_SUBTITLE_DARK : 'sknLblReg12spTitleGrey',
		SKIN_SECONDARY_DARK : 'sknLblReg8spTitleGrey',
		SKIN_DEFAULT : 'slFbox'
	};

	const ALLOWABLE_KEYS = ['bgSkin', 'titleIcon', 'titleText', 'subtitleText', 'leftIcon', 'leftSubtitle', 'leftCallback', 'rightPrimaryIcon', 'rightSecondaryIcon', 'rightSubtitle', 'rightPrimaryCallback', 'rightSecondaryCallback'];
	const ALLOWABLE_SECONDARY_KEYS = ['icon', 'icon2', 'title', 'subtitle', 'callback', 'callback2'];

	return {
		
		constructor: function(baseConfig, layoutConfig, pspConfig) {},

		initGettersSetters: function() {
			defineSetter(this, 'theme', function(theme) {
				this._theme = theme;
				this._toggleTheme(theme);
			});
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
			defineSetter(this, 'iconSet', function(type) {
				this._doubleIconSet = (type === 'double');
				this._toggleRightIconSet(type);
			});
			defineSetter(this, 'titleType', function(type) {
				this._titleType = type;
				this._toggleTitleType();
			});
			defineSetter(this, 'sourceLeft', function(imageString) {
				if (this._enableLeft){
					this._updateHeaderAsHashMap({'leftIcon': imageString});
                }
			});
			defineSetter(this, 'titleIcon', function(imageString) {
				if(this._titleType === 'image'){
					this._updateHeaderAsHashMap({'titleIcon': imageString});
				}
			});
			defineSetter(this, 'sourcePrimaryRight', function(imageString) {
				if (this._enableRight){
					this._updateHeaderAsHashMap({'rightPrimaryIcon': imageString});
				}
			});
			defineSetter(this, 'sourceSecondaryRight', function(imageString) {
				if (this._enableRight && this._doubleIconSet){
					this._updateHeaderAsHashMap({'rightSecondaryIcon': imageString});
                }
			});
		},

		//	Exposed component controllers

		//	Initialize header configuration
		/*	[Dev notes]
			Users should pass a hash table object as parameter to initialize the header component but will only allow the following keys and disregard everything else:
				- 'bgSkin', 'titleIcon', 'titleText', 'subtitleText', 'leftIcon', 'leftSubtitle', 'leftCallback', 'rightPrimaryIcon', 'rightSecondaryIcon', 
				  'rightSubtitle', 'rightPrimaryCallback', 'rightSecondaryCallback', 'leftConfig', 'centerConfig', 'rightConfig' 

            titleIcon takes priority over titleText so if both are defined, will only use titleIcon to configure center section of header

			leftConfig, centerConfig and righConfig in turn allows a secondary hash table object with the following keys: 
				- 'icon', 'icon2', 'title', 'subtitle', 'callback', 'callback2'
			
			If leftConfig, centerConfig or rightConfig have been used in combination with their individual keys, then these 3 keys WILL OVERWRITE the individual keys that have been set e.g.
				initializeHeader({centerConfig:{icon: 'myIcon.png'}, titleIcon: 'myOtherIcon.png'}) results in the header center icon being set as 'myIcon.png'

			If used correctly, one can already define the user interface based on the component properties. And following the 'no Visualizer action mapping rule,' 
			the only remaining action needed is to map the events on the right and left icons, as required, by passing the following parameter:
                parameter = {
					leftCallback: [yourDefinedMethod],
					rightPrimaryCallback: [yourDefinedMethod],
					rightSecondaryCallback: [yourDefinedMethod]
				}
		*/
		initializeHeader: function(arg){

			if(arg instanceof Object)
				this._updateHeaderAsHashMap(arg);
			else
				alert("Header expects a configuration map with keys");
		},

		//	Private component controllers
		_updateBGSkin: function(arg){
			this.view.flxBG.skin = (utils.isValidObject(arg)) ? arg : SKINS.SKIN_DEFAULT;
		},

		_updateHeaderAsHashMap: function (arg){
			let key, innerKey;
			let titleIsAlreadyAnImage = false;

			if('leftConfig' in arg){
				for (key in arg.leftConfig){
					if(ALLOWABLE_SECONDARY_KEYS.indexOf(key) > -1){
						switch(key){
							case 'icon' : 
								arg.leftIcon = arg.leftConfig.icon;
								break;
							case 'subtitle' : 
								arg.leftSubtitle = arg.leftConfig.subtitle;
								break;
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
							case 'icon' : 
								arg.rightPrimaryIcon = arg.rightConfig.icon;
								break;
							case 'icon2' : 
								arg.rightSecondaryIcon = arg.rightConfig.icon2;
								break;
							case 'subtitle' : 
								arg.rightSubtitle = arg.rightConfig.subtitle;
								break;
							case 'callback' : 
								arg.rightPrimaryCallback = arg.rightConfig.callback;
								break;
							case 'callback2' : 
								arg.rightSecondaryCallback = arg.rightConfig.callback2;
								break;
						}
                    }else{
						kony.print('Key used inside object [rightConfig] is not defined in list of allowable keys: '+key);
						alert('Key used inside object [rightConfig] is not defined in list of allowable keys: '+key);
					}
				}
				delete arg.rightConfig;
			}
          
			if('centerConfig' in arg){
				for (key in arg.centerConfig){
					if(ALLOWABLE_SECONDARY_KEYS.indexOf(key) > -1){
						switch(key){
							case 'icon' : 
								arg.titleIcon = arg.centerConfig.icon;
								break;
							case 'title' :
								arg.titleText = arg.centerConfig.title;
								break;
							case 'subtitle' : 
								arg.subtitleText = arg.centerConfig.subtitle;
								break;
						}
                    }else{
						kony.print('Key used inside object [centerConfig] is not defined in list of allowable keys: '+key);
						alert('Key used inside object [centerConfig] is not defined in list of allowable keys: '+key);
					}
				}
				delete arg.centerConfig;
			}
			
			//	Need to put this out of object loop to make sure proper theme is set first before evaluating everything else.
			if('theme' in arg){
				if(arg.theme === 'light' || arg.theme === 'dark'){
					this._theme = arg.theme;
					this._toggleTheme(arg.theme);
				} else {
					kony.print('Only \'light\' or \'dark\' are accepted as values for key \'theme\'. Please update your code.');
					alert('Only \'light\' or \'dark\' are accepted as values for key \'theme\'. Please update your code.');
				}
				delete arg.theme;
			}

			for(key in arg){

				if(ALLOWABLE_KEYS.indexOf(key) > -1){
					let executeMe = {
						'bgSkin': ()=>{
							this._updateBGSkin(arg[key]);
						},
						'titleIcon': ()=>{
							titleIsAlreadyAnImage = true;

							this.view.imgCenterIcon.setVisibility(utils.isValidObject(arg[key]));
							this.view.imgCenterIcon.src = (utils.isValidObject(arg[key])) ? `hdr_${(arg[key].split(' ').join('_')).toLowerCase()}.png` : arg[key];
						},
						'titleText': ()=>{
							this.view.lblCenterTitle.setVisibility(!titleIsAlreadyAnImage);

							if(!titleIsAlreadyAnImage)
								this.view.lblCenterTitle.text =  arg[key];
						},
						'subtitleText': ()=>{
							this.view.lblCenterSecondary.setVisibility(!titleIsAlreadyAnImage);

							if(!titleIsAlreadyAnImage)
								this.view.lblCenterSecondary.text =  arg[key];
						},
						'leftIcon': ()=>{
							this.view.imgLeftIcon.setVisibility(utils.isValidObject(arg[key]));
							this.view.imgLeftIcon.src = (utils.isValidObject(arg[key])) ? `hdr_${(arg[key].split(' ').join('_')).toLowerCase()}_${((this._theme).charAt(0)).toLowerCase()}.png` : '';
						},
						'leftSubtitle': ()=>{
							this.view.lblLeftSecondary.text = arg[key];
						},
						'leftCallback': ()=>{
							this.view.imgLeftIcon.onTouchEnd = utils.handleEventInvocation(arg[key]);
						},
						'rightPrimaryIcon': ()=>{
							this.view.imgRightIcon.setVisibility(utils.isValidObject(arg[key]));
							this.view.imgRightIcon.src = (utils.isValidObject(arg[key])) ? `hdr_${(arg[key].split(' ').join('_')).toLowerCase()}_${((this._theme).charAt(0)).toLowerCase()}.png` : '';
						}, 
						'rightSecondaryIcon': ()=>{
                          if (utils.isValidObject(arg[key])) {
                            this.view.lblCenterTitle.width = '50%';
                            this.view.lblCenterSecondary.width = '50%';
                          }
							this.view.imgRightIcon2.setVisibility(utils.isValidObject(arg[key]));
							this.view.imgRightIcon2.src = (utils.isValidObject(arg[key])) ? `hdr_${(arg[key].split(' ').join('_')).toLowerCase()}_${((this._theme).charAt(0)).toLowerCase()}.png` : '';
						},
						'rightSubtitle': ()=>{
							this.view.lblRightSecondary.text = arg[key];
						},
						'rightPrimaryCallback': ()=>{
							this.view.imgRightIcon.onTouchEnd = utils.handleEventInvocation(arg[key]);
						},
						'rightSecondaryCallback': ()=>{
							this.view.imgRightIcon2.onTouchEnd = utils.handleEventInvocation(arg[key]);
						}
					}[key]();
				}else{
					kony.print('Key used is not defined in list of allowable keys: '+key);
					alert('Key used is not defined in list of allowable keys: '+key);
				}
			}
		},

		_toggleSection: function (section, flag){

			this.view[`img${section}Icon`].setVisibility(flag);
			this.view[`lbl${section}Secondary`].setVisibility(flag);

			if (this.view[`img${section}Icon2`]) {
				this.view[`img${section}Icon2`].setVisibility(flag);
				if (!flag)
					this.view[`img${section}Icon2`].src = '';
			}
          
			if (this.view[`lbl${section}Title`]) {
				this.view[`lbl${section}Title`].setVisibility(flag);
				if (!flag)
					this.view[`lbl${section}Title`].text = '';
			}
        },

		_toggleTheme: function (theme){
			this.view.lblLeftSecondary.skin = SKINS[`SKIN_SECONDARY_${theme.toUpperCase()}`];
			this.view.lblRightSecondary.skin = SKINS[`SKIN_SECONDARY_${theme.toUpperCase()}`];
			this.view.lblCenterTitle.skin = SKINS[`SKIN_TITLE_${theme.toUpperCase()}`];
			this.view.lblCenterSecondary.skin = SKINS[`SKIN_SUBTITLE_${theme.toUpperCase()}`];

		},

		_toggleRightIconSet: function(type){
			if (this._enableRight)
				this.view.imgRightIcon2.setVisibility((type === 'double'));
		},

		_toggleTitleType: function(){
			if (this._enableCenter) {
				this.view.lblCenterTitle.setVisibility(this._titleType === 'text');
				this.view.lblCenterSecondary.setVisibility(this._titleType === 'text');
				this.view.imgCenterIcon.setVisibility(this._titleType === 'image');
			} else {
				this.view.lblCenterTitle.setVisibility(false);
				this.view.lblCenterSecondary.setVisibility(false);
				this.view.imgCenterIcon.setVisibility(false);
			}
		}
	};
});