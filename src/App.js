// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Card({ children }) {
    return (
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-3 mx-auto">
            <div className="card bg-body-tertiary rounded-5 shadow p-3">
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

function InputGroupTextAppend({ type, id, name, placeholder, appendText, value, onChange }) {
    return (
        <div className="input-group mb-3">
            <input 
                type={type ?? 'text'} id={id ?? ''} name={name ?? ''} className="form-control"
                placeholder={placeholder} value={value} onChange={onChange}/>
            <div className="input-group-text fw-bold">{appendText}</div>
        </div>
    );
}

function Buttons({ onCalculate, onReset }) {
    return (
        <div className="row px-2">
            <div className="col-12 col-md-6 d-grid p-1">
                <button type="button" onClick={onCalculate} className="btn btn-primary">Calculate</button>
            </div>
            <div className="col-12 col-md-6 d-grid p-1">
                <button type="reset" onClick={onReset} className="btn btn-outline-secondary">Reset</button>
            </div>
        </div>
    );
}

function ResultTable({ weight, height }) {
    const bmiResult = (weight / ((height / 100) ** 2)).toFixed(2);
    const category = bmiResult < 18.5 ? 'Underweight' : (bmiResult >= 18.5 && bmiResult < 25 ? 'Normal' : 'Overweight');
    const categoryColor = category === 'Underweight' ? 'warning' : (category === 'Normal' ? 'success' : 'danger');

    return (
        <div className="table-responsive">
            <table className="table table-hover table-stripped table-bordered">
                <thead>
                    <tr className={`table-${categoryColor}`}>
                        <th colSpan={2} className="fw-bold text-center">Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Weight (kg)</th>
                        <td>{weight}</td>
                    </tr>
                    <tr>
                        <th>Height (cm)</th>
                        <td>{height}</td>
                    </tr>
                    <tr>
                        <th>BMI</th>
                        <td>{bmiResult}</td>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <td className={`fw-bold text-${categoryColor}`}>
                            {category}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function App() {
    const [weightKg, setWeightKg] = useState(0);
    const [heightCm, setHeightCm] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        setShowResult(true);
    };

    return (
        <>
            <Card>
                <form action="">
                    <div className="text-center mb-5">
                        <h1 className="h1 fw-bold mb-0">BMI Calculator</h1>
                        <span className="text-primary">BMI - Body Mass Index</span>
                        <hr />
                    </div>
                    <InputGroupTextAppend type="number" name="weightKg" placeholder="Weight" appendText="kg"
                        onChange={(e) => {
                            setWeightKg(Number(e.target.value));
                            setShowResult(false);
                        }}
                    />
                    <InputGroupTextAppend type="number" name="heightCm" placeholder="Height" appendText="cm"
                        onChange={(e) => {
                            setHeightCm(Number(e.target.value));
                            setShowResult(false);
                        }}
                    />
                    <Buttons onCalculate={handleCalculate} onReset={() => setShowResult(false)} />
                </form>
            </Card>
            <Card>
                {(weightKg && heightCm && showResult) ? <ResultTable weight={weightKg} height={heightCm} /> : ''}
            </Card>
        </>
    );
}

export default App;
