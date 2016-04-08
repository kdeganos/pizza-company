function Pizza () {
  this.toppings = [];
  this.big = "Small";
  this.cost = "10";
  this.uniqueId = 0;
}

Pizza.prototype.pricer = function() {
  if (this.big === "Small") {
    this.cost = 10;
  } else if (this.big === "Medium") {
    this.cost = 13;
  } else {
    this.cost = 16;
  }
  this.cost += this.toppings.length;
  $("#priceOutput").text(this.cost).animateCss('fadeIn');
}

function newPie() {
  $(".chkBox").prop("checked", false);
  $("#smallBox").prop("checked", true);
  $("#toppingsOutput").text("");
  $("#sizeOutput").text("Small").animateCss('fadeIn');
  $("#priceOutput").text(10).animateCss('fadeIn');

}

Pizza.prototype.newP = function() {
  $(".chkBox").prop("checked", false);
  $("#smallBox").prop("checked", true);
  $("#toppingsOutput").text("");
  $("#sizeOutput").text("Small").animateCss('fadeIn');
  $("#priceOutput").text(10).animateCss('fadeIn');
  this.cost=10;
  this.toppings=[];
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function() {
  var pizza1 = new Pizza();
  var pizzas = [];
  var totalCost = 0;
  var unique = 0;

  // displays "base" price
  $("#sizeOutput").text(pizza1.big);
  $("#priceOutput").text(pizza1.cost);
  $("#totalPriceOutput").text(totalCost);

  $('input[type="radio"]').click(function() {
      if($(this).is(":checked")) {
          pizza1.big = $(this).val();
          $("#sizeOutput").text(pizza1.big).animateCss("fadeIn");
      }
      pizza1.pricer();
    });

  $('input[type="checkbox"]').click(function() {
      if($(this).is(":checked")){
          pizza1.toppings.push($(this).val());
      }
      else if($(this).is(":not(:checked)")) {
        var remove = $(this).val();
        pizza1.toppings = $.grep(pizza1.toppings, function(value) {
          return value !== remove;
          });
      }
      $("#toppingsOutput").text(pizza1.toppings.join(", ")).animateCss("fadeIn");
      pizza1.pricer();
    });

  $("#addPie").click(function(event) {
    var tempPizza = pizza1;
    pizza1.uniqueId = unique;

    totalCost += parseInt(pizza1.cost);

    $("#totalPriceOutput").text(totalCost).animateCss("fadeIn");
    $("ul#pastPies").append("<li class='pies'><span>Pizza:  $" + pizza1.cost + "</span></li>");

    // $('.pies').last().click(function() {
    //   $("#pastSize").text(tempPizza.big).animateCss("fadeIn");
    //   $("#pastToppings").text(tempPizza.toppings.join(", ")).animateCss("fadeIn");
    //
    // });
    unique++;
    newPie();
    pizzas.push(pizza1);
    pizza1 = new Pizza();

    $('.pies').last().click(function() {
      this.remove();
      
      pizza1 = new Pizza();
      totalCost -= parseInt(tempPizza.cost);

      $("#totalPriceOutput").text(totalCost).animateCss("fadeIn");

      if (tempPizza.big === "Small") {
        $("#smallBox").prop("checked", true);
        pizza1.big = "Small";
      } else if (tempPizza.big === "Medium") {
        $("#mediumBox").prop("checked", true);
        pizza1.big = "Medium"
      } else {
        $("#largeBox").prop("checked", true);
        pizza1.big = "Large"
      }

      if (tempPizza.toppings.indexOf("Pepperoni") != -1) {
        $("#pepperoni-box").prop("checked", true);
        pizza1.toppings.push("Pepperoni");
      } else {
        $("#pepperoni-box").prop("checked", false);}

      if (tempPizza.toppings.indexOf("Sausage") != -1) {
        $("#sausage-box").prop("checked", true);
        pizza1.toppings.push("Sausage");
      } else {
        $("#sausage-box").prop("checked", false);
      }

      if (tempPizza.toppings.indexOf("Bacon") != -1) {
        $("#bacon-box").prop("checked", true);
        pizza1.toppings.push("Bacon");
      } else {
        $("#bacon-box").prop("checked", false);
      }

      if (tempPizza.toppings.indexOf("Olives") != -1) {
        $("#olives-box").prop("checked", true);
        pizza1.toppings.push("Olives");
      } else {
        $("#olives-box").prop("checked", false);
      }

      if (tempPizza.toppings.indexOf("Mushrooms") != -1) {
        $("#mushrooms-box").prop("checked", true);
        pizza1.toppings.push("Mushrooms");
      } else {
        $("#mushrooms-box").prop("checked", false);
      }

      pizza1.pricer();
      $("#toppingsOutput").text(pizza1.toppings.join(", ")).animateCss("fadeIn");
    });


    unique++;
    newPie();
    pizzas.push(pizza1);
    pizza1 = new Pizza();

    console.log(pizzas[0].toppings.join(', '));
  });


});
