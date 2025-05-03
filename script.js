const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ageCalculate() {
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);
    if (isNaN(inputDate)) {
        alert("Please select a valid date.");
        displayResult("-", "-", "-");
        return;
    }

    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    };

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year === currentYear) ||
        (birthDetails.date > currentDate && birthDetails.month === currentMonth && birthDetails.year === currentYear)
    ) {
        alert("Please enter a valid date of birth.");
        displayResult("-", "-", "-");
        return;
    }

    let birthYear = currentYear - birthDetails.year;
    let birthMonth, birthDate;

    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    } else {
        birthMonth--;
        let daysInPrevMonth = months[(currentMonth - 2 + 12) % 12];
        // Adjust for leap year if February
        if ((currentMonth - 1) === 2 && leapCheck(currentYear)) {
            daysInPrevMonth++;
        }
        birthDate = daysInPrevMonth + currentDate - birthDetails.date;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }

    displayResult(birthYear, birthMonth, birthDate);
}

function displayResult(years, months, days) {
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
}

function leapCheck(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
