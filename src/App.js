import './App.css';
import CalcButton from './CalcButton.js';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

const calculatorTheme = createTheme({
  palette: {
    primary: {
      main: '#688598',
      light: '#88aac1',
      dark: '#3e5563',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f6c261',
      light: '#f6d79c',
      dark: '#eba441',
      contrastText: '#fff',
    },
    error: {
      main: '#f68b8b',
      light: '#fc9e9e',
      dark: '#bb5d5d',
      contrastText: '#fff',
    },
    warning: {
      main: '#fff',
      contrastText: '#f6c261',
      dark: '#eba441'
    }
  }
});

function App() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [lastOperand, setLastOperand] = useState(null);
  const [lastOperation, setLastOperation] = useState(null);
  const [activeHighlight, setActiveHighlight] = useState(null);

  function append(input) {
    setActiveHighlight(null);
    if (waitingForNewValue) {
      setDisplay(input === "." ? "0." : String(input));
      setWaitingForNewValue(false);
    } else {
      if (input === "." && display.includes(".")) return;
      setDisplay(display === "0" && input !== "." ? String(input) : display + input)
    }
  }

  function calculate(n1, n2, op) {
    if (op === "multiply") return n1 * n2
    if (op === "divide") return n1 / n2;
    if (op === "subtract") return n1 - n2;
    if (op === "add") return n1 + n2;
    return n2;
  }

  function operate(op) {
    if (operation && !waitingForNewValue) {
      const result = calculate(Number(previousValue), Number(display), operation);
      setDisplay(String(result));
      setPreviousValue(String(result));
    } else setPreviousValue(display)
    
    setOperation(op);
    setWaitingForNewValue(true);
    setActiveHighlight(op);
  }

  function equate() {
    let n1, n2, opToUse;
    if (operation) {
      n1 = Number(previousValue);
      n2 = Number(display);
      opToUse = operation;
      setLastOperand(String(n2));
      setLastOperation(operation);
    } else if (lastOperation) {
      n1 = Number(display)
      n2 = Number(lastOperand);
      opToUse = lastOperation;
    } else return;

    const result = calculate(n1, n2, opToUse);
    setDisplay(String(result));
    setPreviousValue(String(result));
    setOperation(null);
    setWaitingForNewValue(true);
    setActiveHighlight(null);
  }

  function clear() {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setLastOperand(null);
    setLastOperation(null);
    setActiveHighlight(null);
  }

  return (
    <ThemeProvider theme={calculatorTheme}>
      <div className="calculator">
        <TextField
          value = {display}
          variant = "standard"
          className = "output"
          slotProps = {{
            input: {
              readOnly: true,
              disableUnderline: true
            }
          }}
          sx = {{
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        />
        <CalcButton
          text = "C"
          color = "error"
          onClick = {clear}
          />
        <CalcButton text="7" color = "primary" onClick={() => append(7)} />
        <CalcButton text="8" color = "primary" onClick={() => append(8)} />
        <CalcButton text="9" color = "primary" onClick={() => append(9)}/>
        <CalcButton
          text="X"
          color = {activeHighlight === "multiply" ? "warning" : "secondary"}
          onClick={() => operate("multiply")}
          />
        <CalcButton text="4" color = "primary" onClick={() => append(4)} />
        <CalcButton text="5" color = "primary" onClick={() => append(5)} />
        <CalcButton text="6" color = "primary" onClick={() => append(6)} />
        <CalcButton
          text="/"
          color = {activeHighlight === "divide" ? "warning" : "secondary"}
          onClick={() => operate("divide")}
          />
        <CalcButton text="1" color = "primary" onClick={() => append(1)} />
        <CalcButton text="2" color = "primary" onClick={() => append(2)} />
        <CalcButton text="3" color = "primary" onClick={() => append(3)} />
        <CalcButton
          text="-"
          color = {activeHighlight === "subtract" ? "warning" : "secondary"}
          onClick={() => operate("subtract")}
          />
        <CalcButton text="0" color = "primary" onClick={() => append(0)} />
        <CalcButton text="." color = "primary" onClick={() => append(".")} />
        <CalcButton
          text="="
          color ="secondary"
          onClick={equate}
          />
        <CalcButton
          text="+"
          color = {activeHighlight === "add" ? "warning" : "secondary"}
          onClick={() => operate("add")}
          />
      </div>
    </ThemeProvider>
  );
}

export default App;
