import { useToggle } from "../../../../effects/useToggle";
import { CreatorInput } from "./CreatorInput";
import { CreatorButton } from "./CreatorButton";


export const PageCreator = () => {

    const [visible, toggleVisibility] = useToggle(false);
    
    return <>
        <CreatorInput visible={visible} toggleVisibility={toggleVisibility}/>
        {visible || <CreatorButton
            onClick={toggleVisibility}>
            Lag ny side
        </CreatorButton>}
    </>
}; 
