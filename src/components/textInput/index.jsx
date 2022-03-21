import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './styles.css';

function TextInput(props) {

    const { value, setValue } = props;

    return (
        <CodeMirror
            className='inputText'
            width="100vw"
            height="40vh"
            theme="dark"
            value={value}
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => {
                setValue(value);
            }}
        />
      );
}

export default TextInput;