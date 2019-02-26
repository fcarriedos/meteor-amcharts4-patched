# meteor-amcharts4-patched
Amcharts4 lib patched to work in MeteorJS.

Amcharts4 is great, but it does not work out of the box with Meteor 1.8 (as of 26 Feb 2019).

This is due to a naming issue, explained here: [https://github.com/meteor/meteor/issues/10203](https://github.com/meteor/meteor/issues/10203).

Pushed this to a public repo just to save some time to others facing the same problem.

Long story short, if you follow this instructions, you can follow official documentation and all will work as expected:

 * From your shell:

```
$ cd <FOLDER_WITHIN_PROJECT>
$ git clone https://github.com/fcarriedos/meteor-amcharts4-patched.git
$ cd ..
$ meteor npm install ./<FOLDER_WITHIN_PROJECT>/meteor-amcharts4-patched
```

 * In your JS file, as seen in the official docs:

```
[Meteor imports here]

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


Template.funnel.onRendered(function() {

	var chart = am4core.create('chartcontainer', am4charts.SlicedChart);

	// Add data
	chart.data = [{
	  "name": "Stage #1",
	  "value": 600
	}, {
	  "name": "Stage #2",
	  "value": 300
	}, {
	  "name": "Stage #3",
	  "value": 200
	}, {
	  "name": "Stage #4",
	  "value": 180
	}, {
	  "name": "Stage #5",
	  "value": 50
	}, {
	  "name": "Stage #6",
	  "value": 20
	}, {
	  "name": "Stage #7",
	  "value": 10
	}];

	// And, for a good measure, let's add a legend
	// chart.legend = new am4charts.Legend();

	var pieSeries = chart.series.push(new am4charts.FunnelSeries());
	pieSeries.dataFields.value = "value";
	pieSeries.dataFields.category = "name";
	pieSeries.orientation = "horizontal";
	pieSeries.alignLabels = true;
	pieSeries.ticks.template.locationY = 0.5;
	// pieSeries.sliceLinks.template.width = 30;
	pieSeries.sliceLinks.template.fillOpacity = 0.2;

	chart.legend = new am4charts.Legend();

	this.data.chart = chart;

});

```

Et voila!

![amcharts 4 working on Meteor](https://doc-08-9c-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/cqbevkteumvd7d86f167nrc351usfpqt/1551182400000/04468418515282444686/*/1GIxpGaHRf96ny9tnZ3HUIiGlGuXsZt1W)
