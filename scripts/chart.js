var selectedIssues = ["Environment", "Biography"];
var chart;
var candidates = [];
var selectedCandidates = ["Obama"];

function makeChart() {
    chart = c3.generate({
        bindto: '#chart',
        data: {
            url: 'data/issues.json',
            mimeType: 'json',
            type: 'bar',
            keys: {
                x: "issue",
                value: selectedCandidates,
            },
            hide: selectedIssues
        },
        axis: {
            x: {
                type: 'category',
                height: 40
            }
        },
    });
}

/*
function updateChart() {
    makeChart();
}
*/

function defaultCandidates() {
    $('#candidate-list [data-default="true"] input').click();
}

function createCandidateList(obj) {
    var candidateList = document.getElementById('candidate-list');
    var selectedCandidateList = document.getElementById('selected-candidates');
    $.each(obj, function(i, item) {
        item = candidateList.appendChild(document.createElement('li'));
        var candidateImage = '<img class="candidate-image" src="images/candidates/' + candidates[i].code + '.jpg">';
        item.innerHTML = '<input type="checkbox" id="candidate' + i + '">' + '<label for="candidate' + i + '" class="candidate-label">' + candidateImage + '</label>' + '<div class="candidate-name"><span class="party ' + candidates[i].party + '"></span>' + candidates[i].first + " " + candidates[i].last + '</div>' + '<div class="candidate-site"><a href="' + candidates[i].url + '">Official Site</a></div>';
        item.setAttribute('data-candidate-id', candidates[i].last);
        if (candidates[i].default === true) {
            item.setAttribute('data-default', candidates[i].default);
        }
        $(item).find('input').on('change', function() {
            var selectedItem = selectedCandidateList.appendChild(document.createElement('li'));
            if ($(this).is(':checked')) {
                selectedItem.innerHTML = candidateImage;
                selectedItem.setAttribute('data-candidate-id', candidates[i].last);
                selectedItem.setAttribute('data-candidate-name', candidates[i].first + " " + candidates[i].last);
                selectedCandidates.push(candidates[i].last);
            }

            else {
                var index = selectedCandidates.indexOf(candidates[i].last);
                $('#selected-candidates li:empty').remove();
                $('#selected-candidates li[data-candidate-id="' + candidates[i].last + '"]').remove();
                selectedCandidates.splice(index, 1);
            }
            //console.log(selectedCandidates); 
            makeChart();
        });
    });

    makeChart();
    defaultCandidates();
}

$.getJSON('data/candidates.js').done(function(data) {
    candidates = data;
    createCandidateList(candidates);
}).error(function(err) {
    error = err;
});