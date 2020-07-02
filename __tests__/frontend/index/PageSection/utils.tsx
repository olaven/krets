/**
 * Launches the component, wrapped inside
 * Page context
 */

import { ReactElement } from "react"
import { render } from "@testing-library/react"
import { PagesContext } from "../../../../src/context/PagesContext";
import { PageModel } from "../../../../src/models";


export const launch = (
    Component: ReactElement,
    pages: PageModel[] = [],
    refreshPages = jest.fn(async () => { })
) => render(<PagesContext.Provider
    value={{
        pages, refreshPages
    }}
>
    {Component}
</PagesContext.Provider>);