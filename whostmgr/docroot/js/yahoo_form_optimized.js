function getFormData(oForm){if(oForm){var aElements=oForm.elements,nTotalElements=aElements.length,oData={},sName,oElement,nElements;for(var i=0;i<nTotalElements;i++){sName=aElements[i].name;function isFormElement(p_oElement){var sTagName=p_oElement.tagName.toUpperCase();return(sTagName=="INPUT"||sTagName=="TEXTAREA"||sTagName=="SELECT")&&p_oElement.name==sName}oElement=YAHOO.util.Dom.getElementsBy(isFormElement,"*",oForm);nElements=oElement.length;if(nElements>0){if(nElements==1){oElement=oElement[0];var sType=oElement.type,sTagName=oElement.tagName.toUpperCase();switch(sTagName){case"INPUT":if(sType=="checkbox"){oData[sName]=oElement.checked}else if(sType!="radio"){oData[sName]=oElement.value}break;case"TEXTAREA":oData[sName]=oElement.value;break;case"SELECT":var aOptions=oElement.options,nOptions=aOptions.length,aValues=[],oOption,sValue;for(var n=0;n<nOptions;n++){oOption=aOptions[n];if(oOption.selected){sValue=oOption.value;if(!sValue||sValue===""){sValue=oOption.text}aValues[aValues.length]=sValue}}oData[sName]=aValues;break}}else{var sType=oElement[0].type;switch(sType){case"radio":var oRadio;for(var n=0;n<nElements;n++){oRadio=oElement[n];if(oRadio.checked){oData[sName]=oRadio.value;break}}break;case"checkbox":var aValues=[],oCheckbox;for(var n=0;n<nElements;n++){oCheckbox=oElement[n];if(oCheckbox.checked){aValues[aValues.length]=oCheckbox.value}}oData[sName]=aValues;break}}}}}return oData}
