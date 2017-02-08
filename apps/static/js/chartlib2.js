function sprmakingPie(season, seasonArray, options) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    spdata = new google.visualization.DataTable();
    spdata.addColumn('string', '가전제품');
    spdata.addColumn('number', '전체 소비전력량 대비 소비율');

    var numRows = seasonArray.length;
      for (var i = 0; i < numRows; i++)
        spdata.addRow(seasonArray[i]);

    var spchart = new google.visualization.PieChart(document.getElementById('chart_'+season+'Tab'));
    spchart.draw(spdata, options);
  }

  $('#springTab').on('click',function() {
    var chartNm = 'chart_'+this.id;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    setTimeout(
      function(){
          var spchart = new google.visualization.PieChart(document.getElementById(chartNm));
          spchart.draw(spdata, options);
    }, 1000);
  })
}

function smmakingPie(season, seasonArray, options) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    smdata = new google.visualization.DataTable();
    smdata.addColumn('string', '가전제품');
    smdata.addColumn('number', '전체 소비전력량 대비 소비율');

    var numRows = seasonArray.length;
      for (var i = 0; i < numRows; i++)
        smdata.addRow(seasonArray[i]);

    var smchart = new google.visualization.PieChart(document.getElementById('chart_'+season+'Tab'));
    smchart.draw(smdata, options);
  }
  $('#summerTab').on('click',function() {
    var chartNm = 'chart_'+this.id;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    setTimeout(
      function(){
          var smchart = new google.visualization.PieChart(document.getElementById(chartNm));
          smchart.draw(smdata, options);
    }, 1000);
  })
}

function flmakingPie(season, seasonArray, options) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    fldata = new google.visualization.DataTable();
    fldata.addColumn('string', '가전제품');
    fldata.addColumn('number', '전체 소비전력량 대비 소비율');

    var numRows = seasonArray.length;
      for (var i = 0; i < numRows; i++)
        fldata.addRow(seasonArray[i]);

    var flchart = new google.visualization.PieChart(document.getElementById('chart_'+season+'Tab'));
    flchart.draw(fldata, options);
  }
  $('#fallTab').on('click',function() {
    var chartNm = 'chart_'+this.id;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    setTimeout(
      function(){
          var flchart = new google.visualization.PieChart(document.getElementById(chartNm));
          flchart.draw(fldata, options);
    }, 1000);
  })
}

function wtmakingPie(season, seasonArray, options) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    wtdata = new google.visualization.DataTable();
    wtdata.addColumn('string', '가전제품');
    wtdata.addColumn('number', '전체 소비전력량 대비 소비율');

    var numRows = seasonArray.length;
      for (var i = 0; i < numRows; i++)
        wtdata.addRow(seasonArray[i]);

    var wtchart = new google.visualization.PieChart(document.getElementById('chart_'+season+'Tab'));
    wtchart.draw(wtdata, options);
  }
  $('#winterTab').on('click',function() {
    var chartNm = 'chart_'+this.id;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    setTimeout(
      function(){
          var wtchart = new google.visualization.PieChart(document.getElementById(chartNm));
          wtchart.draw(wtdata, options);
    }, 1000);
  })
}