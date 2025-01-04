import { useFamilyContext } from "../../Contexts/FamlilyContext";

const Program = () => {

    const family = useFamilyContext();

    console.log(family)

    if (!family) {
        return (
            <div>
                <h1>Program</h1>
                <p>No hay familia</p>
            </div>
        );
    }

    return (
        <div>
        <h1>Program</h1>
        </div>
    );
    }
    export default Program;