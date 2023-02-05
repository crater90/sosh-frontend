import { createContext, useState } from "react";

const Seats = createContext();
const SeatsContext = ({ children }) => {
    const [seats, setSeats] = useState([]);
    const [total, setTotal] = useState(0);
    const [occupied, setOccupied] = useState([]);
    return (
        <Seats.Provider value={{ seats, setSeats, occupied, setOccupied, total, setTotal }}>
            {children}
        </Seats.Provider>
    )
}

export { Seats, SeatsContext }