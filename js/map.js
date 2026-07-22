// MapLibre GL map for Maui Jacaranda.
// Style replicates the previous Google Maps look: a purple (#ddb1f9)
// landscape, white roads, grey water, no POIs, minimal labels.

// A MapLibre style built on OpenFreeMap's free, keyless OpenMapTiles vector
// tiles.
var mapStyle = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    openmaptiles: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet'
    }
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': '#ddb1f9' }
    },
    {
      id: 'water',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'water',
      paint: { 'fill-color': '#e8e8e8' }
    },
    {
      id: 'waterway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      paint: { 'line-color': '#c9c9c9', 'line-width': 1 }
    },
    // Road casing / fill. Highways are slightly darker (#dadada), all other
    // roads are white (#ffffff), matching the original style.
    {
      id: 'road-highway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['in', 'class', 'motorway', 'trunk'],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#dadada',
        'line-width': [
          'interpolate', ['linear'], ['zoom'],
          8, 1, 12, 3, 16, 8, 20, 24
        ]
      }
    },
    {
      id: 'road',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['!in', 'class', 'motorway', 'trunk'],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ffffff',
        'line-width': [
          'interpolate', ['linear'], ['zoom'],
          10, 0.5, 12, 1.5, 16, 6, 20, 18
        ]
      }
    },
    // Labels. White fill with a soft halo, matching the original.
    {
      id: 'road-label',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation_name',
      minzoom: 13,
      layout: {
        'symbol-placement': 'line',
        'text-field': ['get', 'name'],
        'text-font': ['Noto Sans Regular'],
        'text-size': 11
      },
      paint: {
        'text-color': '#9e9e9e',
        'text-halo-color': '#fbfcff',
        'text-halo-width': 1.5
      }
    },
    {
      id: 'place-label',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      filter: ['in', 'class', 'city', 'town', 'village', 'suburb', 'neighbourhood'],
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Noto Sans Regular'],
        'text-size': [
          'interpolate', ['linear'], ['zoom'],
          8, 11, 14, 16
        ]
      },
      paint: {
        'text-color': '#757575',
        'text-halo-color': '#fbfcff',
        'text-halo-width': 2.5
      }
    }
  ]
};

function initMap() {
  var map = new maplibregl.Map({
    container: 'map',
    style: mapStyle,
    // Open zoomed out so most of the island of Maui is visible.
    bounds: [[-156.42, 20.66], [-156.16, 20.92]],
    fitBoundsOptions: { padding: 20 },
    attributionControl: false
  });

  // Zoom +/- buttons (no compass).
  map.addControl(
    new maplibregl.NavigationControl({ showCompass: false, showZoom: true }),
    'top-right'
  );

  map.on('load', function () {
    setMarkers(map);
  });
}

// Data for the markers: [lat, lng] pairs.
var trees = [
  [20.717793, -156.339214], [20.720668, -156.344473], [20.762635, -156.327131], [20.712407, -156.351423], [20.737807, -156.333615], [20.745874, -156.331381], [20.754720, -156.330033], [20.707340, -156.353772], [20.706664, -156.354304], [20.713969, -156.348934], [20.740221, -156.333027], [20.760800, -156.327194], [20.761179, -156.325833], [20.761295, -156.325741], [20.763828, -156.326137], [20.768564, -156.328075], [20.776637, -156.326814], [20.783672, -156.326373], [20.784719, -156.325998], [20.712306, -156.341331], [20.711702, -156.345100], [20.707495, -156.350634], [20.707810, -156.353521], [20.708975, -156.353480], [20.726759, -156.340289], [20.729768, -156.338751], [20.739793, -156.333463], [20.756288, -156.328356], [20.758760, -156.327424], [20.765676, -156.326083], [20.778435, -156.325732], [20.715949, -156.339537], [20.708402, -156.353363], [20.723626, -156.342628], [20.748217, -156.330580], [20.758358, -156.327212], [20.763569, -156.326184], [20.767685, -156.325406], [20.770617, -156.327468], [20.772248, -156.326780], [20.777701, -156.326236], [20.779915, -156.326386], [20.780894, -156.326040], [20.714396, -156.341111], [20.704714, -156.357323], [20.711813, -156.352347], [20.709175, -156.352419], [20.732072, -156.337567], [20.735646, -156.334959], [20.744236, -156.332442], [20.785001, -156.319823], [20.781080, -156.311350], [20.786650, -156.307676], [20.786053, -156.307442], [20.787199, -156.308197], [20.796912, -156.309480], [20.794077, -156.310041], [20.803838, -156.308064], [20.805792, -156.307735], [20.823393, -156.315078], [20.835139, -156.310692], [20.834229, -156.310585], [20.829059, -156.329542], [20.829215, -156.330020], [20.822375, -156.329364], [20.819105, -156.327945], [20.791511, -156.326543], [20.769316, -156.327234], [20.764292, -156.328792], [20.760028, -156.328982], [20.745872, -156.331759], [20.784841, -156.320491], [20.784447, -156.315779], [20.781246, -156.313179], [20.786183, -156.306494], [20.788756, -156.308051], [20.790452, -156.308451], [20.794080, -156.309254], [20.804298, -156.308254], [20.815412, -156.304854], [20.834410, -156.312763], [20.832696, -156.308121], [20.840374, -156.309674], [20.828836, -156.317537], [20.828936, -156.326501], [20.790025, -156.326443], [20.784867, -156.327225], [20.767238, -156.327970], [20.743132, -156.332643], [20.784597, -156.317355], [20.839488, -156.308494], [20.839839, -156.308205], [20.833778, -156.316172], [20.829500, -156.328702], [20.829167, -156.330102], [20.786486, -156.325525], [20.786939, -156.322384], [20.782773, -156.313440], [20.783873, -156.313920], [20.780095, -156.308153], [20.780623, -156.307941], [20.840554, -156.314272], [20.827388, -156.317988], [20.833908, -156.332770], [20.819734, -156.327871], [20.813250, -156.325928], [20.793304, -156.326487], [20.783699, -156.327824], [20.765422, -156.328076], [20.754847, -156.329083], [20.747505, -156.330828], [20.747819, -156.331109], [20.724290, -156.339188], [20.721154, -156.339742], [20.722110, -156.339703], [20.784226, -156.319275], [20.781206, -156.311107], [20.779691, -156.309245], [20.779484, -156.308461], [20.791120, -156.308040], [20.791467, -156.307580], [20.806091, -156.307493], [20.837856, -156.305953], [20.839927, -156.312572], [20.829352, -156.323062], [20.828785, -156.325793], [20.812669, -156.325709], [20.780304, -156.327894], [20.778876, -156.327401], [20.780103, -156.327282], [20.749486, -156.330181], [20.784094, -156.315405], [20.780093, -156.309518], [20.799887, -156.307617], [20.839503, -156.308301], [20.838006, -156.314815], [20.828075, -156.318608], [20.829178, -156.329989], [20.829117, -156.330067], [20.829093, -156.330113], [20.817534, -156.326911], [20.803678, -156.327072], [20.799005, -156.326640], [20.787299, -156.326751], [20.778048, -156.326677], [20.776810, -156.326339], [20.776765, -156.326740], [20.757868, -156.328921], [20.757204, -156.329008], [20.724338, -156.338804]
];

function setMarkers(map) {
  // Each tree is a 15x15 tree.svg marker, anchored at its base.
  for (var i = 0; i < trees.length; i++) {
    var tree = trees[i];
    var lat = tree[0];
    var lng = tree[1];

    var el = document.createElement('div');
    el.className = 'tree-marker';
    el.style.width = '15px';
    el.style.height = '15px';
    el.style.backgroundImage = 'url(images/tree.svg)';
    el.style.backgroundSize = '15px 15px';
    el.style.backgroundRepeat = 'no-repeat';

    // Clicking a tree opens a popup that links to that exact coordinate on
    // Google Maps (opens the Maps app on phones).
    var mapsUrl =
      'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng;
    var popup = new maplibregl.Popup({ offset: 16, closeButton: false })
      .setHTML(
        '<a class="tree-popup" href="' + mapsUrl + '" target="_blank" rel="noopener">' +
          '<img src="images/tree.svg" alt="" />' +
          '<span>Take me to this tree</span>' +
        '</a>'
      );

    new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);
  }
}
