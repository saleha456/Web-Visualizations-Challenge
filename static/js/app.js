
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