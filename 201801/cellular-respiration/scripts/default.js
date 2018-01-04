var slctTbl = slctTbl || {};

slctTbl.setup = (function () {
  var allInputs; // Store reference to input elements that user can update.
  var data = {
    'headers': [
        'Chemical',
        'Molecules'
    ],
    'text': [
        ['Glucose + 6 O2']
    ],
    'lang': {
        'co2': 'Carbon Dioxide (CO2):',
        'total': 'ATP from Aerobic respiration:',
        'totalRoles': 'ATP  from anaerobic respiration'
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
    document.getElementById("totalRoles").value = t1;

    // Calculated aerobic respiration.
    s = t * 30;

    // Calculate the total or hours in roles + hours sleeping.
    document.getElementById("total").value = t1 + s;
    document.getElementById("CO2").value = t * 6;
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
      for(var i=0; i<data.headers.length; i++) {
        cell = document.createElement('th');
        cell.setAttribute('class', 'c' + i + ' table-th');
        cell.appendChild(document.createTextNode(data.headers[i]));

        row.appendChild(cell);
      }
      var header = document.createElement('thead');
      header.appendChild(row);
      table.appendChild(header);

      // Create content rows.
      var c, r; //column, row, integer
      var body = document.createElement('tbody');
      var inputParams = createDefaultInputParams();
      for(r=0; r<data.text.length; r++) {
          row = document.createElement('tr');
          for(c=0; c<data.text[0].length; c++) {
              cell = document.createElement('td');
              cell.setAttribute('class', 'table-cell r' + r + ' c' + c);
              cell.appendChild(document.createTextNode(data.text[r][c]));
              row.appendChild(cell);
          }

          // Add hours input.
          c = 1;
          cell = document.createElement('td');
          cell.setAttribute('class', 'table-cell cell-text r' + r + ' c' + c);
          inputParams.attributes.id = 'input' + r;
          cell.appendChild(createElement(inputParams));
          row.appendChild(cell);

          body.appendChild(row);
      }

      // Create output elements

      // Append totalRoles.
      r = data.text.length + 1;
      var rowParams = {type: 'tr', attributes: {'class':  'r' + r + ' total'}, children: [
          // Text column
          {type: 'td', attributes: {'class':  'table-cell r' + r + ' c0 total', 'colspan': data.text[0].length},
              children: [{type: 'label',attributes: {'for': 'totalRoles', 'value': data.lang.totalRoles}}
          ]},
          // Result column.
          {type: 'td', attributes: {'class':  'table-cell cell-text r' + r + ' c1'}, children: [
              createDefaultInputParams({id: 'totalRoles', readonly: 'readonly', class: 'total'})
          ]}]};
      row = createElements(rowParams);

      body.appendChild(row);

      // Append overall total.
      r = r + 1;
      var rowParams = {type: 'tr', attributes: {'class':  ' r' + r + ' total bold'}, children: [
          // Text column
          {type: 'td', attributes: {'class':  'table-cell r' + r + ' c0 total', 'colspan': data.text[0].length},
              children: [{type: 'label',attributes: {'for': 'total', 'value': data.lang.total}}]},
          // Result column.
          {type: 'td', attributes: {'class':  'table-cell cell-text r' + r + ' c1'}, children: [
              createDefaultInputParams({id: 'total', readonly: 'readonly', class: 'total'})
          ]}
      ]};
      row = createElements(rowParams);

      body.appendChild(row);

        // Append overall total.
        r = r + 1;
        var rowParams = {type: 'tr', attributes: {'class':  ' r' + r + ' output'}, children: [
                // Text column
                {type: 'td', attributes: {'class':  'table-cell r' + r + ' c0 output', 'colspan': data.text[0].length},
                    children: [{type: 'label',attributes: {'for': 'CO2', 'value': data.lang.co2}}]},
                // Result column.
                {type: 'td', attributes: {'class':  'table-cell cell-text r' + r + ' c1'}, children: [
                        createDefaultInputParams({id: 'CO2', readonly: 'readonly', class: 'output'})
                    ]}
            ]};
        row = createElements(rowParams);

        body.appendChild(row);

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