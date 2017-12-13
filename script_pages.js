$('#nav-open').on('click', (e) => {
    e.preventDefault();
    $('.main-nav').addClass('active')
})
$('#nav-close').on('click', () => {
    $('.main-nav').removeClass('active')
})
$('.main-nav li').on('click', () => {
    $('.main-nav').removeClass('active')
})