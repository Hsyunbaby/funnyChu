var totalBtn1 = 0,
    totalBtn2 = 0;
clickBtn();
mouseCover();
function clickBtn(){
    $('button').on('click',function(){
        var img = $(this).parent().find('img');
        var btn = $(this).attr('class');
        var flyImg = img.clone().css({'opacity':'0.6'});
        $('.wrapper').append(flyImg);
        flyImg.css({
            'z-index':999,
            'border':'3px solid #fff',
            'position':'absolute',
            'height': img.height() + 'px',
            'width': img.width() + 'px',
            'top': img.offset().top + 'px',
            'left': img.offset().left + 'px'
        })
        flyImg.animate({
            'width':50 + 'px',
            'height': 50 + 'px',
            'border-radius': 100 + '%'
        },function (){
            var t;
            if(btn == 'btn1') {
                t = $('#btn1-add').offset().top;
                totalBtn1 ++;
            }else if(btn == 'btn2') {
                t = $('#btn2-add').offset().top;
                totalBtn2 ++;
            }
            flyImg.animate({
                'top': t,
                'left':($(document).width() - $('.rightBox').width()) + 'px',
                'height':0 + 'px',
                'width': 0 + 'px'
            },1500,function(){
                flyImg.remove();
                $('#btn2-add').html(totalBtn2);
                $('#btn1-add').html(totalBtn1);
            })
        })
    })
}
function mouseCover(){
    $('.rightBox-ul li').on('mouseenter',function(){
        $(this).find('.leftBox').animate({
            'left': -90 + 'px'
        }).addClass('show');
        $(this).find('.fir-leftBox').addClass('show');
        $(this).find('.sev-leftBox').addClass('show');
    })
    $('.rightBox-ul li').on('mouseleave',function(){
        $(this).find('.leftBox').animate({
            'left':-121 + 'px'
        }).add('.fir-leftBox').removeClass('show');
        $(this).find('.fir-leftBox').removeClass('show');
        $(this).find('.sev-leftBox').removeClass('show');
    })
}