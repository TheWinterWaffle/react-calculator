import Button from '@mui/material/Button';

function CalcButton(props){
    return(
        <Button
            variant = "contained"
            color = {props.color}
            onClick = {props.onClick}
            sx = {{
                margin: '8px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                border: '5px solid',
                borderColor: `${props.color}.dark`
            }}
        >
            {props.text}
        </Button>
    );
}

export default CalcButton;