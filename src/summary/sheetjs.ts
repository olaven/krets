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

export const writeToFile = (sheet: sheetJS.WorkSheet) =>
    sheetJS.writeFile({
        SheetNames: ["First Sheet"],
        Sheets: {
            "First Sheet": sheet
        }
    }, "./out.xlsx");

export const convertToJson = <T>(sheet: sheetJS.WorkSheet) =>
    sheetJS.utils.sheet_to_json(sheet) as T[];




//NOTE: just making the compiler happy for now

