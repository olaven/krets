/**
 * Trying to figure out:
 * 1. how to generate an excel-like doucment from Response / Answer
 */

/**
 * Design of sheet
 each PageModel gets its own sheet: 
 | smilefjes | kontakt |  | |   
 */


import * as sheetJS from "xlsx";

export const convertToSheet = <T>(data: T[]) =>
    sheetJS.utils.json_to_sheet(data, {});

export const convertToWorkbook = (data: { name: string, sheet: sheetJS.WorkSheet }[]): sheetJS.WorkBook => {

    //convert names to array expected by sheetJS
    const SheetNames = data.map(d => d.name);
    // Converts to object with key matching `.name` and value being the sheet
    const Sheets = data.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.sheet }), {})

    return {
        SheetNames, Sheets
    }
}

export const writeToFile = (workbook: sheetJS.WorkBook) =>
    sheetJS.writeFile(workbook, "./out.xlsx");

export const convertToJson = <T>(sheet: sheetJS.WorkSheet) =>
    sheetJS.utils.sheet_to_json(sheet) as T[];




//NOTE: just making the compiler happy for now

