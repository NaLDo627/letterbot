import axios from 'axios';

interface kakaotalkArgs {
  weather: {
    weather: string;
    temp: string;
  };
  news: string;
  date: string;

  url: string;
}

export default async({ weather, news, date, url }: kakaotalkArgs) => {
  const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');

  let message: any = {
    messages: []
  };

  message.messages.push({
    message: "날짜 / 한국\n" + `${today} ${date ? '(' + date + ')' : ''}` + 
    "\n\n날씨 / 부산" + weather.weather +
    "\n\n온도 / 부산" + weather.temp,
    target_db_table: "",
    target_db_data_type: "",

    // fields: [
    //   {
    //     name: '📅 날짜 / 한국',
    //     value: `${today} ${date ? '(' + date + ')' : ''}`,
    //     inline: true
    //   },
    //   {
    //     name: '🏞️ 날씨 / 부산',
    //     value: weather.weather,
    //     inline: true
    //   },
    //   {
    //     name: '🌡 온도 / 부산',
    //     value: weather.temp,
    //     inline: true
    //   }
    // ],
  });

  await axios({
    method: 'post',
    url: url,
    headers: {
        'Content-Type': 'application/text'
    },
    data: JSON.stringify(message) + "\r\n"
});
};
