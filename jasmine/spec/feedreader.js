/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined and that the URL is not empty', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed in the allFeeds
         * array and ensures it has a name defined and that
         * the name is not empty.
         */
        it('has a name defined and that the name is not empty', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        let body = document.querySelector('body');
        let menu = document.querySelector('.menu-icon-link');
        /* Test if the menu element is hidden by default. */
        it('hides the menu element by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        })
 
        describe('the click', function() {
            it('changes menu visibility when the menu icon is clicked', function(done) {
                menu.click();
                expect(body.classList.contains('menu-hidden')).toBe(false);
                menu.click();
                expect(body.classList.contains('menu-hidden')).toBe(true);
                done();
            })
        })
    })

    describe('Initial Entries', function() {
        /* Test that the loadFeed function loads at least one .entry element into 
         * the .feed container. */
        beforeEach(function(done) {
            loadFeed(0, done);
        })
        
        it('should load at least one entry into the .feed container', function() {
            let feedList = document.querySelectorAll('.feed .entry');
            expect(feedList.length).toBeGreaterThan(0);
        })
    })

        /* This test est ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
    describe('New Feed Selection', function() {
        let feed1;

        beforeEach(function(done) {
            loadFeed(0);
            feed1 = document.querySelectorAll('.feed .entry');
            loadFeed(1, done);
        })

        it('should load a new feed when the content changes', function() {
            expect(document.querySelectorAll('.feed .entry')).not.toEqual(feed1);
        })

        afterEach(function(done) {
            loadFeed(0);
            done();
        })
    })

}());
