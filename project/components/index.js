var info = {
  "items": {
    "c001": {
      "parent": "c000",
      "title": "Phones"
    },
    "c002": {
      "parent": "c000",
      "title": "Laptops"
    },
    "c003": {
      "parent": "c000",
      "title": "Accessories"
    },
    "c004": {
      "parent": "c100",
      "title": "Cameras"
    },
    "p001": {
      "parent": "c001",
      "manufacturer": "Apple",
      "title": "iPhone 10",
      "price": 499,
      "releaseDate": "2018-04-23T18:25:43.511Z",
      "sale": true
    },
    "p002": {
      "parent": "c002",
      "manufacturer": "Apple",
      "title": "Macbook Pro 2017",
      "price": 1999,
      "releaseDate": "2017-04-23T18:25:43.511Z",
      "sale": true
    },
    "p003": {
      "parent": "c002",
      "manufacturer": "Dell",
      "title": "XPS 13",
      "price": 1399,
      "releaseDate": "2017-04-23T18:25:43.511Z",
      "sale": true
    },
    "p004": {
      "parent": "c001",
      "manufacturer": "Samsung",
      "title": "Samsung Galaxy S10",
      "price": 399,
      "releaseDate": "2017-04-23T18:25:43.511Z",
      "sale": false
    },
    "p005": {
      "parent": "c003",
      "manufacturer": "Apple",
      "title": "Apple Charger 12W",
      "price": 99,
      "releaseDate": "2016-12-23T18:25:43.511Z",
      "sale": true
    },
    "p006": {
      "parent": "c003",
      "manufacturer": "Samsung",
      "title": "Samsung Charger 12W",
      "price": 89,
      "releaseDate": "2017-04-23T18:25:43.511Z",
      "sale": false
    },
    "p007": {
      "parent": "c005",
      "manufacturer": "Samsung",
      "title": "Samsung VR Headset",
      "price": 699,
      "releaseDate": "2018-04-23T18:25:43.511Z",
      "sale": true
    }
  }
};

// Gets all categories
let get_categories = () => {
	let category = []
	$.each(info.items, function(key, index) {
		let array_content = info.items[key];
		if (Object.keys(array_content).length == 2) {
			array_content.code = key
			category.push(array_content)
		};
	});
	return category;
};

// Selects all item in that category
let pick_category = (category) => {
  let products = []
  $.each(info.items, (index, value) => {
    let parent = value.parent
    if(parent == category) {
      products.push(value)
    }
  })
  return products
};

// Loads categories into navbar
let categories = get_categories()
$.each(categories, (index, value) => {
  $("#category").prepend(`<a href="#!" class="cat_selector" code="${ value.code }">${ value.title }</a>`)
})

// Removes active category
const remove_active_category = () => {
  $(".cat_selector").each(function() {
    $(this).removeAttr("style")
  })
}

// Changes content according to category selected
let test;
let category;
$(".cat_selector").click(function() {
  category = $(this).attr("code")
  remove_active_category()

  $(this)
    .css('color', 'rgb(255, 0, 0)')

  $("section").remove()

  let current_items = pick_category(category)
  $.each(current_items, (index, value) => {
    let release_date = new Date(value.releaseDate)
    $("article").append(`
      <section>
        <div class="content">
          <h3>${ value.title }</h3>
	  <div class="content-1">
		<p> Manufactured by </p> <h4>${ value.manufacturer }</h4>
	  </div>
          <div class="footer-content content__${value.parent}"><p class="price" is_sale="${value.sale}" >PHP ${ value.price } </p> <p class="sale" style="display: none; color: red; font-weight: 1000;"> SALE </p> </div>
          <div class="footer-content text-right">Released on <b>${ release_date.getDate() }/${ release_date.getMonth() }/${ release_date.getFullYear() } </b> </div>
        </div>
      </section>
    `)
     
  })
  
  if(current_items.length < 1) {
    $("article").append(`
      <section>
        <h3>No product for this category.</h3>
      </section>
    `)
  }
})


function myTimeoutFunction()
{
  $( ".footer-content" ).each(function() 
  { 	
	if ($(this).find('.price').attr('is_sale') == "true" && $(this).find('.price').is(":visible")) {
	  $(this).find('.price').hide();
	  $(this).find('.sale').show();
	}
	else
	{
	  $(this).find('.price').show();
	  $(this).find('.sale').hide();
	}
  });
}

myTimeoutFunction();
setInterval(myTimeoutFunction, 3000);
