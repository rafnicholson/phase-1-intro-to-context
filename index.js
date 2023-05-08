// Your code here
function createEmployeeRecord(arr) {
    const employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employee;
} 

function createEmployeeRecords(nestedArrays) {
    const employeeRecords = [];

    for (const employeeData of nestedArrays) {
        const employeeRecord = createEmployeeRecord(employeeData);
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const parsedHour = parseInt(hour, 10);

    const timeInEvent = {
        type: "TimeIn",
        hour: parsedHour,
        date: date,
    };
    employeeRecord.timeInEvents.push(timeInEvent);

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const parsedHour = parseInt(hour, 10);

    const timeOutEvent = {
        type: "TimeOut",
        hour: parsedHour,
        date: date,
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord) {
    let totalWages = 0;

    for (const timeInEvent of employeeRecord.timeInEvents) {
        const date = timeInEvent.date;
        const wagesOnDate = wagesEarnedOnDate(employeeRecord,date);
        totalWages += wagesOnDate;
    }

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    for (const employeeRecord of employeeRecords) {
        const employeeWages = allWagesFor(employeeRecord);
        totalPayroll += employeeWages;
    }
    return totalPayroll;
}