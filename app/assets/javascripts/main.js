
var startPanel = 1;

$(document).ready(function(){

    window.panelWidth = $('.sp').width();

    $('.panel-container .panel').each(function(index){

        $(this).css({'width':window.panelWidth+'px','left':(index*window.panelWidth)+'px'});

        $('.sp .panels').css('width',(index+1)*window.panelWidth+'px');

    });
    /*Add click event to items */
    $('.sp .items span').each(function(){
        $(this).on('click', function(){
            changePanels( $(this).index() );
        });
    });

    /* Trigger the first panel */
    $('.sp .items span:nth-child('+window.startPanel+')').trigger('click');

});


function changePanels(newIndex){

    var newPanelPosition = ( window.panelWidth * newIndex ) * -1;
    var newPanelHeight = $('.sp .panel:nth-child('+(newIndex+1)+')').find('.panel-content').height() + 0;



    $('.sp .items span').removeClass('selected');
    $('.sp .items span:nth-child('+(newIndex+1)+')').addClass('selected');
    $('.sp .panels').animate({left:newPanelPosition},1000);
    $('.sp .panel-container').animate({height:newPanelHeight},1000);
    $.get("/baby-steps.json").done( function(data){
        var friends = '';
        $.each(data.friends, function(index, value) {

            if((newIndex + 1) == value.babyStep){
                friends += value.firstName + ' ' + value.lastName + ', ';


            }



        });
        if(friends != ''){
            $(".heading").html('<p><span style="color: #36abe1;">' + friends + '</span>are on this step.</p>');
        }
        else {
            $(".heading").html('');
        }
    });

}