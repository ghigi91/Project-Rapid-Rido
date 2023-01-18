jDiaporama = function(diapoTree) {
	var cDiapo = undefined;
	var DiapoError = "";
  var myDiapoExists = false;
	var ln = undefined;
  var diapo = undefined;
	var diapoImg = undefined;
  var diapoFormatInfos = [10];
  var diapoDiv = [10];
  var i = 0;
  while(i <= 9) {
    diapoFormatInfos[i] = [2];
    diapoDiv[i] = [2];
    i += 1;
  }
	var countCadre = undefined;
  var commandCadre = undefined;
	var controlCadre = undefined;
	var countButtons = [10];
	var controlButtons = [2];
	var actif = 0;
	var newIndex = 0;
  var diapoWidth = undefined;
  var diapoHeight = undefined;
  var playRef = undefined;
  this.fprev = undefined;
  this.fnext = undefined;
  
  try {
    cDiapo = document.getElementById(diapoTree);
    diapo = cDiapo.children;
    ln = cDiapo.children.length;
  }
  catch(err) {
    DiapoError = err;
  }
  finally {
    if(null !== cDiapo && typeof cDiapo !== 'undefined' && DiapoError == "") {
        myDiapoExists = true;
    }
    else { 
  		myDiapoExists = false;
    }
  }	
  
  this.diapoExists = function() {
    	return myDiapoExists;
  }
  
  this.getDiapoError = function() {
    return DiapoError;
  }
  
	function fpreview() {
		if(myDiapoExists == true) {	
      if(actif <= 0) {
          newIndex = ln - 1;
      }
      else if(actif > 0 && actif <= ln-1) {
          newIndex = actif - 1;
      }
      else {
          newIndex = 0;
      }

      //if(actif == 0) { newIndex = ln - 1} else { newIndex = actif - 1;};
      //if(actif < 0 || actif > ln -1) {actif = ln - 1;}
      fhide(actif);
      fshow(newIndex);
      countButtons[actif].style.backgroundPosition = "left";
      countButtons[newIndex].style.backgroundPosition = "right";
      actif = newIndex;
    }
	}

	function freview() {
    if(myDiapoExists == true) {
          //if(actif < ln - 1) { newIndex = actif + 1} else { newIndex = 0;};
      if(actif >=0 && actif < ln-1) {
        newIndex = actif +1;
      }
      else {
        newIndex = 0;
      }
      fhide(actif);
      fshow(newIndex);
      countButtons[actif].style.backgroundPosition = "left";
      countButtons[newIndex].style.backgroundPosition = "right";
      actif = newIndex;
    }
        //alert(diapoDiv[0][0].clientHeight + " " + diapoDiv[0][1].clientHeight);
	}
	
  this.fprev = fpreview;
	this.fnext = freview;
	
	this.fplay = function() {
    if(myDiapoExists == true) {
		  playRef = setInterval(freview, 10000);
    }
	}
  	
  function fhide(index) {
    if(myDiapoExists == true) {
    	commandCadre[index].style.zIndex = "100";
    	diapo[index].style.opacity = '0';
    }
	}

	function fshow(index) {
    if(myDiapoExists == true) {
    	commandCadre[index].style.zIndex = '1000';
    	diapo[index].style.opacity = '1';
    }
	}
	
	function activCntrlBtn() {
	  res = [];
	  if((null !== controlButtons[0] && typeof controlButtons[0] !== 'undefined') && (null !== controlButtons[1] && typeof controlButtons[1] !== 'undefined')) {
	    if(!window.addEventListener || window.attachEvent) {
        controlButtons[0].attachEvent('click', this.fprev);
	      controlButtons[1].attachEvent('click', this.fnext);
      }
      else {
        controlButtons[0].addEventListener('click', fpreview);
	      controlButtons[1].addEventListener('click', freview);
      }
      //alert (res[0] + "att " + res[1] + "att " + res[2] + "add " + res[3] + "add " );
	  }
	}
  
  function createDynElm() {
    if(ln > 0) {
      commandCadre = cDiapo.getElementsByClassName('diapoboutonline');
      countCadre = document.createElement('DIV');
      controlCadre = document.createElement('DIV');
      controlButtons[0] = document.createElement('DIV');
      controlButtons[1] = document.createElement('DIV');
    }
    i = 0;
    while(i < ln) {
          //diapoFormatInfos[i] = [2];
          //diapoDiv[i] = [2];
      diapoFormatInfos[i][0] = document.createElement('SPAN');
      diapoFormatInfos[i][1] = document.createElement('SPAN');
      diapoDiv[i][0] = document.createElement('DIV');
      diapoDiv[i][1] = document.createElement('DIV');
      countButtons[i] = document.createElement('DIV');
      i += 1;
    }
  }
  
  function createStyles() {
    if(ln > 0) {
      countCadre.className = "countContainer";
      controlCadre.className = "controlContainer";
    }
    i = 0;
    while(i < ln) {
      diapoFormatInfos[i][0].className = "txtGrosGrasfff";
      diapoFormatInfos[i][1].className = "txtGrosGrasfff";
      diapoDiv[i][0].className = "desc";
      diapoDiv[i][0].style.transition = "opacity 2s ease";
      diapoDiv[i][1].className = "title";
      diapoDiv[i][1].style.transition = "opacity 2s ease";
      countButtons[i].className = "count";
      countButtons[i].style.backgroundPosition = "right";
      commandCadre[i].style.zIndex = "100";
      diapo[i].style.opacity = "0";
      i += 1;
    }
    if(ln > 0) {
      controlButtons[0].className = "prev";
      controlButtons[1].className = "next";
      countButtons[0].style.backgroundPosition = "left";
      commandCadre[0].style.zIndex = "1000";
      diapo[0].style.opacity = "1";
    }
  }
  
  function addContent() {
    i = 0;
    while(i < ln) {
      diapoImg = ((diapo[i].getElementsByTagName("PICTURE"))[0].getElementsByTagName("IMG"))[0];
      //alert(diapoImg.getAttribute("src"));
      try {
        diapoFormatInfos[i][0].textContent = diapoImg.getAttribute('alt');
        diapoFormatInfos[i][1].textContent = diapoImg.getAttribute('title');
      }
      catch(e) {
        //alert("textContent ICMPTBLT");
        try {
          diapoFormatInfos[i][0].innerText = diapoImg.getAttribute('alt');
          diapoFormatInfos[i][1].innerText = diapoImg.getAttribute('title');
        }
        catch(e) {
          alert("innerText or textContent ICMPTBLT");
        }
      }
      countCadre.appendChild(countButtons[i]);
      diapoDiv[i][0].appendChild(diapoFormatInfos[i][0]);
      diapoDiv[i][1].appendChild(diapoFormatInfos[i][1]);
      (diapoImg.parentElement).parentElement.appendChild(diapoDiv[i][0]);
      (diapoImg.parentElement).parentElement.appendChild(diapoDiv[i][1]);
      i += 1;
    }
    controlCadre.appendChild(controlButtons[0]);
    controlCadre.appendChild(controlButtons[1]);
    cDiapo.parentElement.appendChild(controlCadre);
    cDiapo.parentElement.appendChild(countCadre);
  }
  
  this.init = function() {
    if(myDiapoExists == true) {
      createDynElm();
      addContent();
      createStyles();
      activCntrlBtn();
    }
        /*countCadre.style.zIndex = "1000";*/
        /*controlCadre.style.zIndex = "1000";*/
          //diapoFormatInfos[i] = [2];
          //diapoDiv[i] = [2];
        
          //alert(diapoImg.clientWidth + " " + "bla");
          //alert(diapoImg.getAttribute('alt'));
          //alert(diapoDiv[i][0].clientHeight + " " + diapoDiv[i][1].clientHeight);
        //alert(cDiapo.parentElement.className);
        //cDiapo.parentElement.style.height = "0px";
  }
                //Sizing
                /*diapoImg = diapo[0].getElementsByTagName("IMG");
                  diapoWidth = diapoImg[0].clientWidth;
                  diapoHeight = diapoImg[0].clientHeight;
                  cDiapo.parentElement.style.height = diapoHeight + "px";*/
  
  this.diapoResize = function(diapId) {
  	if(myDiapoExists == true) {
      diapoImg = ((diapo[0].getElementsByTagName("PICTURE"))[0].getElementsByTagName("IMG"))[0];
      diapoWidth = diapoImg.clientWidth;
      diapoHeight = diapoImg.clientHeight;
      cDiapo.parentElement.style.height = diapoHeight + "px";
      document.getElementById(diapId).focus();
      /*diapoWidth = diapo[0].clientWidth;
      diapoHeight = diapo[0].clientHeight;
      cDiapo.parentElement.style.height = diapoHeight + "px";*/
    }
  }
	//init();
	//diapoResize();
  	//fplay();
  return this;
}

/*window.onload = function(){	
	if(document.readyState == "complete"){	
		document.body.style.width = window.innerWidth;
		mydiaporama = jDiaporama('diaporama1');
	}
};

window.onresize = function(){
  		mydiaporama.diapoResize();
  		//mydiaporama.fplay();
		//mydiaporama.diapoResize();
}
*/