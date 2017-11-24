


const beefcalc = {};
// let pie_data = [
//     {
//         label: 'beef', 
//         val: 0
//     }, 
//     {
//         label: 'everything else', 
//         val: 0
//     }
// ]

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
//   $.scrollify({
//     section : ".section",
//     setHeights: false
//   });
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


