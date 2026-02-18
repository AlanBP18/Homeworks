
interface Props {
    message: string
    repilou: number;
}
function PrintMessage({message, repilou}: Props) {
    return (<>
        <h3> { message } { repilou }</h3>
    </>);
}

export default PrintMessage; 
