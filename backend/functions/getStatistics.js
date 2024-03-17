const getStatisticsDateRange = require('./getStatisticsDateRange');

async function getStatistics(uid) {
  const date = new Date(new Date().toUTCString());
  const fy = getFinancialYear(date);
  const financialYearObj = await getStatisticsDateRange(uid, fy.start, fy.end);
  if (financialYearObj.message !== 'No invoices found within given date range') {
    financialYearObj.message = `LegalMonetaryTotal requested for FY${fy.fy}`;
  }

  const fq = getFinancialQuarter(date);
  const financialQuaterObj = await getStatisticsDateRange(uid, fq.start, fq.end);
  if (financialQuaterObj.message !== 'No invoices found within given date range') {
    financialQuaterObj.message = `LegalMonetaryTotal requested for Q${fq.financialQuater}`;
  }

  const m = date.getMonth();
  const y = date.getFullYear();
  const lastDayOfMonth = new Date(Date.UTC(y, m + 1, 0)).getDate();
  const start = formatDate(new Date(Date.UTC(y, m, 1)));
  const end = formatDate(new Date(Date.UTC(y, m, lastDayOfMonth)));
  const monthlyObj = await getStatisticsDateRange(uid, start, end);
  if (monthlyObj.message !== 'No invoices found within given date range') {
    monthlyObj.message = `LegalMonetaryTotal for this month of ${integerToMonth(m)}`;
  }

  const firstDayOfWeek = formatDate(startOfWeek(date));
  const lastDayOfWeek = formatDate(endOfWeek(date));
  const weeklyObj = await getStatisticsDateRange(uid, firstDayOfWeek, lastDayOfWeek);
  if (weeklyObj.message !== 'No invoices found within given date range') {
    weeklyObj.message = `LegalMonetaryTotal for this week (${firstDayOfWeek} - ${lastDayOfWeek})`;
  }

  const today = formatDate(date);
  const dailyObj = await getStatisticsDateRange(uid, today, today);
  if (dailyObj.message !== 'No invoices found within given date range') {
    dailyObj.message = `LegalMonetaryTotal for today (${today})`;
  }

  return {
    financialYearStats: financialYearObj,
    financialQuarterStats: financialQuaterObj,
    monthlyFinancialStats: monthlyObj,
    weeklyFinancialStats: weeklyObj,
    dailyFinancialStats: dailyObj
  };
}

function getFinancialYear(date) {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const financialYearStartMonth = 5;
  let financialYear = currentYear;
  if (currentMonth > financialYearStartMonth) {
    financialYear = currentYear + 1;
  }
  return {
    fy: financialYear,
    start: formatDate(new Date(Date.UTC(financialYear - 1, 6, 1))),
    end: formatDate(new Date(Date.UTC(financialYear, 5, 30)))
  };
}

function getFinancialQuarter(date) {
  const month = date.getMonth();
  const year = date.getFullYear();

  const quarters = [
    { startMonth: 6, endMonth: 8 },
    { startMonth: 9, endMonth: 11 },
    { startMonth: 0, endMonth: 2 },
    { startMonth: 3, endMonth: 5 }
  ];

  for (let i = 0; i < quarters.length; i++) {
    if (month >= quarters[i].startMonth && month <= quarters[i].endMonth) {
      const lastDayOfMonth = new Date(Date.UTC(year, quarters[i].endMonth + 1, 0)).getDate();

      return {
        financialQuater: i + 1,
        start: formatDate(new Date(Date.UTC(year, quarters[i].startMonth, 1))),
        end: formatDate(new Date(Date.UTC(year, quarters[i].endMonth, lastDayOfMonth)))
      };
    }
  }
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function startOfWeek(date){
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function endOfWeek(date){
  const lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday));
}

function integerToMonth(monthInt) {
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return monthArray[monthInt];
}
module.exports = getStatistics;
