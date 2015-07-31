//var selectedIssues = ["Environment", "Biography"];
var chart;
var candidates = [];
var selectedCandidates = [];

function issueChart() {
    chart = c3.generate({
        bindto: '#issue-chart',
        data: {
            url: 'data/issues.json',
            mimeType: 'json',
            type: 'bar',
            keys: {
                x: "issue",
                value: selectedCandidates,
            }
        },
        axis: {
            x: {
                type: 'category',
                height: 40,
            },
            
            y: {
                tick: {
                  format: d3.format(",")        
                }              
            }
        },
        bar: {
          width: {
            ratio: 0.9
          }
        }        
    });
}

function averageChart() {
    chartAverage = c3.generate({
        bindto: '#average-chart',
        data: {
            url: 'data/average.json',
            mimeType: 'json',
            type: 'bar',
            keys: {
                x: "issue",
                value: selectedCandidates,
            }
        },
        axis: {
            x: {
                type: 'category',
                height: 40
            }
        },
        bar: {
          width: {
            ratio: 0.5
          }
        }        
    });
}

function countChart() {
    chartCount = c3.generate({
        bindto: '#count-chart',
        data: {
            url: 'data/count.json',
            mimeType: 'json',
            type: 'bar',
            keys: {
                x: "issue",
                value: selectedCandidates,
            }
        },
        axis: {
            x: {
                type: 'category',
                height: 40
            }
        },
        bar: {
          width: {
            ratio: 0.5
          }
        }        
    }
);
}


function makeCharts() {
    issueChart();
    countChart();
    averageChart();
}

function defaultCandidates() {
    $('#candidate-list [data-default="true"] input').click();
}

function createCandidateList(obj) {
    var candidateList = document.getElementById('candidate-list');
    var selectedCandidateList = document.getElementById('selected-candidates');
    $.each(obj, function(i, item) {
        item = candidateList.appendChild(document.createElement('li'));
        var candidateImage = '<img class="candidate-image" src="images/candidates/' + candidates[i].code + '.jpg">';
        item.innerHTML = '<input type="checkbox" id="candidate' + i + '">' + '<label for="candidate' + i + '" class="candidate-label">' + candidateImage + '</label>' + '<div class="candidate-name">' + candidates[i].first + " " + candidates[i].last + '</div>' + 
            '<div class="party ' + candidates[i].party + '"></div>';
        item.setAttribute('data-candidate-id', candidates[i].last);
        if (candidates[i].default === true) {
            item.setAttribute('data-default', candidates[i].default);
        }
        $(item).find('input').on('change', function() {
            var selectedItem = selectedCandidateList.appendChild(document.createElement('li'));
            if ($(this).is(':checked')) {
                selectedItem.innerHTML = candidateImage + 
                '<div class="candidate-info">' +
                '<div class="candidate-name">' + candidates[i].first + " " + candidates[i].last + '<span class="party ' + candidates[i].party + '"></span></div>' + 
                '<div class="candidate-number"><span class="number">' + candidates[i].issues + '</span>issues <span class="block">covered</span></div>' +
                '<div class="candidate-number"><span class="number">' + candidates[i].average + '</span>average <span class="block">words</span></div>' +
                '<div class="candidate-site"><a href="' + candidates[i].url + '"><span class="block"><svg class="icon icon-info"><use xlink:href="#icon-info"></use></svg></span>learn more</a></div>' +
                '</div>';
                selectedItem.setAttribute('data-candidate-id', candidates[i].last);
                selectedCandidates.push(candidates[i].last);
            }

            else {
                var index = selectedCandidates.indexOf(candidates[i].last);
                $('#selected-candidates li:empty').remove();
                $('#selected-candidates li[data-candidate-id="' + candidates[i].last + '"]').remove();
                selectedCandidates.splice(index, 1);
            }
            //console.log(selectedCandidates); 
            mainScroll();
            makeCharts();
        });
    });

    makeCharts();
    defaultCandidates();
}

$.getJSON('data/candidates.js').done(function(data) {
    candidates = data;
    createCandidateList(candidates);
}).error(function(err) {
    error = err;
});

$('#issue').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#issue-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
   
   issueChart();
   console.log('issue');
});

$('#count').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#count-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
    countChart();
   console.log('count');
});

$('#average').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#average-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
   averageChart(); 
   console.log('average');
});