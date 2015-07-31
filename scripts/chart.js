//var selectedIssues = ["Environment", "Biography"];
var chart;
var candidates = [];
var selectedCandidates = [];

var scrollMain;
var scrollCandidates;
var isMobile = false;

function candidatesScroll() {
	scrollCandidates = new IScroll('#candidates', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		click: false,
		fadeScrollbars: false,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL)$/ }
	});
}
function mainScroll() {
	scrollMain = new IScroll('#main', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		click: false,
		fadeScrollbars: false,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL|A)$/ }
	});
}

function mobileDetect() {

    if( $('.menu-button').css('display')==='inline-block') {
        isMobile = true;       
    }
    // now i can use is_mobile to run javascript conditionally

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
        bar: {
          width: {
            height: 0.5
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
    //scrollMain.refresh();
}

function defaultCandidates() {
    $('#candidate-list [data-default="true"] input').click();
}

candidatesScroll();
mainScroll();

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


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
            scrollMain.refresh();
            makeCharts();
        });

    });

    scrollCandidates.refresh();    
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
   //console.log('issue');
});

$('#count').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#count-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
    countChart();
   //console.log('count');
});

$('#average').click(function(){
   $('.chart-buttons button').removeClass('is-selected');
   $(this).addClass('is-selected');
   
   $('#average-chart').removeClass('is-hidden').siblings('.chart').addClass('is-hidden');
   averageChart(); 
   //console.log('average');
});

$('.number').mask("000,000,000", {reverse: true});

setTimeout(mobileDetect, 3000);
