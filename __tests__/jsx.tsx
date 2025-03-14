import { useEffect, useState } from 'react';

const App = () => {
    const [a, setA]= useState(1);
    useEffect(() => {
        console.log(a);
    }, [])
    return <div>sca</div>
}

export default App;
