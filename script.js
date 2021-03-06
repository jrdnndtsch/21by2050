


const beefcalc = {};

beefcalc.individual_annual_emission = (beef_per_week, serving_size) => {
    return ((beef_per_week * serving_size * 75) / 1000) * (52.1429 * 27)
}

beefcalc.global_annual_emissions = (individual_annual_emission) => {
    return (individual_annual_emission * 9772000000) / 1000000000000
}

beefcalc.percentage_global_threshold = (global_annual_emissions) => {
    return global_annual_emissions / 21
}

beefcalc.make_pie_chart = (percentage_global_threshold) => {
    $('.individual-results').removeClass('active')
    percentage_global_threshold = Math.round(percentage_global_threshold * 100)

    let data = [
        {
            val: percentage_global_threshold
        }, 
        {
            val: 100 - percentage_global_threshold
        }
    ]
    let svg, 
        color;
    $('.individual-results').removeClass('good med bad')
    if(percentage_global_threshold < 10) {
        $('.individual-results').addClass('good active')
        $('.individual-results h2').text('Yay!')
        $('.individual-results p.statement').text('This is consistent with our current emissions ratios and a good place to be.')
        $('.individual-results img').attr('src', 'assets/good-arrow.svg')
        
        svg = d3.select("#pie")
        color = d3.scaleOrdinal(["#71BF51", "#EAE5DA"])
        text_color = d3.scaleOrdinal(["#EAE5DA", "#71BF51" ])
        $('.good .individual-percentage').html(percentage_global_threshold + '%')
    } else if(percentage_global_threshold >= 10 && percentage_global_threshold <= 20) {
        $('.individual-results').addClass('med active')
        $('.individual-results h2').text('Not ideal.')
        $('.individual-results p.statement').text('There are many other contributors to emissions that still need to be accounted for.')
        $('.individual-results img').attr('src', 'assets/med-arrow.svg')
        svg = d3.select("#pie")
        color = d3.scaleOrdinal(["#E2B920", "#EAE5DA"])
        text_color = d3.scaleOrdinal(["#EAE5DA", "#E2B920"])
        $('.individual-results').addClass('active')
        $('.med .individual-percentage').html(percentage_global_threshold + '%')
    } else {
        $('.individual-results h2').text('Uh oh.')
        $('.individual-results').addClass('bad active')
        $('.individual-results p.statement').text('There are many other contributors to emissions that still need to be accounted for.')
        $('.individual-results img').attr('src', 'assets/bad-arrow.svg')
        svg = d3.select("#pie")
        color = d3.scaleOrdinal(["#DF3965", "#EAE5DA"])
        text_color = d3.scaleOrdinal(["#EAE5DA", "#DF3965"])
        $('.individual-results.bad').addClass('active')
        $('.bad .individual-percentage').html(percentage_global_threshold + '%')
    }
    gp_percent = percentage_global_threshold + "%"
    $('.global-percentage').text(gp_percent)

    
    let width = +svg.attr("width"),
        height = +svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    console.log(width, height)
    let pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.val; });

    let path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    let label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);    

    let arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.val); });
    
    // arc.append("text")
    //     .attr("transform", function (d) { return "translate(" + label.centroid(d) + ")"; })
    //     .attr("dy", "2.2rem")
    //     .attr('fill', function (d) { return text_color(d.data.val); })
    //     .attr('font-size', '3.9rem')
    //     .text(function (d) { return d.data.val + '%'; });
      
}
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    console.log('in dis')
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}



$(function() {
    // disableScroll()
  $.scrollify({
    section : ".section",
    setHeights: false,
    after: function (i) {
        if(i === 4){
            cityAnimationUp();
            console.log('start city animation')
        } else if (i === 6) {
            problemOneAnimation();
        } else if (i === 1){
            console.log('we on two now')
            $.scrollify.disable();
            disableScroll()
        }
     },
  });
//  ****  Greensock animation ****

// City animation
var cityAnimationUp = function(){
    console.log('city anime')
    var tlCity = new TimelineMax({});

    tlCity.to(building_1, 0.5, { x: 0, y: 0 })
        .to(building_2, 0.5, { x: 0, y: 0 })
        .to(building_3, 0.5, { x: 0, y: 0 })
}

    var cityAnimationDown = function () {
        // Reset buildings

        TweenMax.to(building_1, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_3, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_5, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_7, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_9, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_11, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_12, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_13, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_14, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_15, 0.5, { x: 0, y: 250 })
        TweenMax.to(building_16, 0.5, { x: 0, y: 250 })
    }

// Truck animation
    var tlTire1 = new TimelineMax({
        repeat: -1
    })
    var tlTire2 = new TimelineMax({
        repeat: -1
    })
    var tire_1 = document.getElementById('tire_1')
    var tire_2 = document.getElementById('tire_2')

    tlTire1.to(tire_1, 0.8, { transformOrigin: "center", rotation: 360 })
    tlTire2.to(tire_2, 0.8, {transformOrigin: "center", rotation: 360 });

    var tlTruck = new TimelineMax({
        repeat: -1
    })
    var tlTruck2 = new TimelineMax({
        repeat: -1
    })
    var tlTruck3 = new TimelineMax({
        repeat: -1
    })
    var tlTruck4 = new TimelineMax({
        repeat: -1
    })
    var tlTruck5 = new TimelineMax({
        repeat: -1
    })
    var tlTruck6 = new TimelineMax({
        repeat: -1
    })
    var tlTruck7 = new TimelineMax({
        repeat: -1
    })
    var tlTruck8 = new TimelineMax({
        repeat: -1
    })
    var tlTruck9 = new TimelineMax({
        repeat: -1
    })
    var tlTruck10 = new TimelineMax({
        repeat: -1
    })
    var tlTruck11 = new TimelineMax({
        repeat: -1
    })
    var tlTruck12 = new TimelineMax({
        repeat: -1
    })
    var tlTruck13 = new TimelineMax({
        repeat: -1
    })
    var tlTruck14 = new TimelineMax({
        repeat: -1
    })


    var truck_1 = document.getElementById('truck_1')
   

    tlTruck.to(truck_1, 0.2, {x: 0, y: 3})
            .to(truck_1, 0.2, {x: 0, y: 0 })

    tlTruck2.to(truck_2, 0.2, { x: 0, y: 3 })
        .to(truck_2, 0.2, { x: 0, y: 0 })
        
    tlTruck3.to(truck_3, 0.2, { x: 0, y: 3 })
        .to(truck_3, 0.2, { x: 0, y: 0 })
        
    tlTruck4.to(truck_4, 0.2, { x: 0, y: 3 })
        .to(truck_4, 0.2, { x: 0, y: 0 })
        
    tlTruck5.to(truck_5, 0.2, { x: 0, y: 3 })
        .to(truck_5, 0.2, { x: 0, y: 0 })
        
    tlTruck6.to(truck_6, 0.2, { x: 0, y: 3 })
        .to(truck_6, 0.2, { x: 0, y: 0 })
        
    tlTruck7.to(truck_7, 0.2, { x: 0, y: 3 })
        .to(truck_7, 0.2, { x: 0, y: 0 })
        
    tlTruck8.to(truck_8, 0.2, { x: 0, y: 3 })
        .to(truck_8, 0.2, { x: 0, y: 0 })
        
    tlTruck9.to(truck_9, 0.2, { x: 0, y: 3 })
        .to(truck_9, 0.2, { x: 0, y: 0 })
        
    tlTruck10.to(truck_10, 0.2, { x: 0, y: 3 })
        .to(truck_10, 0.2, { x: 0, y: 0 })
        
    tlTruck11.to(truck_11, 0.2, { x: 0, y: 3 })
        .to(truck_11, 0.2, { x: 0, y: 0 })
        
    tlTruck12.to(truck_12, 0.2, { x: 0, y: 3 })
        .to(truck_12, 0.2, { x: 0, y: 0 })
        
    tlTruck13.to(truck_13, 0.2, { x: 0, y: 3 })
        .to(truck_13, 0.2, { x: 0, y: 0 })

    tlTruck14.to(truck_14, 0.2, { x: 0, y: 3 })
        .to(truck_14, 0.2, { x: 0, y: 0 })




    // Problem One animation
    var problemOneAnimation = function(){
        var tlCloud1 = new TimelineMax({
            repeat: -1
        })
    
        tlCloud1.to(cloud_1, 100, { x: 800, y: 0 })
    
        var tlCloud2 = new TimelineMax({
            repeat: -1
        })
    
        tlCloud2.to(cloud_2, 100, { x: 800, y: 0 })
    }


  $('form').on('submit', (e) => {
      e.preventDefault();
      $.scrollify.enable();
      enableScroll()
      let beef_per_week = $('#beef-per-week').val();
      let serving_size = $('#beef-per-meal').val();
      let individual_emission = Math.round(beefcalc.individual_annual_emission(beef_per_week, serving_size));
      let km = Math.round((individual_emission / 0.417) * 1.60943)
      $('.km').text(km + 'km')
      $('.individual-emission').text(individual_emission + ' kg CO2e')
      let global_emission = beefcalc.global_annual_emissions(individual_emission);
      let gigatons = parseInt(Math.round(global_emission)) + " gigatons"
      $('.gigaton').text(gigatons)
      let percentage = beefcalc.percentage_global_threshold(global_emission);
      let global_emit = parseInt(Math.round(percentage * 100)) + " %"
      let height = ((21 * percentage) * 18) / 2
      $('.project-global-emission').text(global_emit)
      $('.your-diet').css("height", height)
      let percentage_left = parseInt(100 - Math.round((percentage * 100))) + " %"
      $('.percentage-left').text(percentage_left)
      let url = 'https://script.google.com/macros/s/AKfycbx0AZ4GbFSqEXloRZCSGwgiYE_uHAX3HjSGe6oCV_AHJTatTFE/exec'
      console.log(percentage)
      sheet_data = $('form').serialize() + '&percentage=' + percentage + '&individual_emission=' + individual_emission + "&global_emission=" + global_emission
      console.log(sheet_data);
      $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          data: sheet_data
      }).success(
          // do something
          );
      beefcalc.make_pie_chart(percentage)
      $.scrollify.current();
      $.scrollify.next(); 
  })

  $('.scroll-next').on('click', (e) => {
    e.preventDefault();
    $.scrollify.next(); 
  })
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

    // cityAnimationUp()
});


