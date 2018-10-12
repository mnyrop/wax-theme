// banner

function resizeWaxBanner() {
  if ( $( "#wax-banner" ).length ) {
    var $waxBanner = $('#wax-banner');
    var bannerImgHeight = $waxBanner.find('.banner-img').height(); //all wax banner images have same height
    var tallestCaptionHeight = 0;
    $waxBanner.find('.banner-caption').each(function() {
      if($(this).height() > tallestCaptionHeight) {
        tallestCaptionHeight = $(this).height();
      }
    });
    $waxBanner.height(bannerImgHeight + tallestCaptionHeight);
  }
}

function nextSlide() {
  if ( $( "#wax-banner" ).length ) {
    var q = function(sel) { return document.querySelector(sel); }
    q("#wax-banner").appendChild(q("#wax-banner .banner-item:first-child"));
    resizeWaxBanner();
  }
}
setInterval(nextSlide, 3000);

// metadata table

function resizeMetaBox() {
  if ( $( "#leaflet-iiif" ).length ) {
    var viewerWidth = $('#leaflet-iiif').width();
    var metaBox = $('#metadata-block');
    metaBox.width(viewerWidth);
  }
}

/// iiif viewer

function loadIIIFImageViewer(image_uri) {
  if ( $( "#leaflet-iiif" ).length ) {
    console.log('inside if');
    console.log('in the function');
    var iiif_viewer = L.map('leaflet-iiif', {
      center: [0, 0],
      crs: L.CRS.Simple,
      zoomDelta: 0.5,
      zoomSnap: 0,
      zoom: 0
    });
    L.tileLayer.iiif(image_uri).addTo(iiif_viewer);
  }
}

function loadIIIFManifestViewer(manifest_uri) {
  if ( $( "#leaflet-iiif" ).length ) {
    var leaflet_iiif;
    var iiifLayers = {};
    leaflet_iiif = L.map('leaflet-iiif', {
      center: [0, 0],
      crs: L.CRS.Simple,
      zoomSnap: 0,
      zoom: 0
    });
    $.getJSON(manifest_uri, function(data) {
      var i = 1;
      $.each(data.sequences[0].canvases, function(_, val) {
        var label = 'image ' + i;
        iiifLayers[label] = L.tileLayer.iiif(val.images[0].resource.service['@id'] + '/info.json', {fitBounds: true});
        i++;
      });
      if (i > 2){ L.control.layers(iiifLayers).addTo(leaflet_iiif);}
      iiifLayers[Object.keys(iiifLayers)[0]].addTo(leaflet_iiif);
    });
  }
}

if (typeof(image_uri) != "undefined"){
  loadIIIFImageViewer(image_uri);
}

if (typeof(manifest_uri) != "undefined"){
  loadIIIFManifestViewer(manifest_uri);
}


// on load

resizeMetaBox();
resizeWaxBanner();

// on resize

$(window).on('resize', function(){
  resizeMetaBox();
  resizeWaxBanner();
})
