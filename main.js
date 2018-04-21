// main document ready function to check if dom is loaded fully or not

let myFacebookToken;

$(document).ready(() => {
    $('#loader').hide();
    $('.p-3').hide();
    $('.p-4').hide();
    $('#Click1').click(()=>{
       $('.p-3').toggle(); 
    })
    $('#Click2').click(()=>{
       $('.p-4').toggle(); 
    })
    

    myFacebookToken = prompt("Please enter your Facebook Token:", "");

    if (myFacebookToken == null || myFacebookToken == "") {

        alert("No usr Token found");

    } else {

        getAllDetails();

    } // end if condition

}); // end document.ready function

let getAllDetails = () => {


    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=name,about,education,birthday,cover,picture.type(large),feed &access_token=' + myFacebookToken,

        success: (response) => {

            $('#dataSection').css('display', 'block');

           console.log(response);

            $('#userName').append(response.name);


            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');
            
            $('#DOB').append(response.birthday);
            $('#education').append(response.education)
            
            let tempFeed = response.feed
            let allFeed = tempFeed.data 
             
            
                for(feeds of allFeed){
                   
                    
                    if(feeds.story == "" || feeds.story== null || feeds.story == undefined ){
                    
                    } else{
                         let temp = `<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" id="feed">${feeds.story}
                        <hr>`;
                        $('#feed').append(temp);
                    }
                    
                }

        },error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        },
        timeout:1800,
        
        beforeSend: function(){
            $('#loader').show();
        } ,
        complete:function(){
             $('#loader').hide();
        }
        

    });// end ajax call 

}