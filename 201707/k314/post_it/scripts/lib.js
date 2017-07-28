/**
 * @fileOverview OULib file
 * <br/> <br/>
 * <b>History</b><br/> <br/>
 * <br/>
 * 1.0.0 - initial version
 *    
 * <b>Usage</b><br/>
 * Include the script file into your main HTML file, then access any of the
 * public vars or methods useing OULib.
 * 
 * @file libs.js
 * @author <a href="mailto:tegai.lansdell@open.ac.uk">Tegai Lansdell</a>
 * @version 1.0.0 
 * 
 *
 */

/**
     * OULibs
     * 
     * @class Represents  OULibs
     * @name OULibs
     * 
     */
var OULibs = (function (){

/**
 * Defines the event listener functionaly, some key defines and other
 *  checks like browser verisons
 * 
 * @constructor 
 * @param args set up any defualts
 * @returns {libs}
 * @memberof OULibs#
 */
 var libs = function (args){
    
       this.KEY_ENTER       = 13;
	   this.KEY_BACKSPACE   = 8;
	   this.KEY_DELETE      = 46;
       this.KEY_SPACE       = 32;
       this.KEY_UP_ARROW    = 38;
       this.KEY_DOWN_ARROW  = 40;
       this.KEY_LEFT_ARROW  = 37;
       this.KEY_RIGHT_ARROW = 39;
       this.KEY_CTRL        = 64;
       this.KEY_PLUS        = 107;
       this.KEY_MINUS       = 109;
       this.KEY_EQUALS      = 187;
       this.KEY_DASH        = 189;
       this.KEY_TAB         = 9;
               
       this.debugOn = args.debugOn; 
       this.isMobileDevice = false;
       this.html5Video  = false;
       this.imageCount  = 0;   
       this.loaderLeftPosition = 0;
       this.isChrome    = navigator.userAgent.indexOf('Chrome')  > -1;
       this.isExplorer  = navigator.userAgent.indexOf('MSIE')    > -1;
       this.isIE8       = navigator.userAgent.indexOf('MSIE 8')  > -1 || navigator.userAgent.indexOf('MSIE 7')  > -1;
       this.isFirefox   = navigator.userAgent.indexOf('Firefox') > -1;
       this.isSafari    = navigator.userAgent.indexOf("Safari")  > -1;
       this.isOpera     = navigator.userAgent.indexOf("Presto")  > -1;
       this.previousValue;
             
       if ( ! window.console ) console = { log: function(){} };
      
       if (typeof args.debugOn !== "undefined"){ this.debugOn = args.debugOn;}
       if ((this.isChrome)&&(this.isSafari)) {this.isSafari=false;}
      
      
       if ((/iphone|ipod|ipad|android|iemobile|blackberry|fennec|opera mini/i).test
              (navigator.userAgent.toLowerCase())){this.isMobileDevice=true;}
       
       if (!!document.createElement('video').play){
           if (!!document.createElement('video').canPlayType( 'video/mp4' )){
                this.html5Video = true;}
       }
       
       this.actvityId   = VLE.get_param("activity_id") || VLE.get_param("_a");
       this.documentId  = VLE.get_param("document_id") || VLE.get_param("_i");
       this.courseId    = VLE.get_param("course_id")   || VLE.get_param("_c");
       
       
              
       this.utils = { // Methods and variables that are conditional on platform
          addEvent: null,
          removeEvent: null
       };
       
       if ( ! window.console ){ console = { log: function(){} };}
    
        if (typeof window.addEventListener === 'function') {
           this.utils.addEvent = function (elem, type, func) {
                elem.addEventListener(type, func, false);
       };
           this.utils.removeEvent = function (elem, type, func) {
            elem.removeEventListener(type, func, false);
       };
      } else if (typeof document.attachEvent === 'function') {
           this.utils.addEvent = function (elem, type, func) {
            elem.attachEvent('on' + type, func);
       };
           this.utils.removeEvent = function (elem, type, func) {
            elem.detachEvent('on' + type, func);
       };   
      } else {
            this.utils.addEvent = function (elem, type, func) {
                elem['on' + type] = func;                  
            };
      }
      
      
 };

/**
 * Check to see if the current key press match the supplied ascii character
 * @param {string} chr
 * @param {integer} keyCode
 * @returns {Boolean}
 * @memberof OULibs#
 */
 libs.prototype.isKeyCode = function(chr, keyCode){
     
     var asciiCode = chr.charCodeAt(0),
         bResult = false;

     this.trace("asciiCode:"+asciiCode+" keyCode:"+keyCode);
     if (keyCode>=48 && keyCode<=57){
        if (asciiCode === keyCode)
         {bResult = true;}
     }else if (keyCode>=65 && keyCode<=90){
        if (asciiCode === (keyCode+32))
         {bResult = true;}
     }
     
     
     return bResult;
 };

/**
 * Debug function to the console if turned on. Debug is off by defualt but can 
 * be manually turned on by setting OULib.debugOn = true
 * @param {string} str
 * @memberof OULibs#
 */
 libs.prototype.trace = function(str){
    if (this.debugOn===true){
        try{
            console.log("OUlib trace: "+str);
        }catch(e){
            console.log("OUlib trace: Error in expression: " + e);
        }
    }
 };
 
 /**
  * method which creates a way of loading and displaying an MPEG 4 video. If the browser
  * implements the HTML5 video tag then this will be used. Otherwise a flash
  * swf player will need to be specified in the parameters.<br/>
  * List of values within the args object
  * <ul>
  * <li> <b>videoId</b> - id of the video that will be created</li>
  * <li> <b>divId</b> - the id of the div where the video will be placed</li>
  * <li> <b>videoSrc</b> - path to the mp4 file</li>
  * <li> <b>posterSrc</b> - image to be displayed before playing commences</li>
  * <li> <b>width</b> - video width</li>
  * <li> <b>height</b> - video height</li>
  * <li> <b>controls</b> - set to true to display controls</li>
  * <li> <b>swfPlayer</b> - path to the swf player if needed to support non HTML5 browsers</li>
  * <li> <b>loadCbf</b> - callback that is called when the video has loaded</li>
  * <li> <b>endedCbf</b> - callback that is called when the video has finshed playing</li>
  * </ul>
  * 
  * @param {object} args
  * @memberof OULibs#
  */
 libs.prototype.loadVideo = function(args){
      var htmlString = "",
          posterSrc = "",
          controls = "",
          captions = "",
          type='type="application/x-shockwave-flash"',
          htmlArr;
  //Over ride the functionality for this case
      if (this.isMobileDevice){
         this.html5Video = true;    
      }else{
         this.html5Video = false;
      }
      
      if (typeof args.posterSrc !== "undefined"){
          if (this.html5Video === true){
            posterSrc = 'poster="'+args.posterSrc+'"';
          }else{
            posterSrc = 'poster='+args.posterSrc+'&amp;';  
          }
      }
      
      if (typeof args.controls !== "undefined"){
          if (args.controls === true && this.html5Video === false){
              controls = 'controls=true&amp;';
          }else{
              controls = 'controls="controls"';
          }
      }
      if (typeof args.captions !== "undefined"){
          if (this.html5Video === false){
              captions = 'captions='+args.captions+'&amp;';
          }else{
              //captions = '<track src="'+args.captions+'" kind="subtitle" srclang="en" label="English" />';
          }
      }
      
      if (this.html5Video === true){
          //HTML5 Video
          htmlString  = '<br/><video id="'+args.videoId+'" '+controls+' '+posterSrc+' width="'+args.width+'" height="'+args.height+'">';
          htmlString += '<source src="'+args.videoSrc+'" type="video/mp4" />';
          htmlString += captions;
          htmlString += '</video>';
          
          document.getElementById(args.divId).innerHTML = htmlString;
          
          this.utils.addEvent(document.getElementById(args.videoId),"canplay",args.loadCbf);
          this.utils.addEvent(document.getElementById(args.videoId),"ended",args.endedCbf);
          this.trace("Is the video loading?");
        
          if (this.isMobileDevice === true){
              args.loadCbf();
          }
      }
      else{
        if (this.isIE8){
            type='classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
        }
        //VLE media player
        htmlArr = [
			'<br/><object '+type+' id="'+args.videoId+'" width="'+args.width+'" height="'+args.height+'" altHTML="The video that should appear here can only be played on a computer that has Adobe Flash Player installed, apologies">',
                        '\t<param name="movie" value="'+args.swfPlayer+'" />',
                        '\t<param name="quality" value="high" />',	
                        '\t<param name="allowscriptaccess" value="sameDomain" />',
			'\t<param name="allowFullScreen" value="true" />',
			'\t<param name="wmode" value="transparent" />',
			'\t<param name="FlashVars" value="file='+args.videoSrc+'&amp;'+'width='+args.width+'&amp;height='+args.height+'&amp;autoplay=true&amp;autostart=true&amp;'+controls+captions+'" />'
		];
        
          htmlString = htmlArr.join('\n')+'\n</object>';

          document.getElementById(args.divId).innerHTML  = htmlString;
        
          args.loadCbf();
      }
   
      if (typeof args.transcriptLinkCbf !== "undefined"){
        //create a link for the transcript file
        document.getElementById("videoTranscript").style.marginRight  = parseInt((args.appWidth-args.width)/2)+"px";
        document.getElementById("videoTranscript").onclick = args.transcriptLinkCbf;
      }
 };
 
 libs.prototype.getKeyCode = function (e){
     var keyCode = -1,
         evt = e ? e:window.event;
    
     if(evt.keyCode) // IE8 and earlier
        { keyCode = evt.keyCode; }
     else if(evt.which) // IE9/Firefox/Chrome/Opera/Safari
        { keyCode = evt.which; }
    
     return keyCode;
 };
 
 /**
  * method which handles dom object is currently actioned and return the correct id.
  * Used to make sure IE plays nicley with the other browsers
  * @param {event} e
  * @returns {id}
  * @memberof OULibs#
  */
 libs.prototype.getTargetId = function (e){
   
     var id = "undefined",
         evt = e ? e:window.event;
     
     if(evt.srcElement) // IE8 
         {id = evt.srcElement.id;}
     else
         {id = evt.target.id;}
         
     return id; 
 };
 
 /**
  * method which handles dom object is currently actioned and return the correct id.
  * Used to make sure IE plays nicley with the other browsers
  * @param {event} e
  * @returns {id}
  * @memberof OULibs#
  */
 libs.prototype.getTarget = function (e){
   
     var target = "undefined",
         evt = e ? e:window.event;
     
     if(evt.srcElement) // IE8 
         {target = evt.srcElement;}
     else
         {target = evt.target;}
         
     return target; 
 };
 
 
 /**
  * method which will scale the activity to the avaliable width and height
  * 
  * List of values within the args object
  * <ul>
  * <li> <b>containerDiv</b> - the div which conatins/wraps around the activity. there must be one div that contains all the HTML for this to work.  </li>
  * <li> <b>originalWidth</b> - the original width of the activity. i.e. it's defualt unscaled width </li>
  * <li> <b>originalHeight</b> - the original height of the activity. i.e. it's defualt unscaled height  </li>
  * </ul>
  * @param {object} args
  * @memberof OULibs#
  */
 libs.prototype.setScale = function(args) {

        var fac = 1, cWidth = 0, cHeight = 0, scaleFactorH, scaleFactorW,
                docMargin = 0, leftPos=0, topPos=0;

        //Get correct dimensions of the srceen
        if (window.innerHeight)
        {
            cWidth = window.innerWidth - docMargin;
            cHeight = window.innerHeight - docMargin;
        } else {
            cHeight = document.documentElement.clientHeight - docMargin;
            cWidth = document.documentElement.clientWidth - docMargin;
        }

        //calculate the height and width scale factors
        scaleFactorH = cHeight / (args.originalHeight);
        scaleFactorW = cWidth / (args.originalWidth);

        //Choose which is the smaller of the two factors
        //this is so that the anima will fit to the screen
        if (scaleFactorH <= scaleFactorW)
        {
            fac = scaleFactorH;
        } else {
            fac = scaleFactorW;
        }

        //get the left and top position so that the anim can be centered
        leftPos = Math.floor(((cWidth - (args.originalWidth * fac)) / fac) / 2);
        topPos = Math.floor(((cHeight - (args.originalHeight * fac)) / fac) / 2);


        //Set the scaling factor based upon browser

        if (this.isFirefox === true) {
            document.getElementById(args.containerDiv).setAttribute('style',
                    '-moz-transform: scale(' + fac + ');-moz-transform-origin: 0 0;');
        }
        else if (this.isSafari === true && this.isMobileDevice === false) {

            document.getElementById(args.containerDiv).setAttribute('style',
                    '-webkit-transform: scale(' + fac + ');');
        } else {
            document.getElementById(args.containerDiv).setAttribute('style',
                    'zoom:' + fac + ';');
        }

        //Center the animation 

        document.getElementById(args.containerDiv).style.left = leftPos + "px";
        document.getElementById(args.containerDiv).style.top = topPos + "px";

    
    };
 
    /**
     * method which disables the iframe for scrolling when the user presses
     * the cursor keys
     * 
     * @param {event} event
     * @returns {Boolean}
     * @memberof OULibs#
     */
    libs.prototype.disableWindowScrolling = function(event) {
        event = event || window.event;
       
        if (event.keyCode >= this.KEY_LEFT_ARROW && event.keyCode <= this.KEY_DOWN_ARROW) {
            if (!!event.preventDefault){event.preventDefault();}
            return false;
        }
        return true;
     };
     
     /**
     * resets the parents frame height if it can: Note does not work locally
     * 
     * @param {integer} frameHeight 
     * @memberof OULibs#
     */
    libs.prototype.setFrameHeight = function(frameHeight) {
        
        if (!!window.frameElement){
            window.frameElement.setAttribute("height",frameHeight);
        }
       
     };
 
      /**
     * resets the parents frame width if it can: Note does not work locally
     * 
     * @param {integer} frameWidth 
     * @memberof OULibs#
     */
    libs.prototype.setFrameWidth = function(frameWidth) {
        
        if (!!window.frameElement){
            window.frameElement.setAttribute("width",frameWidth);
        }
       
     };
     
     /**
      * 
      * @param {dom object} elm
      * @returns {integer} height
      * @memberof OULibs#
      */
     libs.prototype.getScrollHeight = function(elm){
    
        
        var height = Math.max( elm.scrollHeight,
                               elm.offsetHeight,
                               elm.clientHeight);
         return height;
     };
 

    /**
      * 
      * @param {string} id
      * @param {boolean} user
      * @param {function} cbf
      * 
      * @memberof OULibs#
      */
      libs.prototype.loadData = function(id,user,cbf){
     
     
      var values      = {},
          vleValues   = {}, 
          returnValue = null, 
          elm         = [id], 
          self        = this;      
      
      this.trace("Load data");
      
      if (!!VLE){
        VLE.get_server_data(user, elm, function(values) {
              var key;

              if (values){
                  for (key in values) {
                      if (values.hasOwnProperty(key)){
                           self.trace("key:"+key+":"+values[key]);
                           if (values[key]!== ""){
                               vleValues[key] = JSON.parse(values[key]);
                               // This is designed to work with the first key only
                               returnValue = vleValues[key];
                               break;
                           }
                           self.trace("vleValues key:"+key+":"+vleValues[key]);
                      }
                  }
                  self.trace("loaded");  
              }
              cbf(returnValue);

          }, function(msg) {


              self.trace('Use localstorage : ' + msg);
              if (!!localStorage ){
                  values = localStorage.getItem(id);
                  if (values){
                      returnValue = JSON.parse(values);
                  }
              }
              cbf(returnValue);

          }, this.actvityId, this.documentId, this.courseId);
      }
      else
      {
        this.trace("Error VLE API not found, check that the libarary is included");
      }
        
    };

    /**
      * 
      * @param {string} id
      * @param {boolean} user
      * @param {object} data
      * 
      * @memberof OULibs#
      */
    libs.prototype.saveData = function(id,user,data){
      OULib.trace("save data");
      var  vleValues=[];
      var self = this;
      
      
       if (!!VLE){
            vleValues[id] = JSON.stringify(data);

            self.trace('Bytes : ' + self.byteCount(vleValues[id])+ "kb:"+ (self.byteCount(vleValues[id]))/1024); 

            VLE.set_server_data(user, vleValues, function() {
                  self.trace('Saved OK');
            }, function(msg) {
                if (!!localStorage ){
                      self.trace('Use localstorage : ' + msg);
                      localStorage.setItem(id, vleValues[id]);
                      self.trace('Saved OK');
                }
            },this.previousValue, null, this.actvityId, this.documentId, this.courseId);
       }else{
         this.trace("Error VLE API not found, check that the libarary is included");
       }
    };


    /**
      * Calculates the byte count of the passed string
      * 
      * @param {string} str - string to check
      * @returns {integer} number of bytes in the passed string
      * 
      * @memberof OULibs#
      */
    libs.prototype.byteCount = function(str) {
        return encodeURI(str).split(/%..|./).length - 1;
    };
    
	/**
      * Test to see if the HTML audio tag can be used
      * 
      * @returns {bool} test result
      * 
      * @memberof OULibs#
      */
    libs.prototype.canPlayAudio = function(){
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));  
    };
    
 /**
      * Test to see if the device has touch controls
      * 
      * @returns {bool} test result
      * 
      * @memberof OULibs#
      */
    libs.prototype.hasTouchUi = function () {
        return 'ontouchstart' in window // works on most browsers 
        || 'onmsgesturechange' in window; // works on ie10
    };
    
    
    
    libs.prototype.startLoader = function (args){
      
      var cacheDiv, self = this;
      
      var main_style="left:0px;top:0px; position:absolute; overflow:hidden; border: none;" +
              "width:"+args.activity_width;+";"+
              "height:"+args.activity_height;+"; text-align:center; font-family:arial;";
      
      var innerLoader = " position:relative; top:160px;  margin:auto; ";


      var progressBar = " width:200px; height:15px; display:block; background-color: #d8f0bc; "+
           "border: ridge 2px #89c614;  margin: 0 auto; overflow:hidden; position:relative; ";

      var progressBarAnimId = " left:0px; top: 0px; width:16px; height:20px; display:block; "+
           "position:absolute; background-color: #89c614; border: none;";

      var htmlStr = '<div style="'+main_style+'" id="LoadingDiv">'+
            '<div style="'+innerLoader+'">'+
                '<p>Loading please wait..</p>'+
                '<div style="'+progressBar+'" id="progressBarId"><div style="'+progressBarAnimId+'" id="progressBarAnimId"></div></div>'+
            '</div>'+
        '</div> <div style="visibility:hidden;font-size:0;overflow: hidden; height: 0px; width: 0px;" id="cache"></div>';
        
       
        document.getElementsByTagName("body")[0].insertAdjacentHTML('afterbegin',htmlStr);

        cacheDiv = document.getElementById("cache");
     
        
        for (var key in args.img) {
            if (args.img.hasOwnProperty(key)){
               var elm = document.createElement("img");
               elm.onload = function(){
                   self.imageCount--;
                    if (self.imageCount<=0){
                         args.cbf();
                         document.getElementById("LoadingDiv").style.visibility="hidden";
                    }
               };
            
             
               elm.src = args.img[key];
               cacheDiv.appendChild(elm);
               this.imageCount++; 
            }
        }
        
        
        if (this.imageCount>0){
            this.loaderAnimation();}
        else{
            args.cbf();
        }
    };
    
        
   libs.prototype.loaderAnimation = function(){

        var self = this,
             progressBarWidth  =  document.getElementById("progressBarId").offsetWidth;
         this.loaderLeftPosition+=4;
         if (this.loaderLeftPosition>progressBarWidth){
             this.loaderLeftPosition=-document.getElementById("progressBarAnimId").offsetWidth;
         }
         document.getElementById("progressBarAnimId").style.left = this.loaderLeftPosition+"px";
         requestAnimationFrame(function(){self.loaderAnimation();});
    };
    
    
    
    
    
    
    
    
    
 return libs;
}());

/**
* @var {OULib}
* @type OULibs */
var OULib = new OULibs({"debugOn":false});


// update the requestAnimationFrame window object to cover all browsers

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
 
    if (requestAnimationFrame === undefined){
        window.requestAnimationFrame = (function(func){setTimeout(func,16);});
    }else{
        window.requestAnimationFrame = requestAnimationFrame;
    }
  })();