# Challenge chart plot

The project was created using the React framework, due to its easy processing and presentation of data, which are always updated quickly and dynamically.

The project has 1 page that is composed of 4 components, namely: header, inputText, chart and footer.

The application is currently being hosted on the [Vercel](https://vercel.com) platform to facilitate access. This platform not only enables the host of the application but also provides scripts for CI.

## Preview:

https://challenge-chart-plot-nu.vercel.app

<img src="https://github.com/WeslynSouza/challenge-chart-plot/blob/master/github/preview.png">

## Libraries:

In addition to the basic functionalities of React, some libraries were also used to implement the functionality of the application, namely:

[React-CodeMirror](https://uiwjs.github.io/react-codemirror/): Library used to create a data input with the formatting of a JS IDE.

[Nivo](https://nivo.rocks): Library used to create the graph used in the application, allowing the creation of a graph in lines along with a list of the items present in the graph.

## Security:

As a way to make the application more secure, all data passed in the input must be converted from string to json, sending an error if the data is not in the correct format, making it difficult for malicious functions to pass through the input. 
