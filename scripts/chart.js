//var selectedIssues = ["Environment", "Biography"];
var chart;
var candidates = [];
var selectedCandidates = [];

var c3;

var isMobile = false;

var colors = ['#4791E5', '#FAA43A', '#60BD68', '#F17CB0', '#9C604B', '#B276B2', '#DECF3F', '#F15854', '#97C8D7', '#787875'];

//Mobile Detect Function to auto-open the drawer
function mobileDetect() {
    if( $('.menu-button').css('display')==='inline-block') {
        isMobile = true;       
    }
    
    if (isMobile === true) {
        $('#toggle1').click();
    }    
}

function issueChart() {
    chart = c3.generate({
        bindto: '#issue-chart',
        padding: {
          right: 24,  
        },
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
            rotated: true,
            x: {
                type: 'category',
                height: 40
            },
            
            y: {
                tick: {
                  format: d3.format(",f"),
                  count: 3        
                }              
            }
        },
        color: { 
             pattern: colors
         },
        bar: {
          width: {
            ratio: 0.8
          }
        }        
    });
}

function averageChart() {
    chartAverage = c3.generate({
        bindto: '#average-chart',
        padding: {
          right: 24,  
        },
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
            rotated: true,
            x: {
                type: 'category',
                height: 40
            },
            
            y: {
                tick: {
                  format: d3.format(",f"),
                  count: 3        
                }              
            }
        },
        color: { 
             pattern: colors
         },
        bar: {
          width: {
            height: 0.7
          }
        }        
    });
}

function countChart() {
    chartCount = c3.generate({
        bindto: '#count-chart',
        padding: {
          right: 24,  
        },
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
            rotated: true,
            x: {
                type: 'category',
                height: 40
            },
            
            y: {
                tick: {
                  format: d3.format(",f"),
                  count: 3        
                }              
            }
        },
        color: { 
             pattern: colors
         },
        bar: {
          width: {
            ratio: 0.7
          }
        }        
    }
);
}

//Build all the c3.js charts
function makeCharts() {
    issueChart();
    countChart();
    averageChart();
}

//Check Default Candidates
function defaultCandidates(i) {
    var isDefault = candidates[i].default;
    
    if (isDefault === true) {
      $('#candidate' + i).click();
    }        
}

//Build Candidate List
function createCandidateList(obj) {
    var candidateList = document.getElementById('candidate-list');
    var selectedCandidateList = document.getElementById('selected-candidates');
    $.each(obj, function(i, item) {
        item = candidateList.appendChild(document.createElement('li'));
        var candidateImage = '<img class="candidate-image" src="images/candidates/' + candidates[i].code + '.jpg">';
        var listContents = '<input type="checkbox" id="candidate' + i + '">' + '<label for="candidate' + i + '" class="candidate-label">' + candidateImage + '</label>' + '<div class="candidate-name">' + candidates[i].first + " " + candidates[i].last + '</div>' + 
                '<div class="party ' + candidates[i].party + '"></div>';
        if (candidates[i].active === false) {
            item.innerHTML = listContents + '<div class="wrapper"><div class="ribbon-wrapper"><div class="ribbon dropped-out-ribbon">Out</div></div></div>';
            $(item).addClass('dropped-out');
        }
        
        else {
            item.innerHTML = listContents;
        }        

        item.setAttribute('data-candidate-id', candidates[i].last);
        
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

            makeCharts();
        });

        defaultCandidates(i);
    });

    makeCharts();
}

//Download JSON
$.getJSON('data/candidates.js').done(function(data) {
    candidates = data;
    createCandidateList(candidates);
}).error(function(err) {
    error = err;
});

//Show Word Counts by Issue
$('#issue').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#issue-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
   
   issueChart();
});

//Show Total Issues Covered
$('#count').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#count-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
    countChart();
});

//Show Average Wordcounts
$('#average').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#average-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
   averageChart(); 
});

$('.number').mask("000,000,000", {reverse: true});

//Run Mobile Detection
setTimeout(mobileDetect, 3000);
