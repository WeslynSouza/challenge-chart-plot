import { useState } from 'react';
import Header from '../../components/header';
import InputText from '../../components/textInput';
import Footer from '../../components/footer';

import './styles.css';
import Chart from '../../components/chart';

function LandingPage () {

    const [textValue, setTextValue] = useState(" ");
    const [data, setData] = useState([]);

    function generateChart() {
        try{
            const textInputs = textValue.split('\n');
            const dataInputs = textInputs.map(input => input.replace(/ /g, ''));
            const dataConverted = [];

            for (const indice in dataInputs) {
                const input = dataInputs[indice].replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
                    return "'" + matchedStr.substring(0, matchedStr.length - 1) + "':"});

                if(input !== ''){
                    dataConverted.push(JSON.parse(input.replace(/'/g, '"')));
                }
                
            }

            setData(dataConverted);
        } catch (e) {
            console.warn(e);
            alert("incorrect data, please enter the data in object format!");
        }
    }

    function loadCharts() {
        const startItems = data.filter(item => item.type === 'start');
        const spanItems = data.filter(item => item.type === 'span');
        const stopItems = data.filter(item => item.type === 'stop');
        const dataItems = data.filter(item => item.type === 'data');

        const dataGroups = [];

        if(startItems.length === stopItems.length && startItems.length === spanItems.length) {
            for(const indice in startItems) {
                dataGroups.push([startItems[indice], spanItems[indice], stopItems[indice]]);
            }
        }

        dataGroups.forEach(items => {
            const startTimestamp = items[0].timestamp;
            const stopTimestamp = items[2].timestamp;

            const dataStartItems = dataItems.filter(item => item.timestamp === startTimestamp && item.type === 'data');
            const dataStopItems = dataItems.filter(item => item.timestamp === stopTimestamp && item.type === 'data');

            const dataItemsGroup = dataStartItems.concat(dataStopItems);

            for(const indice in dataItemsGroup) {
                items.push(dataItemsGroup[indice])
            }
        });

        console.log(dataGroups);
    }

    loadCharts();

    return (
        <div className="landingPage">
            <Header/>

            <InputText textvalue={textValue} setValue={setTextValue}/>

            { data.length === 0 ? <Chart data={data} setData={setData}/> : loadCharts()}

            <Footer onClick={() => generateChart()}/>
        </div>
    )
}

export default LandingPage;