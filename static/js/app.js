
////// Needs to be populated:///////////////
// id="selDataset" samples to populate dropdown
// id="sample-metadata" demographic
// id="bar" horizontal bar chart
// id="gauge" gauge
// id="bubble"  bubble chart
///////////////////////////////////////////


// Read in JSON data
// d3.json("samples.json").then(function(data){ console.log(data)});



// Function for Getting Demographic Data
function getMetadata(sample) {
    d3.json("samples.json").then((data) => {
        // filter for selected sample
        let metadata = data.metadata.filter(function(meta) { return meta.id == sample; })[0];
        console.log(metadata)

        // get demographic key and values from sample
        let demographic = d3.select("#sample-metadata");
        demographic.html("")
        Object.entries(metadata).forEach(([key, value]) => {
            demographic.append("h5").text(`${key}:${value}`);
        });
    });
};



// Charts Function

function charts(sample) {

    // Get Data from JSON
    d3.json("samples.json").then((data) => {

        // Get Data for Bar Chart
        let testSamples = data.samples.filter(function(testSample) { return testSample.id == sample; }).sort( function sortDesc(firstParam, secondParam) {
            return secondParam - firstParam})[0] ;
        console.log("Test Samples: ", testSamples);

       
        // Slice Samples to get Top 10
        let otu_ids = testSamples.otu_ids.slice(0,10);

        let sample_values = testSamples.sample_values.slice(0,10);

        let otu_labels = testSamples.otu_labels.slice(0,10);
        
        
        console.log("Top 10: ", otu_ids);

        let otu_ids_str =  otu_ids.map(otu => `OTU ${otu}`);

        // Trace for Bar Chart

        let trace = {
            x: sample_values,
            y: otu_ids_str,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };

        let barData = [trace];

        layout = {
            title: "Top 10 OTU IDs",
            
            yaxis: {
                autorange: 'reversed',
            }
        }

        // Plot new bar chart
        Plotly.newPlot("bar",barData,layout);


        //Get Data for Bubble Chart
        let bubbleSamples = data.samples.filter(function(bubbleSample) { return bubbleSample.id == sample; });

        let otu_ids2 = testSamples.otu_ids

        let sample_values2 = testSamples.sample_values

        let otu_labels2 = testSamples.otu_labels

        // Trace for Bubble Chart

        let trace1 = {
            x: otu_ids2,
            y: sample_values2,
            mode: 'markers',
            marker: {
              size: sample_values2,
              color: otu_ids2
            }
        };
          
        let bubbleData = [trace1];
        
        let layout2 = {
        title: 'Sample Values by OTU ID',
        xaxis: {
            title: {
              text: 'OTU ID'
            }
        },
        height: 600,
        width: 1200
        };
        
        // Plot new bubble chart
        Plotly.newPlot("bubble", bubbleData, layout2);

        
    } )
};




// Dropdown Menu Function

function getDropDown() {

    let dropDownList = d3.select("#selDataset");

    d3.json("samples.json").then(function (data) {
        let ids = data.names;
        console.log(ids);
        ids.forEach(id => dropDownList.append('option').property('value', id).text(id));
    });

};


// Dropdown On Change Click Event

d3.selectAll("#selDataset").on("change", updateDash);


// Run Chart functions on Update

function updateDash() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    // Use newly assigned value to update charts
    charts(dataset);
    getMetadata(dataset);
};





// Initialized functions


getDropDown();
//init();
