
////// Needs to be populated:///////////////
// id="selDataset" samples to populate dropdown
// id="sample-metadata" demographic
// id="bar" horizontal bar chart
// id="gauge" gauge
// id="bubble"  bubble chart


// Read in JSON data




// d3.json("samples.json").then(function(data){ console.log(data)});



function getMetadata(sample) {
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata.filter(function(meta) { return meta.id == sample; })[0];
        console.log(metadata)
    });

};

console.log(getMetadata(940))