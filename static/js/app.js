
////// Needs to be populated:///////////////
// id="selDataset" samples to populate dropdown
// id="sample-metadata" demographic
// id="bar" horizontal bar chart
// id="gauge" gauge
// id="bubble"  bubble chart


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
        Object.entries(metadata).forEach(([key, value]) => {
            demographic.append("h5").text(`${key}:${value}`);
        });


    });

};

// console.log(getMetadata(940))

getMetadata(940)


// Bar Chart

function barchart(sample) {
    d3.json("samples.json").then((data) => {
        let testSamples = data.samples.filter(function(testSample) { return testSample.id == sample; }).sort( function sortDesc(firstParam, secondParam) {
            return secondParam - firstParam})[0] ;
        console.log("Test Samples: ", testSamples);

       
        // Slice Samples to get Top 10
        let otu_ids = testSamples.otu_ids.slice(0,10);
        
        
        console.log("Top 10: ", otu_ids)

        
    } )
}

barchart(940)