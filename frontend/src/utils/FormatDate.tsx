export const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      dayPeriod: 'short'
    });
  
    return formatter.format(date);
  }