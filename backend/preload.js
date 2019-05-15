const { remote } = require("electron");

console.log(window);

/*
    We dont want to give a potential XSS-Attacker a possibility to use the NodeJS against use, as it can 
    call code outside of the browser. Which is not very secure ;) 

    We are exposing just this function to the global "window" object. This will be the only native code 
    a attacker could use. We have to make sure its secure enough.
*/
window.createNewBrowserWindow = () => {
  new remote.BrowserWindow();
};

console.log(window);
