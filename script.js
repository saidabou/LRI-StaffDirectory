// Create and load map
$('#map').mapbox('lri.StaffDirectory', function(map, tilejson) {

    map.setZoomRange(0, 15);

    // Add share control
    mapbox.share().map(map).add();

    // Set title and description from tilejson
    document.title = title("Staff Directory");
    $('h1.map-title').text(tilejson.name);
    $('p.description').text(tilejson.description);


    var container = $('#markerfilters');
    $.each(tilejson.markers.markers(), function(index, m) {
        var s = m.data.properties['marker-symbol'];

        if (container.find('[href="#' + s + '"]').length) return;

        var el = $(document.createElement('a'))
            .addClass('markerfilter')
            .attr('href', '#' + s)
            .css('background-image', 'url(http://a.tiles.mapbox.com/v3/lri.StaffDirectory/35.8593,35.4607,10/500x300.png)')
            .bind('click', filter);
        container.append(el);
    });


    $('[href="#all"]').bind('click', filter);


    function filter(e) {
        container.find('a').removeClass('selected');
        var id = $(this).addClass('selected').attr('href').replace('#', '');
        tilejson.markers.filter(function(feature) {
            return feature.properties['marker-symbol'] == id || id == 'all';
        });
        return false;
    }
});
