/*
See https://github.com/velesin/jasmine-jquery for more info 
on the excellent jasmine-jquery library.
*/

describe("Fixture Loading Test Suite", function() {
  //var fixtures = '', menuDivSelector = 'div#1520_1';
  //jasmine.getFixtures().fixturesPath = 'https://codepen.io/';
  
  beforeAll(function(done) {
    $.get(
      "https://codepen.io/blackjacques/pen/Vydeyj.html",
      function(html) {
        var tempDom   = $('<output>').append($.parseHTML(html, null, true)),
            content   = tempDom.find('div#wpbody-content'),
            script    = content.find('script').remove(),
            scrCode   = script.html(),
            readyBody = scrCode.substring(scrCode.indexOf("{") + 1, scrCode.lastIndexOf("}"));
        
        setFixtures( content );
        appendSetFixtures( script.html(readyBody) );
        
        done();
      }
    );
  });
  
  it ("Verify that jQuery.ready() functions are accessible by jasmine.", function() {
    //debugger;
    expect(window['setMenuInputNames']).toBeDefined();
    expect(window['displayAdminMessage']).toBeDefined(); 
    expect(window['createLocationDiv']).toBeDefined(); 

    expect(typeof setMenuInputNames).toEqual('function');
    expect(typeof displayAdminMessage).toEqual('function'); 
    expect(typeof createLocationDiv).toEqual('function'); 

    //you can even check that event handlers are bound!
    expect('click' in $._data( $('#btnAddNewMenu').get(0), "events" ) ).toBe(true);
    /*
      $.each($._data( $('#btnAddNewMenu').get(0), "events" ), function(eventName, event) {
          if (eventName == 'click') {
            $.each(event, function(j, h) {
                expect(typeof h.handler).toEqual('function');
            });
          }
      });
      */
  }); 
});


//this code appends my blurb after the Jasmine report is loaded!
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
// define a new observer
var obs = new MutationObserver(function(mutations, observer) {
    // look through all mutations that just occured
    for(var i=0; i<mutations.length; ++i) {
        // look through all added nodes of this mutation
        for(var j=0; j<mutations[i].addedNodes.length; ++j) {
            var addedNode = mutations[i].addedNodes[j];
            if(addedNode.className == "jasmine_html-reporter") {
                $(addedNode).after(
                  $('<br>'),
                  $('<p>')
                    .css("text-align", "left")
                      .html('If you found this demo useful, consider helping out this struggling writer by '
                           +'<a href="https://www.paypal.me/RobertGravelle/1" target="_blank">donating $1 dollar</a> '
                           +'(secure PayPal link) for a coffee or purchasing one of my songs from '
                           +'<a href="https://ax.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?term=rob%20gravelle" target="_blank">'
                           +'iTunes.com</a> or <a href="http://www.amazon.com/s/ref=ntt_srch_drd_B001ES9TTK?ie=UTF8&'
                           +'field-keywords=Rob%20Gravelle&index=digital-music&search-type=ss" target="_blank">'
                           +'Amazon.com</a> for only 0.99 cents each.</p>'),
                  $('<p>')
                    .css("text-align", "left")
                      .html('Rob uses and recommends <a href="http://www.mochahost.com/2425.html" target="_blank">MochaHost</a>,'
                           +' which provides Web Hosting for as low as $1.95 per month, as well as unlimited emails and disk space!')
                 );
            }
        }
    }
});

// have the observer observe foo for changes in children
obs.observe(document.body, {
  childList: true
});

