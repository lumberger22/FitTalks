import React, { useState, useEffect } from 'react';
import { parseISO, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

function TimeAgo({ timestamp }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    function updateTimeAgo() {
      const date = parseISO(timestamp);
      const now = new Date();
      const minutesDiff = differenceInMinutes(now, date);
      const hoursDiff = differenceInHours(now, date);
      const daysDiff = differenceInDays(now, date);

      let timeAgoString;
      if (minutesDiff === 0) {
        timeAgoString = `Less than 1 minute ago`;
      } else if (minutesDiff < 60) {
        timeAgoString = `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago`;
      } else if (hoursDiff < 24) {
        timeAgoString = `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} ago`;
      } else {
        timeAgoString = `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`;
      }

      setTimeAgo(timeAgoString);
    }

    updateTimeAgo();
    const intervalId = setInterval(updateTimeAgo, 1000);  // Update every second

    return () => clearInterval(intervalId);  // Cleanup on unmount
  }, [timestamp]);

  return <div>{timeAgo}</div>;
}

export default TimeAgo;