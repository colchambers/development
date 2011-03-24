/*
 * refactored from embeddable chart. Defines basic form handling functions. Need refactoring to a class. 
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