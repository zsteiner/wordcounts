var chart = c3.generate({
bindto: '#chart',
data: {
    url: 'data/wordcounts.csv',
    type: 'bar',
    x: 'Issues'
},

axis: {
        x: {
            type: 'category',
        }
    }
});

var candidates = [];

function createCandidateList(obj) {   
    var candidateList = document.getElementById('candidate-list');
    var selectedCandidateList = document.getElementById('selected-candidates');

    $.each(obj, function(i, item) {
        item = candidateList.appendChild(document.createElement('li'));
        
        item.innerHTML =
            '<input type="checkbox" id="candidate'+ i + '">' + 
            '<label for="candidate' + i + '" class="candidate-label">' +
                '<img class="candidate-image" src="images/candidates/' + candidates[i].image + '.jpg">' +
            '</label>' +    
            '<div class="candidate-name"><span class="party ' + candidates[i].party + '"></span>' + candidates[i].first + " " + candidates[i].last + '</div>' +
            '<div class="candidate-site"><a href="'+ candidates[i].url + '">Official Site</a></div>'; 
        item.setAttribute('data-candidate-id', i);
       
       $(item).find('input').on('change', function() {
           var selectedItem = selectedCandidateList.appendChild(document.createElement('li'));
           
           if($(this).is(':checked')) {
                selectedItem.innerHTML = '<img class="candidate-image" src="images/' + candidates[i].image + '.jpg">';
                selectedItem.setAttribute('data-candidate-id', i);                
                selectedItem.setAttribute('data-candidate-name', candidates[i].first + " " + candidates[i].last);                
           }
           
           else {
               console.log('remove!');
               $('#selected-candidates li:empty').remove();
               $('#selected-candidates li[data-candidate-id="' + i + '"]').remove();
           }
       });        
    });    
}

$.getJSON('data/candidates.js').done(function(data) {
    candidates = data;
    createCandidateList(candidates);  
}).error(function (err) {
    error = err;
});

