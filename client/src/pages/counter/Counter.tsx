import { Button, ButtonGroup, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { decrement, increment, incrementByAmount } from './counterSlice';


export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            <Typography>{count}</Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment())}>increment</Button>
                <Button onClick={() => dispatch(decrement())}>decrement</Button>
                <Button onClick={() => dispatch(incrementByAmount(5))}>incrementByAmount</Button>

            </ButtonGroup>

        </>
    );
}