import { ResponsiveLine } from '@nivo/line';

import './styles.css';

function Chart(props) {

    const { data, setData } = props;

    function loadChart() {
        try {
            const span = data.find(item => item.type === 'span');
            const chartItens = [];
            
            data.forEach(dataItem => {
                if(dataItem.type === 'data' && dataItem.timestamp >= span.begin && dataItem.timestamp <= span.end){
                    const chartIndice = chartItens.findIndex(item => item.os === dataItem.os && item.browser === dataItem.browser);
                    if(chartIndice !== -1){
                        chartItens[chartIndice].chartInfo.push({
                            timestamp: dataItem.timestamp,
                            min_response_time: dataItem.min_response_time,
                            max_response_time:  dataItem.max_response_time
                        });
                    } else {
                        chartItens.push({
                            os: dataItem.os,
                            browser: dataItem.browser,
                            chartInfo: [{
                                timestamp: dataItem.timestamp,
                                min_response_time: dataItem.min_response_time,
                                max_response_time:  dataItem.max_response_time
                            }]
                        });
                    }
                } 
            });
    
            const itensChart = [];
    
            for(const indice in chartItens) {
                const chartData1 = {
                    "id": `${chartItens[indice].os} ${chartItens[indice].browser} Min Response Time`,
                    "data": [{
                        x: chartItens[indice].chartInfo[0].timestamp,
                        y: chartItens[indice].chartInfo[0].min_response_time
                    },{
                        x: chartItens[indice].chartInfo[1].timestamp,
                        y: chartItens[indice].chartInfo[1].min_response_time
                    }]
                };
    
                const chartData2 = {
                    "id": `${chartItens[indice].os} ${chartItens[indice].browser} Max Response Time`,
                    "data": [{
                        x: chartItens[indice].chartInfo[0].timestamp,
                        y: chartItens[indice].chartInfo[0].max_response_time
                    },{
                        x: chartItens[indice].chartInfo[1].timestamp,
                        y: chartItens[indice].chartInfo[1].max_response_time
                    }]
                };
    
                itensChart.push(chartData1, chartData2)
            }
    
            return itensChart;
        } catch (e) {
            console.warn('Error processing chart data!');
            alert('Invalid data, please correct the data and send it again! ')
            setData([]);
            return [];
        }
    }

    if(data.length === 0) {
        return(
            <div className="placeHolder">
                <h1>Enter data to view the chart!</h1>
            </div>
        )
    }

    return(
        <div className='chartArea'>
            <ResponsiveLine 
                data={loadChart()}
                margin={{ top: 40, right: 270, bottom: 50, left: 60 }}
                xScale={{ type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 2,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                axisLeft={null}
                enableGridX={false}
                pointSize={10}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'top-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}/>
        </div>

    )

}

export default Chart