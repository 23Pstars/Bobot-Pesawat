var express = require('express');
var router = express.Router();

var bootstrap_data = require( '../bootstrap_data' );

/* GET home page. */
router.get('/', function(req, res, next) {

  var data_bobot = { total: [], weight: [], means: [] };
  for( var ii in bootstrap_data.criteria.labels ) {
    var _temp_total = 0;
    for( var iii in bootstrap_data.criteria.values )
      _temp_total += bootstrap_data.criteria.values[iii][ii];
    data_bobot.total[ii] = _temp_total;
  }
  for( var i in bootstrap_data.criteria.values ) {
    data_bobot.weight[i] = [];
    for( var j in bootstrap_data.criteria.values[i] )
      data_bobot.weight[i][j] = bootstrap_data.criteria.values[i][j]/data_bobot.total[j];
  }
  for( var kk in data_bobot.weight ) {
    var _tmp_total = 0;
    for( var kkk in data_bobot.weight[kk] )
      _tmp_total += data_bobot.weight[kk][kkk];
    data_bobot.means[kk] = _tmp_total/data_bobot.weight[kk].length;
  }

  var data_aircraft = { means: [], weight: [], weight2: [], a_min: [], a_max: [], d_min: [], d_plus: [], v: [] };
  for( var l in bootstrap_data.aircraft.labels ) {
    var _total = 0;
    for( var ll in bootstrap_data.aircraft.values )
      _total += Math.pow( bootstrap_data.aircraft.values[ll][l], 2 );
    data_aircraft.means[l] = Math.sqrt( _total );
  }
  for( var m in bootstrap_data.aircraft.values ) {
    data_aircraft.weight[m] = [];
    for( var mm in bootstrap_data.aircraft.values[m] )
      data_aircraft.weight[m][mm] = bootstrap_data.aircraft.values[m][mm] / data_aircraft.means[mm];
  }
  for( var n in data_aircraft.weight ) {
    data_aircraft.weight2[n] = [];
    for( var nn in data_aircraft.weight[n] )
      data_aircraft.weight2[n][nn] = data_aircraft.weight[n][nn]*data_bobot.means[nn];
  }
  for( var o in bootstrap_data.aircraft.labels ) {
    var _min = 99999, _max = 0;
    for( var oo in data_aircraft.weight2[o] ) {
      _min = _min > data_aircraft.weight2[oo][o] ? data_aircraft.weight2[oo][o] : _min;
      _max = _max < data_aircraft.weight2[oo][o] ? data_aircraft.weight2[oo][o] : _max;
    }
    data_aircraft.a_min[o] = _min;
    data_aircraft.a_max[o] = _max;
  }
  for( var p in data_aircraft.weight2 ) {
    var _total_min = 0, _total_plus = 0;
    for( var pp in data_aircraft.weight2[p] ) {
      _total_min += Math.pow( data_aircraft.a_min[pp] - data_aircraft.weight2[p][pp], 2 );
      _total_plus += Math.pow( data_aircraft.a_max[pp] - data_aircraft.weight2[p][pp], 2 );
    }
    data_aircraft.d_min[p] = Math.sqrt( _total_min );
    data_aircraft.d_plus[p] = Math.sqrt( _total_plus );
    data_aircraft.v[p] = data_aircraft.d_min[p] / ( data_aircraft.d_min[p] + data_aircraft.d_plus[p] );
  }

  console.log( data_aircraft );

  res.render('index', {
    title: 'Combat Aircraft Hybrid Multi Criteria Decision Making',
    bootstrap_data: bootstrap_data,
    data_bobot: data_bobot,
    data_aircraft: data_aircraft
  });
});

module.exports = router;
