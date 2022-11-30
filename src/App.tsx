import { useState } from "react";
import clsx from "clsx";
import reactLogo from "./assets/react.svg";

type TState = {
    element: number | null;
    above: number | null;
    below: number | null;
    left: number | null;
    right: number | null;
};

const INITIAL_STATE: TState = {
    element: null,
    above: null,
    below: null,
    left: null,
    right: null,
};

const SIZE: 12 | 10 | 5 = 12;

function App() {
    const [state, setState] = useState<TState>(INITIAL_STATE);
    const [size, setSize] = useState(SIZE);

    const handleReset = () => {
        setState(INITIAL_STATE);
    };

    const handleClick = (element: number) => {
        const above = element - size >= 0 ? element - size : null;
        const below = element + size < size * size ? element + size : null;
        const left = element % size !== 0 ? element - 1 : null;
        const right = element % size !== size - 1 ? element + 1 : null;

        setState({
            element,
            above,
            below,
            left,
            right,
        });
    };

    const gridStyles = clsx({
        ["grid-cols-5"]: size === 5,
        ["grid-cols-10"]: size === 10,
        ["grid-cols-12"]: size === 12,
    });

    const rowStyles = clsx({
        ["py-5"]: size === 5,
        ["py-1"]: size === 10,
        ["py-0.5"]: size === 12,
    });

    return (
        <div className="bg-green-100 min-h-screen w-full flex items-center justify-center flex-col">
            <select
                name="size"
                id="size"
                className="bg-green-200 border-2 border-green-300 rounded-md p-2 my-4"
                value={size}
                onChange={(e) => setSize(Number(e.target.value) as 12 | 10 | 5)}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="12">12</option>
            </select>

            <div
                className={`grid ${gridStyles} gap-1 w-full  md:max-w-md lg:max-w-lg xl:max-w-xl`}
            >
                {[...new Array(size * size)].map((_, index) => {
                    const styles = clsx({
                        ["bg-red-400 hover:bg-red-600"]: state.element != index,
                        ["bg-green-400 hover:bg-green-600 text-white"]:
                            state.element === index,
                        ["bg-blue-400 hover:bg-blue-600 text-white"]:
                            index === state.above ||
                            index === state.below ||
                            index === state.left ||
                            index === state.right,
                    });

                    return (
                        <button
                            key={`element-${index}`}
                            type="button"
                            className={`${rowStyles} flex items-center justify-center rounded-md hover:cursor-pointer ${styles}`}
                            onMouseEnter={() => handleClick(index)}
                            onMouseLeave={() => handleReset()}
                        >
                            {index}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
