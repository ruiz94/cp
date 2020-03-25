var sliders = 0;
document.querySelectorAll('.sl').forEach(function(){
    sliders++
})
document.querySelectorAll('.btns .btn').forEach(function(el){
    el.addEventListener('click', function(btn){
        var btn = btn.currentTarget
        var clases = btn.classList.value
        var slideOn = document.querySelector('.sl.on')
        var positionSlide = parseInt(slideOn.getAttribute('data-num'))
        slideOn.classList.remove('on')
        if(clases.includes('left')){
            positionSlide--
            if(!positionSlide)
                positionSlide = sliders
        }else{
            positionSlide++
            if(positionSlide > sliders)
                positionSlide = 1
        }
        document.querySelector(`.sl[data-num="${positionSlide}"]`).classList.add('on') 
        document.querySelector('.btns .nombre .num').innerText = positionSlide
    })
})

var cardsSlider2 = 0
document.querySelectorAll('.slider-2 .slides .cards .card').forEach(function(){
    cardsSlider2++
})
document.querySelectorAll('.slider-2 .arrow').forEach(function(el){
    el.addEventListener('click', function(btn){
        btn = btn.currentTarget
        var clases = btn.classList.value
        var cardOn = document.querySelector('.slider-2 .card.on')
        var positionCard = parseInt(cardOn.getAttribute('data-num'))
        // console.log(clases, cardsSlider2, positionCard)
        document.querySelectorAll('.slider-2 .slides .cards .card').forEach(function(el){
            el.classList.remove('on', 'left', 'right')
        })
        if(clases.includes('left')){
            positionCard--
            if(!positionCard)
                positionCard = cardsSlider2
        }else{
            positionCard++
            if(positionCard > cardsSlider2)
                positionCard = 1
        }
        document.querySelector(`.slider-2 .card[data-num="${positionCard}"]`).classList.add('on')
        var vecinoLeft = positionCard - 1, vecionRight = positionCard + 1
        if(positionCard == 1)
            vecinoLeft = cardsSlider2
        if(positionCard == cardsSlider2)
            vecionRight = 1
        document.querySelector(`.slider-2 .card[data-num="${vecinoLeft}"]`).classList.add('left')
        document.querySelector(`.slider-2 .card[data-num="${vecionRight}"]`).classList.add('right')
    })
})