`
Given a string date representing a Gregorian calendar date formatted as YYYY-MM-DD, return the day number of the year.

 

Example 1:

Input: date = "2019-01-09"
Output: 9
Explanation: Given date is the 9th day of the year in 2019.
Example 2:

Input: date = "2019-02-10"
Output: 41
 

Constraints:

date.length == 10
date[4] == date[7] == '-', and all other date[i]'s are digits
date represents a calendar date between Jan 1st, 1900 and Dec 31st, 2019.
`

{
    const DAY_SUM_PER_MONTH = [
        0, // JAN
        31, // FEB
        59, 
        90, 
        120,
        151,
        181, 
        212,
        243,
        273,
        304,
        334 
    ];

function dayOfYear(date: string): number {
        const [yearStr, monthStr, dayStr] = date.split('-');
        
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);
        let monthDays = DAY_SUM_PER_MONTH[month-1];
        if (month > 2){
            const year = parseInt(yearStr);
            if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) monthDays += 1;
        }

        return monthDays += day;

    };

    dayOfYear("2019-01-09");
}