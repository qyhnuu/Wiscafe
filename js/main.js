$(document).ready(function(){
    $('.tab-menu li').on('click', function(){
        $('.tab-menu li').removeClass('active');
        $(this).addClass('active');
    })
    $('.tab-menu-side li').on('click', function(){
        $('.tab-menu-side li').removeClass('active');
        $(this).addClass('active');
    })
    $('.tab-date li').on('click', function(){
        $('.tab-date li').removeClass('active');
        $(this).addClass('active');
    })
})

//