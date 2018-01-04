var slctTbl = slctTbl || {};

slctTbl.setup = (function () {
  var allInputs; // Store reference to input elements that user can update.
  var data = {
      'rows': [
          [   {'type':'header'},
              'Chemical',
              'Molecules'
          ],
          [{'type':'header'},'Inputs'],
          [{'id':'GlucoseO2'}, 'Glucose + 6 O2'],
          [   {'type':'header'},
              'Outputs'
          ],
          [{'id':'ATPanaerobic', 'readonly': 'readonly'}, 'ATP from anaerobic respiration:'],
          [{'id':'ATPaerobic', 'readonly': 'readonly'}, 'ATP from aerobic respiration:'],
          [{'id':'CO2', 'readonly': 'readonly'}, 'Carbon Dioxide (CO2)']
      ],
      'modal': {
          'GlucoseO2' : ['GlucoseO2', 1],
          'ATPanaerobic': ['ATPanaerobic', 2],
          'ATPaerobic': ['ATPaerobic', 30],
          'CO2': ['CO2', 6]
      }
  };
  var init = function () {

    createTable();
    //
    allInputs = document.querySelectorAll("input[type=text]:not([class*=total])");
    for (var i = 0; i < allInputs.length; i++) {
      allInputs[i].onchange = function () {
        _updateTotals();
      };
    }
    _updateTotals();
    document.getElementById("resetBtn").onclick = function () {
      _reset();
    };
  };

    /**
     * Calculate totals given current data and update total fields.
     * @private
     */
  var _updateTotals = function () {
    var t = 0, s = 0, v, t1=0, t2 = 0; // Total roles, Total sleeping, Value.
    for (var i = 0; i < allInputs.length; i++) {
        v = allInputs[i].value;
        // If there are no numbers entered reset to zero.
        if (v.match(/[0-9]*\.?[0-9]/g) === null) {
            v = 0;
        }
        else {
            // Filter text to only allow integers and floats.
            v = v.match(/[0-9]*\.?[0-9]/g).toString();
            // replace any non number characters with full stop e.g. ,:.
            v = v.replace(/[^0-9\.]/g, '');
            // We want whole numbers.
            v = v.split('.').splice(0, 1).join('');
            v = Number(v).toFixed().toString();
            // Remove first 0 if not followed by full stop and > 1 number.
            if(v.length > 1 && v.indexOf('0') === 0 && v.indexOf('.') !== 1) {
                v = v.substring(1);
            }
        }
        // Update field value.
        allInputs[i].value = v;
        // Retrieve the value as a number,
        v = Number(v);
        if(allInputs[i].classList.contains('norole')) {
            s += v;
            continue;
        }
        t = t + v;
    }
    t1 = t*2;
    document.querySelector("table input[data-id='ATPanaerobic']").value = t1;

    // Calculated aerobic respiration.
    s = t * 30;

    // Calculate the total or hours in roles + hours sleeping.
    document.querySelector("table input[data-id='ATPaerobic']").value = t1 + s;
    document.querySelector("table input[data-id='CO2']").value = t * 6;
  };

  var _reset = function () {
    for (var s = 0; s < allInputs.length; s++) {
        allInputs[s].value = "0";
    }
    _updateTotals();
  };

    /**
     * Create a dom table that records hours in each role per week
     * and calculate totals.
     */
  var createTable = function() {
      var table = document.createElement('table');
      table.setAttribute('id', 'hours');

      var row = document.createElement('tr');
      // Create header.
      var cell;
      for(var i=0; i<data.rows[0].length; i++) {
          if(data.rows[0][i] instanceof Object) {
              continue;
          }
        cell = document.createElement('th');
        cell.setAttribute('class', 'c' + i + ' table-th');
        cell.appendChild(document.createTextNode(data.rows[0][i]));

        row.appendChild(cell);
      }
      var header = document.createElement('thead');
      header.appendChild(row);
      table.appendChild(header);

      // Create input rows.
      var c, r, v, p; // column, row, value, params
      var body = document.createElement('tbody');
      var inputParams = createDefaultInputParams();
      var colspan = data.rows[0].length-2;
      for(r=1; r<data.rows.length; r++) {
          p = {isHeader: false, id: null, class: ''};
          row = document.createElement('tr');
          p.isHeader = false;
          p.id = null;
          for(c=0; c<data.rows[r].length; c++) {
              v = data.rows[r][c];
              if(v instanceof Object) {
                  for(item in v) {
                      p[item] = v[item];
                  }
                  if(v.hasOwnProperty("type") && v.type === "header") {
                      p.isHeader = true;
                  }
                  continue;
              }
              cell = document.createElement('td');
              cell.setAttribute('class', 'table-cell header r' + r + ' c' + c);
              cell.appendChild(document.createTextNode(data.rows[r][c]));
              row.appendChild(cell);
          }

          // Add number input.
          c = 1;
          cell = document.createElement('td');
          cell.setAttribute('class', 'table-cell cell-text ' + p.class + ' r' + r + ' c' + c);
          if(!p.isHeader) {
              inputParams.attributes.id = 'input' + r;
              if (p.class) {
                  inputParams.attributes.class += ' ' + p.class;
              }
              if (p.hasOwnProperty("readonly")) {
                  inputParams.attributes.readonly = p.readonly;
              }
              if (p.id) {
                  inputParams.attributes['data-id'] = p.id;
              }
              cell.appendChild(createElement(inputParams));
          }
          row.appendChild(cell);

          body.appendChild(row);
      }

      table.appendChild(body);

      document.body.insertBefore(table, document.body.firstChild);
    };

    /**
     * Return a dom element when given a json element configuration object.
     * @param params json element configuration object
     * @returns {Element}
     */
  var createElement = function(params) {
      var e = document.createElement(params.type);
      if (!params.hasOwnProperty('attributes')){
          return e;
      }
      for (var name in params.attributes) {
          if(name === 'value' && params.type === 'label') {
              e.appendChild(document.createTextNode(params.attributes[name]));
              continue;
          }
          e.setAttribute(name, params.attributes[name]);
      }
      return e;
  };

    /**
     * Return a dom node branch when given a json tree configuration object.
     * @param p json node branch configuration object
     * @returns {Element}
     */
    var createElements = function(p) {
        var e = createElement(p);
        if (!p.hasOwnProperty('children')){
            return e;
        }
        for (var i=0, t=p.children.length; i<t; i++) {
            e.appendChild(createElements(p.children[i]));
        }
        return e;
    };

    /**
     * Returns a JSON configuration object for a dom input element merged with the given JSON
     * configuration object.
     *
     * A helper method that merges a default configuration for an input element with a given
     * JSON configuration object. The given object will override any existing defaults.
     * @param p
     * @returns {}
     */
    var createDefaultInputParams = function(p) {
        var dp = {type: 'input', attributes: {'type' : 'text', 'value' : 0, 'class' : 'role'}};
        if (!p){
            return dp;
        }
        for (var n in p) {
            dp.attributes[n] = p[n];
        }
        return dp;
    };

  return {
    init: init,
  };
})();

(function () {
  window.onload = function () {
    slctTbl.setup.init();
  };
})();