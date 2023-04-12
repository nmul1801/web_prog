var name = 'vodka,lemon juice,tequila,vodka'

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + name,
    headers: { 'X-Api-Key': 'YxzYqRGe1R1j2S8x3vjmkA==1kUTGfxcoqRt46Zb'},
    contentType: 'application/json',
    success: function(result) {
        document.write("<p> Drinks you can make with the ingredients: " + name + "</p>")
        result.forEach(drink => {
            document.write("<p>" + drink.name + "</p>")
            document.write("<ul>")
            drink.ingredients.forEach(ing => {
                document.write("<li>" + ing + "</li>")
            });
            document.write("</ul>")
        });
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});