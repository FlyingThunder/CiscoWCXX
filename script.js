$(document).ready(function () {
  
  
  // ### Change the email below to the email you are using for this lab, e.g.'Podxx_user@webex-lab'
  //var xemail = "Pod03_User@webex-lab.com";
  var xemail = "lpeschko@avodaq.eu";
  
  
  $.ajax({
    url: 'https://api.airtable.com/v0/appanheizvuOpIRxP/Accounts?filterByFormula=(customerEmail="' + xemail + '")',
    type: 'GET',
    contentType: "application/json",
    dataType: "json",
    headers: {
      'Authorization':'Bearer pattUZbepbg7SR1zU.46a8b79b861e391832ed0495c19443bd3af18c9c1fc76d9b979fb3eed9a48783' // i realize there will be bots scraping for public access tokens, too bad!
    },
    success: function(data) {
      console.log('Airtable - 200');
      var path = window.location.pathname;

      
      
      
      // ### Here you can change the price in the variable below to the currency and amount you want
      var price = '€849';


      
      // ### You can change the name of the product in the variable below to a name of your choice
      var productName = 'THE RIDGEWAY';
      
      
      
      // ***b If no account details are returned the below JS will execute
      if (data.records[0] === undefined){
        console.log('no records');
        if (path.match("/CiscoWCXX/account.html")){
          var accountReturned = $('#accountReturned'); accountReturned.hide();
          var newAccount = $('#newAccount'); newAccount.show();
          var createEnter = $('#create-enter');
          createEnter.click(function (){
            var customerNameEnter = $('#customerName-enter');
            var xcustomerName = customerNameEnter.val();
            var customerEmailEnter = $('#customerEmail-enter');
            var xcustomerEmail = customerEmailEnter.val();
            var mainTelEnter = $('#mainTel-enter');
            var xmainTel = mainTelEnter.val();
            var secondaryTelEnter = $('#secondaryTel-enter');
            var regex = /.*/ig;
            var matches = secondaryTelEnter.val().match(regex);
            if (matches.toString()){
            var xsecondaryTel = secondaryTelEnter.val();
            } else {xsecondaryTel = "null";}
            var ccTelEnter = $('#ccTel-enter');
            var xccTel = ccTelEnter.val();
            $.ajax({
              url: 'https://hooks.eu.webexconnect.io/events/0R817CAADD', // Account management
              type: 'POST',
              contentType: "application/json",
              dataType: "json",
              data: JSON.stringify({
                "customerName" : xcustomerName,
                "customerEmail": xcustomerEmail,
                "mainTel" : xmainTel,
                "secondaryTel" : xsecondaryTel,
                "ccTel": xccTel,
                "route": "create"
              })
            })
            .done(function (data) {
              console.log('success - create request')
            });
            var nameDisplay1 = document.getElementsByClassName("customerName")[1];
            nameDisplay1.innerText = xcustomerName;
            var route = document.getElementById("route");
            route.innerText = "created";
            var completeMessage = $('#complete-message'); completeMessage.show();
            var before = $('#before'); before.hide();
          });
        } else{
          var priceDisplay = document.getElementsByClassName("price")[0];
          priceDisplay.innerText = price;
          var productDisplay = document.getElementsByClassName("product")[0];
          productDisplay.innerText = productName;
          var createAccount = $('#createAccount'); createAccount.show();
          var before = $('#before'); before.hide();
          var productId = "bb567923"
        } 
      }
      // *** If an account is returned the below JS will execute
      else {
        var user_id = data.records[0].id
        console.log("Your id is "+user_id)
        console.log(data);
        console.log('Record for ' + data.records[0].fields.customerName  + ' retrieved')
        //*** If the web page loaded is /account.html with returned account data
        if (path.match("/CiscoWCXX/account.html")){
          var nameDisplay = document.getElementsByClassName("customerName")[0];
          nameDisplay.innerText = data.records[0].fields.customerName;
          var nameDisplay1 = document.getElementsByClassName("customerName")[1];
          nameDisplay1.innerText = data.records[0].fields.customerName;
          var customerEmail = document.getElementById("customerEmail");
          customerEmail.innerText = data.records[0].fields.customerEmail;
          var mainTel = document.getElementById("mainTel");
          mainTel.innerText = data.records[0].fields.mainTel;
          var secondaryTel = document.getElementById("secondaryTel");
          secondaryTel.innerText = data.records[0].fields.secondaryTel;
          var ccTel = document.getElementById("ccTel");
          ccTel.innerText = data.records[0].fields.ccTel;
          var accountReturned = $('#accountReturned'); accountReturned.show();
          var newAccount = $('#newAccount'); newAccount.hide();
          var deleteEnter = $('#delete-enter');
          deleteEnter.click(function (){
            $.ajax({
              url: 'https://hooks.eu.webexconnect.io/events/0R817CAADD', // Flow - Account Management
              type: 'POST',
              contentType: "application/json",
              dataType: "json",
              data: JSON.stringify({
                "customerEmail" : xemail,
                "route": "delete"
              })
            })
            .done(function (data) {
              console.log('success - delete request')
            });
            var route = document.getElementById("route");
            route.innerText = "deleted";
            var completeMessage = $('#complete-message'); completeMessage.show();
            var before = $('#before'); before.hide();
          });
        } 
        //*** If the web page loaded is /return.html with returned account data
        else if (path.match("/CiscoWCXX/return.html")){
          var nameDisplay = document.getElementById("customerName");
          nameDisplay.innerText = data.records[0].fields.customerName;
        }
        //*** If the web page loaded is / (index.html or 'the homepage') with returned account data
        else{
          console.log(">"+path+"<")
          if (path.match("/CiscoWCXX/account.html")){
            console.log("Test")}
          var priceDisplay = document.getElementsByClassName("price")[1];
          priceDisplay.innerText = price;
          var productDisplay = document.getElementsByClassName("product")[1];
          productDisplay.innerText = productName;
          var createAccount = $('#createAccount'); createAccount.hide();
          var before = $('#before'); before.show();
          var productId = "bb567923"
          var formEnter = $('#form-enter');
          // *** Order is created with below JS function
          formEnter.click(function (){
            var orderVal = 'better' + Math.floor((Math.random() * 100) + 10) + Math.floor((Math.random() * 100) + 10);
            $('.orderId').text(orderVal);
            $.ajax({
              url: 'https://hooks.eu.webexconnect.io/events/6GZC82ADF7', // Website order confirmation
              type: 'POST',
              contentType: "application/json",
              dataType: "json",
              data: JSON.stringify({
                "price" : price,
                "productName": productName,
                "productId" : productId,
                "number" : data.records[0].fields.mainTel,
                "email": xemail,
                "orderId": orderVal
              })
            })
            .done(function (data) {
              console.log('foobar')
            });
            var completeMessage = $('#complete-message'); completeMessage.show();
            var postOrder = $('#before'); postOrder.hide();
            var basket = $('#basket'); basket.hide();
          });
        }
      }
    }
  })
});
