import React from 'react';

function Alert(props) {

  return (
    
    
      
     props.alert && <div style={{width:"100%",height:"50px"}} className="alert alert-primary position-fixed" role="alert">
     {props.alert.message}
   </div> 
   
  
 
   
  );

}

export default Alert;

