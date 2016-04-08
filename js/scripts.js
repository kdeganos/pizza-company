function Pizza () {
  this.toppings = [];
  this.big = "Small";
  this.cost = "10";
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
  $("#priceOutput").text(this.cost)
}

$(document).ready(function() {
  pizza1 = new Pizza();

  // displays "base" price
  $("#sizeOutput").text(pizza1.big);
  $("#priceOutput").text(pizza1.cost)

  $('input[type="radio"]').click(function() {
      if($(this).is(":checked")) {
          pizza1.big = $(this).val();
          $("#sizeOutput").text(pizza1.big);
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
      $("#toppingsOutput").text(pizza1.toppings.join(", "));
      pizza1.pricer();
    });
});
