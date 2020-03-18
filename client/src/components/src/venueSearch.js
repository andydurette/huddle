/* global $ */


$("#searchForm").submit(async function (event) {
        event.preventDefault();
        let alert = $("label.alert");
        alert.hide();
        if(!$("#locationInput").val() &&  !$("#nameInput").val() ){
            alert.text("please input at least one search parameter");
            alert.show();
            return;
        } 
        else {
        let location = $("#locationInput").val();
        let term = $("#nameInput").val();
        let body = {
            location: location,
            term: term  
        };
        
        $.post('/api/venues/search', body)
        .then(function(data){
            console.log('Data received');
            renderResults(data);
        }).catch(err=>{
            console.log(err);
        }); 
    }
});


function renderResults(data){
    $("#results").empty();
    let contentStr = $('<h3>').text('Search Results');
    let resultList = $('<ul>').attr('class', 'list-group');

    if(data.length === 0){
        return `<span>0 results found</span>`;
    }

    for(const venue of data){ 
        console.log('getting venue details');
        let item = $('<li>').attr({'class': 'list-group-item d-flex justify-content-start align-items-top venueContainer', style: "width:750px;"});
        let restocard = $('<div>').attr({'class': 'd-flex justify-content-left flex-column', style: "padding:1rem;"});
        let resto = $('<h5>').attr('class', 'venueName').text(venue.name);
        
        let img = $("<div>").attr("style","width:150px").append($('<img>').attr({'src': venue.image_url, style: "max-width:150px;height:150px;"}));
        
        let button = $('<button>').attr({'class': 'addToDatabase btn btn-primary ml-auto', 
                        'data-restaurant': encodeJsonForHTML(venue), 
                        'data-yelpid':venue.id,
                    });
        let i = $('<i>').attr('class', 'fas fa-plus');
        button.append(i);
        restocard.append(resto);
        restocard.append($(`<p>Address: ${venue.location.display_address}</p>
                            <p>Phone: ${venue.display_phone}</p>
                            `))
        item.append(img);
        item.append(restocard);
        item.append(button);        
        resultList.append(item);
        
        // += `<li class="">\n
        // <span class="restName">${}</span>\n           
        // <button class="addToList btn btn-primary" data-restaurant="${encodeJsonForHTML(restaurant)}" data-yelpid="${restaurant.id}"><i class="fas fa-plus"></i></button>\n            
        // </li>`;
    }
    
    $("#results").append(contentStr);
    $("#results").append($("<h4>").text(`${data.length} result(s) found`));
    $("#results").append(resultList);

    $(".addToDatabase").on('click', function(event){                
        let venue = decodeJsonFromHTML($(event.currentTarget).data("venue")); 
               
        $.post(`/api/event/venue/:id`, venue)
        .then(res=>{
            $(event.currentTarget).attr('disabled', true);
        });            
    });
    
}

function encodeJsonForHTML(json){
    return JSON.stringify(json).replace(/'/g,"\\'").replace(/"/g,"'");
}
function decodeJsonFromHTML(string){
    return JSON.parse(string.replace(/'/g,'"').replace(/\\"/g,"'"));
}