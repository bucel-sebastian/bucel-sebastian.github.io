"use client";
import { useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css';


function GithubActivity() {
    const [data, setData] = useState<any[]>([]);

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/bucel-sebastian?y=${currentYear}`)
            .then(response => response.json())
            .then(response => setData(response.contributions));
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data])
  return (
      <div>
        <ActivityCalendar
            colorScheme="dark"
            data={data}
            loading={data.length === 0}
            theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            tooltips={{
                activity: {
                    text: ({ count }) =>
                        `${count} ${count === 1 ? 'contribution' : 'contributions'}`,
                    withArrow: true,
                },
            }}
        />
    </div>
  )
}

export default GithubActivity