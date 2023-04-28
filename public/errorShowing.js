export const showMessage = (message) =>  {
    var messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.innerHTML = message;
    document.body.appendChild(messageDiv);
  
    setTimeout(function() {
      messageDiv.remove();
    }, 3000);
}

