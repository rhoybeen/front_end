$(document).ready(function(){
	populateResourceGallery();
});

function populateResourceGallery(){
    $.ajax({
        url: '/slave/resource/list',
        success: function(data) {
            var jsonObj = JSON.parse(data);
            if (jsonObj['isSuccess']) {
                var payload = jsonObj['payload']
                var video_list = payload['resources'];
                
                } else {
                //show error msg.
               }
            },
        error: function(data){
            
        },
        complete: function() {
            
        }
    });
}