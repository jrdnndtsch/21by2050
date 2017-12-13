


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
    console.log(percentage_global_threshold)
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
    if(percentage_global_threshold < 10) {
        svg = d3.select("#good-pie")
        color = d3.scaleOrdinal(["#71BF51", "#EAE5DA"])
        $('.individual-results.good').addClass('active')
        $('.good .individual-percentage').html(percentage_global_threshold + '%')
    } else if(percentage_global_threshold >= 10 && percentage_global_threshold <= 20) {
        svg = d3.select("#med-pie")
        color = d3.scaleOrdinal(["#E2B920", "#EAE5DA"])
        $('.individual-results.med').addClass('active')
        $('.med .individual-percentage').html(percentage_global_threshold + '%')
    } else {
        svg = d3.select("#bad-pie")
        color = d3.scaleOrdinal(["#DF3965", "#EAE5DA"])
        $('.individual-results.bad').addClass('active')
        $('.bad .individual-percentage').html(percentage_global_threshold + '%')
    }

    
    let width = +svg.attr("width"),
        height = +svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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
      
}



$(function() {
  $.scrollify({
    section : ".section",
    setHeights: false,
    after: function (e, j) {
        if($.scrollify.current().hasClass('city')){
            cityAnimationUp();
        } else if ($.scrollify.current().hasClass('problem-one')) {
            problemOneAnimation();
        }
     },
  });
//  ****  Greensock animation ****

// City animation
var cityAnimationUp = function(){
    var tlCity = new TimelineMax({});

    tlCity.to(building_1, 0.5, { x: 0, y: 0 })
        .to(building_3, 0.5, { x: 0, y: 0 })
        .to(building_5, 0.5, { x: 0, y: 0 })
        .to(building_7, 0.5, { x: 0, y: 0 })
        .to(building_9, 0.5, { x: 0, y: 0 })
        .to(building_11, 0.5, { x: 0, y: 0 })
        .to(building_12, 0.5, { x: 0, y: 0 })
        .to(building_13, 0.5, { x: 0, y: 0 })
        .to(building_14, 0.5, { x: 0, y: 0 })
        .to(building_15, 0.5, { x: 0, y: 0 })
        .to(building_16, 0.5, { x: 0, y: 0 })
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

    var truck_1 = document.getElementById('truck_1')

    tlTruck.to(truck_1, 0.2, {x: 0, y: 3})
            .to(truck_1, 0.2, {x: 0, y: 0 })


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
      let beef_per_week = $('#beef-per-week').val();
      let serving_size = $('#beef-per-meal').val();
      let individual_emission = beefcalc.individual_annual_emission(beef_per_week, serving_size);
      let global_emission = beefcalc.global_annual_emissions(individual_emission);
      let percentage = beefcalc.percentage_global_threshold(global_emission);
      console.log(percentage)
      beefcalc.make_pie_chart(percentage)
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
});


