/*
 * refactored from embeddable chart. Defines basic form handling functions. Needs refactoring to a class. 
 */

/*
 * Return a form field value given a jquery path
 * @param string jquery path to form field
 * @return string
 */
function getFormValue(fieldName){
    try{
      return $(fieldName).fieldValue()[0];
      }
    catch(e){
    
      return null;
    }

}

function toggleElementWithButton(buttonId, elementId){
    $(buttonId).click(
      function (){
        $(elementId).toggle();
        
        // change text to show/hide
        var buttonText = $(buttonId).text();;
        if(buttonText.indexOf('Show')!=-1){
          buttonText = buttonText.replace('Show', 'Hide');
        }
        else {
          buttonText = buttonText.replace('Hide', 'Show');
        }
        $(buttonId).text(buttonText);
      }
      
    );
    $(elementId).hide();
}