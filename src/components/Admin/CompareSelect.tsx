import { useContext, useEffect, useState } from "react"
import MultiSelect from "react-multi-select-component";
import { AdminPageContext } from "../../context/AdminPageContext";
import { CompareContext } from "../../context/CompareContext";
import { PagesContext } from "../../context/PagesContext";
import { Option } from "react-multi-select-component/dist/lib/interfaces";
import { Heading } from "rebass";
import * as text from "../../text";

const SelectContent = ({ options, selectedLabel, setSelectedLabel }) => <>
    <Heading>{text.compareSelect.heading}</Heading>
    <MultiSelect
        labelledBy={text.compareSelect.choose}
        options={options}
        value={selectedLabel}
        onChange={setSelectedLabel}
    />
</>

export const CompareSelect = () => {

    const { page } = useContext(AdminPageContext);
    const { pages } = useContext(PagesContext);
    const { setSelected } = useContext(CompareContext);

    const [selectedLabel, setSelectedLabel] = useState<Option[]>([])

    useEffect(() => {

        //set current page selected by default
        setSelected([page.id]);
        setSelectedLabel([{
            label: page.name,
            value: page.id
        }]);
    }, [])

    useEffect(() => {

        setSelected(selectedLabel.map(({ value }) => value));
    }, [selectedLabel.length]);

    const options = pages.map(({ name, id }) => ({
        label: name,
        value: id
    }));

    return <SelectContent
        options={options}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel} />
}