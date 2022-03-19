import { useState } from 'react';
import Header from '../components/header';
import InputText from '../components/textInput';
import Footer from '../components/footer';

import '../styles/landingPage.css';
import Chart from '../components/chart';

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
            console.log(e);
            alert("incorrect data, please enter the data in json format!")
        }
    }

    return (
        <div className="landingPage">
            <Header/>

            <InputText textvalue={textValue} setValue={setTextValue}/>

            <Chart data={data}/>

            <Footer onClick={() => generateChart()}/>
        </div>
    )
}

export default LandingPage;